import {
  GET_FAVORITES,
  UPDATE_FAVORITES,
  GET_USERNAME_FAVORITES
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
    default:
      return state;
  }
}
