import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART,
  GET_BOUNTY
} from "../actions/types";

const initialState = {
  bounties: [],
  refArts: [],
  bounty: null
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
    case GET_BOUNTY:
      return {
        ...state,
        bounty: action.payload
      };
    case ADD_BOUNTY:
    default:
      return state;
  }
}
