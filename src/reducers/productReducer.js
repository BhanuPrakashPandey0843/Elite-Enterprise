
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  SEARCH_PRODUCTS,
} from "../actions";
import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "../actions/cartActions";

const initialState = {
  products: [],
  loading: false,
  error: null,
  cart: [],
  filteredProducts: [],
  totalQuantity: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        filteredProducts: action.payload,
        totalQuantity: calculateTotalQuantity(action.payload),
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case SEARCH_PRODUCTS:
      const searchQuery = action.payload.toLowerCase();

      if (searchQuery.trim() === "") {
        return {
          ...state,
          filteredProducts: state.products,
        };
      } else {
        const filteredProducts = state.products.filter((product) =>
          product.Product_name.toLowerCase().includes(searchQuery)
        );
      

         if (filteredProducts.length === 0) {
           // Return a state indicating that no matching products were found
           return {
             ...state,
             filteredProducts,
             noResultsFound: true,
           };
         } else {
           // Return the filtered products
           return {
             ...state,
             filteredProducts,
             noResultsFound: false,
           };
         }
      }
    case INCREMENT_QUANTITY:
      const updatedCartDetailsIncrement = state.products.map((item) => {
        if (item.UserCartDetails_ID === action.payload.itemID) {
          return {
            ...item,
            Qty: Number(item.Qty) + 1,
          };
        }
        return item;
      });

      return {
        ...state,
        products: updatedCartDetailsIncrement,
        totalQuantity: calculateTotalQuantity(updatedCartDetailsIncrement),
      };
    case DECREMENT_QUANTITY:
      const updatedCartDetailsDecrement = state.products.map((item) => {
        if (item.UserCartDetails_ID === action.payload.itemID && item.Qty > 0) {
          return {
            ...item,
            Qty: Number(item.Qty) - 1,
          };
        }
        return item;
      });

      return {
        ...state,
        products: updatedCartDetailsDecrement,
        totalQuantity: calculateTotalQuantity(updatedCartDetailsDecrement),
      };
    default:
      return state;
  }
};

const calculateTotalQuantity = (cartDetails) => {
  return cartDetails.reduce((total, item) => total + item.Qty, 0);
};

export default productReducer;
