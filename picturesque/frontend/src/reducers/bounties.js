import {
  GET_BOUNTIES,
  DELETE_BOUNTY,
  ADD_BOUNTY,
  UPLOAD_REFART,
  GET_REFART,
  GET_REFARTS,
  GET_BOUNTY,
  EDIT_BOUNTY,
  GET_MY_BOUNTIES,
  SEARCH_BOUNTIES,
  CLEAR_USER_BOUNTIES
} from "../actions/types";

const initialState = {
  bounties: [],
  refArts: [],
  bounty: null,
  refArt: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOUNTIES:
    case GET_MY_BOUNTIES:
    case SEARCH_BOUNTIES:
      return {
        ...state,
        bounties: action.payload
      };
    case DELETE_BOUNTY:
      return {
        ...state,
        bounties: state.bounties.filter(bounty => bounty.id !== action.payload),
        bounty: null
      };
    case UPLOAD_REFART:
      return {
        ...state,
        refArts: [action.payload, ...state.refArts],
        refArt: action.payload
      };
    case GET_REFARTS:
      return {
        ...state,
        refArts: action.payload
      };
    case GET_REFART:
      return {
        ...state,
        refArt: action.payload
      };
    case GET_BOUNTY:
    case ADD_BOUNTY:
      return {
        ...state,
        bounty: action.payload
      };
    case EDIT_BOUNTY:
      return {
        ...state,
        bounty: action.payload,
        bounties: state.bounties.map(bounty =>
          bounty.id === action.payload.id ? action.payload : bounty
        )
      };
    case CLEAR_USER_BOUNTIES:
      return {
        ...state,
        refArts: [],
        refArt: null
      };
    default:
      return state;
  }
}
