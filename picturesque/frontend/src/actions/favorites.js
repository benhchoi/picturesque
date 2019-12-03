import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import {
  GET_FAVORITES,
  UPDATE_FAVORITES,
  GET_USERNAME_FAVORITES,
  CLEAR_USER_FAVORITES
} from "./types";
import { tokenConfig } from "./auth";

// get favorites
export const getFavorites = id => dispatch => {
  axios
    .get(`/api/favorites/${id}/`)
    .then(res => {
      dispatch({
        type: GET_FAVORITES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// update favorites
export const updateFavorites = favorites => (dispatch, getState) => {
  axios
    .patch(`/api/favorites/${favorites.id}/`, favorites, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_FAVORITES,
        payload: res.data
      });
      dispatch(createMessage({ updateFavorites: "Favorites updated" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get the favorites of some user by username
export const getUsernameFavorites = username => dispatch => {
  const config = {
    params: {
      username
    }
  };

  axios
    .get("/api/usernamefavorites", config)
    .then(res =>
      dispatch({
        type: GET_USERNAME_FAVORITES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// clear any favorites state items that are auth specific for logout
export const clearUserFavorites = () => {
  return {
    type: CLEAR_USER_FAVORITES
  };
};
