import { combineReducers } from "redux";
import bounties from "./bounties";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import portfolios from "./portfolios";

export default combineReducers({
  bounties,
  errors,
  messages,
  auth,
  portfolios
});
