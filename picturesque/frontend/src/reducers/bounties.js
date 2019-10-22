import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART
} from "../actions/types";

const initialState = {
  bounties: [],
  refArts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOUNTIES:
      return {
        ...state,
        bounties: action.payload.reverse()
      };
    case DELETE_BOUNTY:
      return {
        ...state,
        bounties: state.bounties.filter(bounty => bounty.id !== action.payload)
      };
    case UPLOAD_REFART:
      return {
        ...state,
        refArts: [action.payload, ...state.refArts]
      };
    case GET_REFART:
      return {
        ...state,
        refArts: action.payload
      };
    case ADD_BOUNTY:
    default:
      return state;
  }
}
