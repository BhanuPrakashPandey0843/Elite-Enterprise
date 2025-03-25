import {
  SET_SELECTED_BRAND, // Import the SET_SELECTED_BRAND action
  SET_SELECTED_SUBCAT, // Import the SET_SELECTED_SUBCAT action
  FETCH_BRANDS_SUCCESS,
} from "../actions";
const initialState = {
  brandsData: [], 
  selectedBrand: "",
  selectedSubcat: "",
};

const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BRAND:
      return {
        ...state,
        selectedBrand: action.payload,
        selectedSubcat: "", // Clear sub-category when a brand is changed
      };
    case SET_SELECTED_SUBCAT:
      return {
        ...state,
        selectedSubcat: action.payload,
      }; 
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        brandsData: action.payload,
      };
    default:
      return state;
  }
};

export default brandsReducer;
