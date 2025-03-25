// brandProductsReducer.js

import {
  FETCH_BRAND_PRODUCTS_REQUEST,
  FETCH_BRAND_PRODUCTS_SUCCESS,
  FETCH_BRAND_PRODUCTS_FAILURE,
} from "../actions";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const brandProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BRAND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FETCH_BRAND_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandProductsReducer;
