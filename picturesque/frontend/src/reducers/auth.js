import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGSITER_FAIL,
  CHECK_USERNAME,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  validUsername: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
    case CHECK_USERNAME:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case REGSITER_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        validUsername: true
      };
    case CHECK_USERNAME_FAIL:
      return {
        ...state,
        isLoading: false,
        validUsername: false
      };
    default:
      return state;
  }
}
