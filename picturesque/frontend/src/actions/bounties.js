import axios from "axios";
import { GET_BOUNTIES, DELETE_BOUNTY, ADD_BOUNTY } from "./types";

// get bounties
export const getBounties = () => dispatch => {
  axios
    .get("/api/bounties")
    .then(res => {
      dispatch({
        type: GET_BOUNTIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// delete bounty
export const deleteBounty = id => dispatch => {
  axios
    .delete(`/api/bounties/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_BOUNTY,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// add bounty
export const addBounty = bounty => dispatch => {
  axios
    .post("/api/bounties", bounty)
    .then(res => {
      dispatch({
        type: ADD_BOUNTY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
