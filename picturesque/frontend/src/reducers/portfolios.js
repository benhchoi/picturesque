import {
  GET_PORTFOLIOS,
  DELETE_PORTFOLIO,
  ADD_PORTFOLIO,
  UPLOAD_ARTWORK,
  GET_ARTWORK,
  GET_PORTFOLIO,
  GET_MY_PORTFOLIOS
} from "../actions/types";

const initialState = {
  portfolios: [],
  artworks: [],
  portfolio: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
    case GET_MY_PORTFOLIOS:
      return {
        ...state,
        portfolios: action.payload.reverse()
      };
    case DELETE_PORTFOLIO:
      return {
        ...state,
        portfolios: state.portfolios.filter(
          portfolio => portfolio.id !== action.payload
        )
      };
    case UPLOAD_ARTWORK:
      return {
        ...state,
        artworks: [action.payload, ...state.artworks]
      };
    case GET_ARTWORK:
      return {
        ...state,
        artworks: action.payload
      };
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload
      };
    case ADD_PORTFOLIO:
    default:
      return state;
  }
}
