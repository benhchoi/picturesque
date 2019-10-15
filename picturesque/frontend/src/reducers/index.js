import { combineReducers } from "redux";
import bounties from "./bounties";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  bounties,
  errors,
  messages,
  auth
});
