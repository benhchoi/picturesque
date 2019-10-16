import axios from "axios";
import { returnErrors } from "./messages";
import { GET_BOUNTIES, DELETE_BOUNTY, ADD_BOUNTY } from "./types";
import { tokenConfig } from "./auth";

// get bounties
export const getBounties = () => dispatch => {
  axios
    .get("/api/bounties")
    .then(res => {
      dispatch({
        type: GET_BOUNTIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete bounty
export const deleteBounty = id => (dispatch, getState) => {
  axios
    .delete(`/api/bounties/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_BOUNTY,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// add bounty
export const addBounty = bounty => (dispatch, getState) => {
  axios
    .post("/api/bounties", bounty, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_BOUNTY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
