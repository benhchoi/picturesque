import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART,
  GET_REFARTS,
  GET_BOUNTY,
  EDIT_BOUNTY,
  GET_MY_BOUNTIES
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get ref arts
export const getRefArts = () => (dispatch, getState) => {
  axios
    .get("/api/refarts/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_REFARTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get ref art
export const getRefArt = id => dispatch => {
  axios
    .get(`/api/refarts/${id}`)
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
      dispatch({
        type: ADD_BOUNTY,
        payload: res.data
      });
      dispatch(getBounty(res.data.id));
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

// edit bounty
export const editBounty = bounty => (dispatch, getState) => {
  axios
    .patch(`/api/bounties/${bounty.id}/`, bounty, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_BOUNTY,
        payload: res.data
      });
      dispatch(getBounty(bounty.id));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get my bounties
export const getMyBounties = () => (dispatch, getState) => {
  axios
    .get("/api/mybounties/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MY_BOUNTIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
