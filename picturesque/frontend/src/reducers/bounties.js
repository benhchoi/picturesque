import { GET_BOUNTIES, DELETE_BOUNTY, ADD_BOUNTY } from "../actions/types";

const initialState = {
  bounties: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOUNTIES:
      return {
        ...state,
        bounties: action.payload
      };
    case DELETE_BOUNTY:
      return {
        ...state,
        bounties: state.bounties.filter(bounty => bounty.id !== action.payload)
      };
    case ADD_BOUNTY:
      return {
        ...state,
        bounties: [...state.bounties, action.payload]
      };
    default:
      return state;
  }
}
