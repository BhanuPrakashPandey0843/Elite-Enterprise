
import { 
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
   ADD_TO_CART,
} from "../actions/cartActions"; // Import the action type

const initialState = {
  carts: {},
  cartDetails: [], // An array of items in the cart
  isLoading: false,
  error: null,
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0, // Total price of items in the cart
   cartLength:0, // Cart length
};
 



const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART_SUCCESS":
      // Handle fetching cart details from an API, if needed
      const cartDetails = action.payload.data;
      return {
        ...state, 
        cartDetails,
        isLoading: false,
        error: null,
        //cartLength: cartDetails.length, // Update cart length
        cartLength: calculateCartLength(cartDetails), // Update cart length

        totalPrice: calculateTotalPrice(action.payload.data), // Calculate the initial total price
      };

    case INCREMENT_QUANTITY:
      // Increment quantity logic...
      const updatedCartDetailsIncrement = state.cartDetails.map((item) => {
        if (
          item.UserCartDetails_ID === action.payload.itemID &&
          item.Qty < 100
        ) {
          return {
            ...item,
            Qty: Number(item.Qty) + 1,
          };
        }
        return item;
      });

      return {
        ...state,
        cartDetails: updatedCartDetailsIncrement,
        totalQuantity: calculateTotalQuantity(updatedCartDetailsIncrement),
        totalPrice: calculateTotalPrice(updatedCartDetailsIncrement), // Recalculate total price
        cartLength: calculateCartLength(updatedCartDetailsIncrement), // Update cart length
      };

    case DECREMENT_QUANTITY:
      // Decrement quantity logic...
      const updatedCartDetailsDecrement = state.cartDetails.map((item) => {
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
        cartDetails: updatedCartDetailsDecrement,
        totalQuantity: calculateTotalQuantity(updatedCartDetailsDecrement),
        totalPrice: calculateTotalPrice(updatedCartDetailsDecrement), // Recalculate total price
        cartLength: calculateCartLength(updatedCartDetailsDecrement), // Update cart length
      };

    case REMOVE_FROM_CART:
      const updatedCartDetailsRemove = state.cartDetails.filter((item) => {
        return item.UserCartDetails_ID !== action.payload;
      });

      return {
        ...state,
        cartDetails: updatedCartDetailsRemove,
        totalQuantity: calculateTotalQuantity(updatedCartDetailsRemove),
        totalPrice: calculateTotalPrice(updatedCartDetailsRemove), // Recalculate total price
        cartLength: calculateCartLength(updatedCartDetailsRemove), // Update cart length here
      };

    case ADD_TO_CART:
      const existingProductIndex = state.cartDetails.findIndex(
        (item) => item.Product_id === action.payload.Product_id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        state.cartDetails[existingProductIndex].Qty += 1;
      } else {
        // If the product is not in the cart, add it
        action.payload.Qty = Number(action.Qty);
        state.cartDetails.push({ ...action.payload });
      }

      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        cartLength: calculateCartLength(state.cartDetails), // Update cart length here
      };

    default:
      return state;
  }


  
};

// Helper function to calculate the total quantity
const calculateTotalQuantity = (cartDetails) => {
  return cartDetails.reduce((total, item) => total + item.Qty, 0);
};
const calculateTotalPrice = (cartDetails) => {
  return cartDetails
    .reduce((total, item) => {
      const price = parseFloat(
        item.isSale && item.Product_offerPrice
          ? item.Product_offerPrice.replace("₹", "").replace(",", "")
          : (item.Product_originalPrice || "").replace("₹", "").replace(",", "")
      );
      return total + price * item.Qty;
    }, 0) 
    .toFixed(2);
};

// Helper function to calculate the total price
// const calculateTotalPrice = (cartDetails) => {
//   return cartDetails
//     .reduce((total, item) => {

//       const price = parseFloat(
//         item.isSale
//           ? item.Product_offerPrice.replace("₹", "").replace(",", "")
//           : item.Product_originalPrice.replace("₹", "").replace(",", "")
//       );
//       return total + price * item.Qty;
//     }, 0)
//     .toFixed(2);
// };

// Helper function to calculate cartLength based on total quantity
const calculateCartLength = (cartDetails) => {
  return cartDetails.reduce((total, item) => total + parseInt(item.Qty), 0);
};

export default cartReducer;
 