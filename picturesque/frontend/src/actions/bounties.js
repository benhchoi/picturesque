import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART,
  GET_BOUNTY
} from "./types";
import { tokenConfig } from "./auth";

// upload ref art
export const uploadRefArt = refArt => (dispatch, getState) => {
  axios
    .post("/api/refarts/", refArt, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPLOAD_REFART,
        payload: res.data
      });
    })
    .then(() => getRefArt())
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get ref art
export const getRefArt = () => (dispatch, getState) => {
  axios
    .get("/api/refarts/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_REFART,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get bounties
export const getBounties = () => dispatch => {
  axios
    .get("/api/bounties/")
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
    .delete(`/api/bounties/${id}/`, tokenConfig(getState))
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
    .post("/api/bounties/", bounty, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_BOUNTY });
      dispatch(getBounties());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get bounty
export const getBounty = id => dispatch => {
  axios
    .get(`/api/bounties/${id}/`)
    .then(res => {
      dispatch({
        type: GET_BOUNTY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
