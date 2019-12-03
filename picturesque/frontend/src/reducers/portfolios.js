import {
  GET_PORTFOLIOS,
  DELETE_PORTFOLIO,
  ADD_PORTFOLIO,
  UPLOAD_ARTWORK,
  GET_ARTWORK,
  GET_ARTWORKS,
  GET_PORTFOLIO,
  GET_MY_PORTFOLIOS,
  EDIT_PORTFOLIO,
  SEARCH_PORTFOLIOS
} from "../actions/types";

const initialState = {
  portfolios: [],
  artworks: [],
  portfolio: null,
  artwork: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
    case GET_MY_PORTFOLIOS:
    case SEARCH_PORTFOLIOS:
      return {
        ...state,
        portfolios: action.payload
      };
    case DELETE_PORTFOLIO:
      return {
        ...state,
        portfolios: state.portfolios.filter(
          portfolio => portfolio.id !== action.payload
        ),
        portfolio: null
      };
    case UPLOAD_ARTWORK:
      return {
        ...state,
        artworks: [action.payload, ...state.artworks]
      };
    case GET_ARTWORKS:
      return {
        ...state,
        artworks: action.payload
      };
    case GET_ARTWORK:
      return {
        ...state,
        artwork: action.payload
      };
    case GET_PORTFOLIO:
    case ADD_PORTFOLIO:
    case EDIT_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload
      };
    case EDIT_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload,
        portfolios: state.portfolios.map(portfolio =>
          portfolio.id === action.payload.id ? action.payload : portfolio
        )
      };

    default:
      return state;
  }
}
