import { GET_FAVORITES, UPDATE_FAVORITES } from "../actions/types";

const initialState = {
  favorites: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    case UPDATE_FAVORITES:
    default:
      return state;
  }
}
