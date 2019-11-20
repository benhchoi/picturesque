import { GET_FAVORITES, UPDATE_FAVORITES } from "../actions/types";

const initialState = {
  bounties: [],
  portfolios: []
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
    default:
      return state;
  }
}
