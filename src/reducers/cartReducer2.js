const cartReducer2 = (
  state = { items: [], totalQuantity: 0, totalPrice: 0, cartLength1: 0 },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.items.find(
        (item) => item.Product_id === action.payload.Product_id
      );
      if (existingProduct) {
        existingProduct.Qty += 1; 
      } else {
        action.payload.Qty = Number(action.Qty);
        state.items.push({ ...action.payload });
      }

      // Calculate the total price
      const totalPrice = state.items.reduce((total, item) => {
        const price = item.isSale
          ? parseFloat(
              item.Product_offerPrice.replace("₹", "").replace(",", "")
            )
          : parseFloat(
              item.Product_originalPrice.replace("₹", "").replace(",", "")
            );
        return total + price * item.Qty;
      }, 0);

      // Calculate the total length
      const cartLength1 = state.items.reduce(
        (total, item) => total + item.Qty,
        0
      );

      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: totalPrice.toFixed(2),
        isSale: state.items.some((item) => item.isSale),
        cartLength1,
      }; 

    case "INCREMENT_QUANTITY":
      const itemToIncrement = state.items.find(
        (item) => item.Product_id === action.payload
      );
      if (itemToIncrement &&  itemToIncrement.Qty<100) {
        itemToIncrement.Qty += 1;

        // Recalculate the total price
        const updatedTotalPrice = state.items.reduce((total, item) => {
          const price = item.isSale
            ? 

              parseFloat(
                item.Product_offerPrice.replace("₹", "").replace(",", "")
              )
            : parseFloat(
                item.Product_originalPrice.replace("₹", "").replace(",", "")
              );
          return total + price * item.Qty;
        }, 0);

        // Recalculate the total length
        const updatedTotalLength = state.items.reduce(
          (total, item) => total + item.Qty,
          0
        );

        return {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: updatedTotalPrice.toFixed(2),
          cartLength1: updatedTotalLength,
        };
      }
      return state;

    case "DECREMENT_QUANTITY":
      const itemToDecrement = state.items.find(
        (item) => item.Product_id === action.payload
      );
      if (itemToDecrement && itemToDecrement.Qty > 0) {
        itemToDecrement.Qty -= 1;

        // Recalculate the total price
        const updatedTotalPrice = state.items.reduce((total, item) => {
          const price = item.isSale
        
           
          ? parseFloat(
              item.Product_offerPrice.replace("₹", "").replace(",", "")
            )
          : parseFloat(
              item.Product_originalPrice.replace("₹", "").replace(",", "")
            );
        return total + price * item.Qty;
       
        }, 0);

        // Recalculate the total length
        const updatedTotalLength = state.items.reduce(
          (total, item) => total + item.Qty,
          0
        );

        return {
          ...state,
          totalQuantity: state.totalQuantity - 1,
          totalPrice: updatedTotalPrice.toFixed(2),
          cartLength1: updatedTotalLength,
        };
      }
      return state;

    case "REMOVE_FROM_CART":
      const updatedItems = state.items.filter(
        (item) => item.Product_id !== action.payload
      );

      // Recalculate the total price and total Qty
      const updatedTotalPriceAfterRemove = updatedItems.reduce(
        (total, item) => {
          const price = item.isSale
            ? 

              parseFloat(
                item.Product_offerPrice.replace("₹", "").replace(",", "")
              )
            : parseFloat(
                item.Product_originalPrice.replace("₹", "").replace(",", "")
              );
          return total + price * item.Qty;
        },
        0
      );

      // Recalculate the total length
      const updatedTotalLengthAfterRemove = updatedItems.reduce(
        (total, item) => total + item.Qty,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalQuantity: updatedTotalLengthAfterRemove,
        cartLength1: updatedTotalLengthAfterRemove,
        totalPrice: updatedTotalPriceAfterRemove.toFixed(2),
      };

    default:
      return state;
  }
};

export default cartReducer2;
