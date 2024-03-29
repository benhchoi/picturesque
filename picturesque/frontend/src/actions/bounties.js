import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART,
  GET_REFARTS,
  GET_BOUNTY,
  EDIT_BOUNTY,
  GET_MY_BOUNTIES,
  SEARCH_BOUNTIES,
  CLEAR_USER_BOUNTIES
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
      dispatch(createMessage({ uploadRefArt: "Reference art uploaded" }));
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
      dispatch(createMessage({ deleteBounty: "Bounty deleted" }));
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
      dispatch(createMessage({ addBounty: "Bounty created" }));
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
      dispatch(createMessage({ editBounty: "Bounty edited" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get my bounties
export const getMyBounties = username => dispatch => {
  const config = {
    params: {
      username
    }
  };

  axios
    .get(`/api/mybounties/`, config)
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

// search bounties
export const searchBounties = (search, tags) => dispatch => {
  const config = {
    params: {
      search,
      tags
    }
  };

  axios
    .get("/api/bounties/", config)
    .then(res =>
      dispatch({
        type: SEARCH_BOUNTIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// clear any bounties state items that are auth specific for logout
export const clearUserBounties = () => {
  return {
    type: CLEAR_USER_BOUNTIES
  };
};
