import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import {
  GET_PORTFOLIOS,
  DELETE_PORTFOLIO,
  ADD_PORTFOLIO,
  UPLOAD_ARTWORK,
  GET_ARTWORK,
  GET_ARTWORKS,
  GET_PORTFOLIO,
  GET_MY_PORTFOLIOS,
  EDIT_PORTFOLIO,
  SEARCH_PORTFOLIOS,
  CLEAR_USER_PORTFOLIOS
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
      dispatch(createMessage({ uploadArtwork: "Artwork uploaded" }));
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get artworks
export const getArtworks = () => (dispatch, getState) => {
  axios
    .get("/api/artworks/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ARTWORKS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get artwork
export const getArtwork = id => dispatch => {
  axios
    .get(`/api/artworks/${id}`)
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
      dispatch(createMessage({ deletePortfolio: "Portfolio deleted" }));
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
      dispatch({
        type: ADD_PORTFOLIO,
        payload: res.data
      });
      dispatch(createMessage({ addPortfolio: "Portfolio created" }));
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
export const getMyPortfolios = username => dispatch => {
  const config = {
    params: {
      username
    }
  };

  axios
    .get(`/api/myportfolios/`, config)
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

// edit portfolio
export const editPortfolio = portfolio => (dispatch, getState) => {
  axios
    .patch(`/api/portfolios/${portfolio.id}/`, portfolio, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_PORTFOLIO,
        payload: res.data
      });
      dispatch(createMessage({ editPortfolio: "Portfolio edited" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// search portfolios
export const searchPortfolios = search => dispatch => {
  const config = {
    params: {
      search
    }
  };

  axios
    .get("/api/portfolios/", config)
    .then(res =>
      dispatch({
        type: SEARCH_PORTFOLIOS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// clear any portfolios state items that are auth specific for logout
export const clearUserPortfolios = () => {
  return {
    type: CLEAR_USER_PORTFOLIOS
  };
};
