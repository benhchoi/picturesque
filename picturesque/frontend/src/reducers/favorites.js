import {
  GET_FAVORITES,
  UPDATE_FAVORITES,
  GET_USERNAME_FAVORITES,
  CLEAR_USER_FAVORITES
} from "../actions/types";

const initialState = {
  bounties: [],
  portfolios: [],
  accountFavorites: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
    case UPDATE_FAVORITES:
      return {
        ...state,
        bounties: action.payload.bounties,
        portfolios: action.payload.portfolios
      };
    case GET_USERNAME_FAVORITES:
      return {
        ...state,
        accountFavorites: action.payload
      };
    case CLEAR_USER_FAVORITES:
      return {
        ...state,
        bounties: [],
        portfolios: []
      };
    default:
      return state;
  }
}
