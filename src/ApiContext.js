// ApiContext.js
import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from "react";
import { baseUrl } from "./Globalvarible";
import { useSelector } from "react-redux";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [apiResponse, setApiResponse] = useState(null);
 const [inputValue, setInputValue] = useState("");
 const totalPrice = useSelector((state) => state.cart.totalPrice);
  
  const [couponCode, setCouponCode] = useState("");

  const [userAddress, setUserAddress] = useState([]);
  // Include your other state variables here if needed

  // Assuming you have a method to fetch the user ID
  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies

  // Assuming you have a function to handle API requests, for example, using the Fetch API.
  // This function returns the JSON response from the API.
  const fetchUserAddress = React.useCallback(
    async (userId) => {
      try {
        const response = await fetch(
          baseUrl + `Get_addresess.php?user_id=` + userId
        );

        const data = await response.json();

        return data;
      } catch (error) {
        return { status: false, message: "Error fetching user address" };
      }
    },
    []
  );

  //check if the userAddress available or not
  useEffect(() => {
    // Fetch user address when the component mounts
    if (userId) {
      fetchUserAddress(userId).then((data) => {
        if (data.status) {
          setUserAddress(data.data[0]);
        } else {
          setUserAddress(null);
        }
      });
    }
  }, [userId, fetchUserAddress]);

  const handleCheckCoupon = (e) => {
  e.preventDefault();
    const formdata = new FormData(); 
    formdata.append("CouponCode", inputValue);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(baseUrl + "CheckCopun.php", requestOptions)
      .then((response) => response.json())
      .then((result) => { 
        if (result.status) {
          setApiResponse(result);
          setCouponCode(couponCode);
          // setInputValue("");
        } else {
          // Coupon is not available or invalid
          setApiResponse(result);
          // setInputValue("");
        }
      })
      .catch((error) => {
        alert("An error occurred while checking the coupon");
      })
      .finally(() => {
        // Clear the input field
        setInputValue("");
      });
  };

 
  // const discountPercentage = apiResponse
  //   ? parseFloat(apiResponse.data[0].DiscountPercent)
  //   : 0;
  const discountPercentage =
    apiResponse && apiResponse.data && apiResponse.data.length > 0
      ? parseFloat(apiResponse.data[0].DiscountPercent)
      : 0;

  const discountedPrice = totalPrice - (totalPrice * discountPercentage) / 100;


   const [showCartPopup, setShowCartPopup] = useState(false);
   const cartClose = () => setShowCartPopup(false);
   const cartShow = () => setShowCartPopup(true);

  return (
    <ApiContext.Provider
      value={{
        apiResponse,
        discountPercentage,
        couponCode,
        userAddress,
        inputValue,
        discountedPrice,
        setInputValue,
        totalPrice,
        cartShow,
        cartClose,
        showCartPopup,
        fetchUserAddress,
        setUserAddress,
        handleCheckCoupon,
        // Include other context values here if needed
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
