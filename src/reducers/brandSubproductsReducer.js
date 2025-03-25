// brandSubproductsReducer.js

import {
  FETCH_BRAND_SUBPRODUCTS_REQUEST,
  FETCH_BRAND_SUBPRODUCTS_SUCCESS,
  FETCH_BRAND_SUBPRODUCTS_FAILURE,

} from "../actions";


const initialState = {
  subproducts: [],
  loading: false,
  error: null,
};


const brandSubproductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_SUBPRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BRAND_SUBPRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        subproducts: action.payload,
      };
    case FETCH_BRAND_SUBPRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandSubproductsReducer;
