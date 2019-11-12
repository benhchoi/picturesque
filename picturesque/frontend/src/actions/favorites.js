import axios from "axios";
import { returnErrors } from "./messages";
import { GET_FAVORITES, UPDATE_FAVORITES } from "./types";
import { tokenConfig } from "./auth";

// get favorites
export const getFavorites = () => (dispatch, getState) => {
  axios
    .get("/api/favorites/", tokenConfig(getState))
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
    .patch(`/api/favorites/${favorites.id}`, favorites, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_FAVORITES,
        payload: res.data
      });
      dispatch(getFavorites(favorites.id));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
