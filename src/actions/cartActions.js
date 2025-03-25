import Cookies from "js-cookie";
import { baseUrl } from "../Globalvarible";
 
// cartActions.js

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart1 = (product, Qty) => {
  return (dispatch) => {
    // Get the user ID from cookies or wherever it's stored
    const userId = Cookies.get("userId"); // Replace this with your actual method of getting the user ID

    // Prepare the data to send in the request
    const data = new FormData();
    data.append("User_ID", userId || ""); // Use an empty string if user ID is not available
    data.append("Product_id", product.Product_id);
    data.append("Qty", Qty); // You can modify this to specify the quantity

    const requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
    };

    // Make the API request to add the item to the cart
    fetch(baseUrl + "Add_CartDetails.php", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // Handle the response from the server, e.g., show a success message

        // Once the item is successfully added to the cart, dispatch the action
        dispatch({
          type: ADD_TO_CART,
          payload: product,
          Qty: Qty,
        });
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
      });
  };
};

 







export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_ERROR = "FETCH_CART_ERROR";










export const fetchCartDetails = (userId) => {
  return (dispatch) => {
    // Make an API request to get cart details
    fetch(
      baseUrl+`Get_CartDetails.php?user_id=${userId}`
    )
      .then((response) => response.json()) // Assuming the response is in JSON format
      .then((data) => {
        dispatch({ type: "FETCH_CART_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_CART_ERROR", error });
      });
  };
};



export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const incrementQuantity = (itemID,Qty) => {
  return (dispatch) => {
    const formdata = new FormData();
    formdata.append("UserCartDetails_ID", itemID);
    if(Number(Qty)>=100){
      formdata.append("Qty", "100"); // Assuming you want to increment by 1
    }
    else{
      formdata.append("Qty", Qty); // Assuming you want to increment by 1
    }
 
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(baseUrl + "Update_CartDetails.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          dispatch({
            type: INCREMENT_QUANTITY,
            payload: {
              itemID,
              Qty,
            },
          });
        } else {
        
          // Handle errors or dispatch a different action if needed.
        }
      })
      .catch((error) => {
       
        // Handle network errors or dispatch a different action if needed.
      });
  };
};

export const decrementQuantity = (itemID,Qty) => {
  return (dispatch) => {
    const formdata = new FormData();
    formdata.append("UserCartDetails_ID", itemID);
    formdata.append("Qty", Qty); // Assuming you want to decrement by 1

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(baseUrl + "Update_CartDetails.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
       
        if (result.status === true) {
          dispatch({
            type: DECREMENT_QUANTITY,
            payload: {
              itemID,
              Qty,
            },
          });
        } else {
         
          // Handle errors or dispatch a different action if needed.
        }
      })
      .catch((error) => {
      
        // Handle network errors or dispatch a different action if needed.
      });
  };
};



export const REMOVE_FROM_CART = "REMOVE_FROM_CART"; // Define the action type

export const removeFromCart = (userCartDetailsId) => {
  return (dispatch) => { 
    // Make an API request to remove the item from the cart
    // Use the appropriate API endpoint and request method
    fetch(baseUrl + `Update_CartDetails.php`, {
      method: "POST", // Use the appropriate HTTP method for removal
      body: `UserCartDetails_ID=${userCartDetailsId}&Delete=1`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: REMOVE_FROM_CART, payload: userCartDetailsId });
        } else {
          // Handle error or show a message if removal fails
        }
      })
      .catch((error) => {
        // Handle error if the API request fails
      });
  };
};

