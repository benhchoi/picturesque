import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGSITER_FAIL,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAIL,
  CHECK_USERNAME
} from "./types";
import { getFavorites, clearUserFavorites } from "./favorites";
import { clearUserBounties } from "./bounties";
import { clearUserPortfolios } from "./portfolios";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      dispatch(getFavorites(res.data.id));
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// login user
export const login = (username, password) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // make username case insensitive
  username = username.toLowerCase();

  // request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(getFavorites(res.data.user.id));
      dispatch(createMessage({ login: "Login successful" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// REGISTER user
export const register = ({ username, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // make username and email case insensitive
  username = username.toLowerCase();
  email = email.toLowerCase();

  // request body
  const body = JSON.stringify({ username, email, password });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(getFavorites(res.data.user.id));
      dispatch(createMessage({ register: "Register successful!" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGSITER_FAIL
      });
    });
};

// logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
      dispatch(createMessage({ logout: "Logout successful" }));
      dispatch(clearUserBounties());
      dispatch(clearUserPortfolios());
      dispatch(clearUserFavorites());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// check to see if account username exists
export const checkUsername = username => dispatch => {
  dispatch({ type: CHECK_USERNAME });

  const config = {
    params: {
      username
    }
  };

  axios
    .get("/api/account", config)
    .then(res => dispatch({ type: CHECK_USERNAME_SUCCESS }))
    .catch(err => {
      dispatch(
        createMessage({ userDNE: `The user ${username} does not exist` })
      );
      dispatch({ type: CHECK_USERNAME_FAIL });
    });
};

export const tokenConfig = getState => {
  // get token from state
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // if token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
