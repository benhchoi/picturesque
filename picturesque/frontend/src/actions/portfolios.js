import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_PORTFOLIOS,
  DELETE_PORTFOLIO,
  ADD_PORTFOLIO,
  UPLOAD_ARTWORK,
  GET_ARTWORK,
  GET_PORTFOLIO,
  GET_MY_PORTFOLIOS
} from "./types";
import { tokenConfig } from "./auth";

// upload artwork
export const uploadArtwork = artwork => (dispatch, getState) => {
  axios
    .post("/api/artworks/", artwork, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPLOAD_ARTWORK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get artwork
export const getArtwork = () => (dispatch, getState) => {
  axios
    .get("/api/artworks/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ARTWORK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get portfolios
export const getPortfolios = () => dispatch => {
  axios
    .get("/api/portfolios/")
    .then(res => {
      dispatch({
        type: GET_PORTFOLIOS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete portfolio
export const deletePortfolio = id => (dispatch, getState) => {
  axios
    .delete(`/api/portfolios/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_PORTFOLIO,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// add portfolio
export const addPortfolio = portfolio => (dispatch, getState) => {
  axios
    .post("/api/portfolios/", portfolio, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_PORTFOLIO });
      dispatch(getPortfolios());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get portfolio
export const getPortfolio = id => dispatch => {
  axios
    .get(`/api/portfolios/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PORTFOLIO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get my portfolios
export const getMyPortfolios = () => (dispatch, getState) => {
  axios
    .get(`/api/portfolios/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MY_PORTFOLIOS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
