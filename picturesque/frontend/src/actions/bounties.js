import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART
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
      dispatch({
        type: ADD_BOUNTY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// calculate time since a timestamp
export const timeSince = timestamp => {
  const now = new Date(),
    secondsPast = (now.getTime() - timestamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    day = timestamp.getDate();
    month = timestamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    year =
      timestamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timestamp.getFullYear();
    return day + " " + month + year;
  }
};
