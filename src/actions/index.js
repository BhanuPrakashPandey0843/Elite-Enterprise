// src/actions/index.js

import Cookies from "js-cookie";
import { baseUrl } from "../Globalvarible";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => {
  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    if (userId) {
      fetch(baseUrl + `Shop.php?user_id=${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            dispatch(fetchProductsSuccess(data.products));
          } else {
            // If status is not true, you can dispatch an error or take other actions
            // Dispatch an error action if needed
            // dispatch(fetchProductsFailure("API status is not true"));
          }
        })
        .catch((error) => dispatch(fetchProductsFailure(error)));
    } else {
      fetch(baseUrl + "Shop.php")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            dispatch(fetchProductsSuccess(data.products));
          } else {
            // If status is not true, you can dispatch an error or take other actions
            // Dispatch an error action if needed
            // dispatch(fetchProductsFailure("API status is not true"));
          }
        })
        .catch((error) => dispatch(fetchProductsFailure(error)));
    }
  };
};

// src/actions/index.js 

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product, Qty) => ({
  type: ADD_TO_CART,
  payload: product,
  Qty: Qty,
});

export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const incrementQuantity = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

export const searchProducts = (query) => ({
  type: SEARCH_PRODUCTS,
  payload: query,
});

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

//brands data
export const FETCH_BRANDS_SUCCESS = "FETCH_BRANDS_SUCCESS";

export const fetchBrandsSuccess = (brands) => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: brands,
});

export const SET_SELECTED_BRAND = "SET_SELECTED_BRAND";

export const setSelectedBrand = (brandId) => ({
  type: SET_SELECTED_BRAND,
  payload: brandId,
});

export const SET_SELECTED_SUBCAT = "SET_SELECTED_SUBCAT";
export const setSelectedSubcat = (subcatName) => ({
  type: SET_SELECTED_SUBCAT,
  payload: subcatName,
});

export const fetchBrands = () => {
  return (dispatch) => {
    // You should fetch the brand data from your API here
    // For demonstration purposes, I'll provide a basic example using a mock data structure.

    // Replace this with your actual API endpoint for fetching brands
    fetch(baseUrl + "Brands.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          // Dispatch the success action with the fetched data
          dispatch(fetchBrandsSuccess(data.brands));
        } else {
          // You can dispatch an error action if needed
          // dispatch(fetchBrandsFailure("API status is not true"));
        }
      })
      .catch((error) => {
        // Dispatch an error action if needed
        // dispatch(fetchBrandsFailure(error));
      });
  };
};

// brandProductsActions

// Action types
export const FETCH_BRAND_PRODUCTS_REQUEST = "FETCH_BRAND_PRODUCTS_REQUEST";
export const FETCH_BRAND_PRODUCTS_SUCCESS = "FETCH_BRAND_PRODUCTS_SUCCESS";
export const FETCH_BRAND_PRODUCTS_FAILURE = "FETCH_BRAND_PRODUCTS_FAILURE";

// Action creators
export const fetchBrandProductsRequest = () => ({
  type: FETCH_BRAND_PRODUCTS_REQUEST,
});

export const fetchBrandProductsSuccess = (products) => ({
  type: FETCH_BRAND_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchBrandProductsFailure = (error) => ({
  type: FETCH_BRAND_PRODUCTS_FAILURE,
  payload: error,
});

// Async action creator for fetching brand products
export const fetchBrandProducts = (brandId) => {
  return (dispatch) => {
    dispatch(fetchBrandProductsRequest());

    fetch(baseUrl + `BrandsProduct.php?ConnectedToBrand_id=${brandId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchBrandProductsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchBrandProductsFailure(error.message));
      });
  };
};

// brandSubproductsActions.js
// Action types

export const FETCH_BRAND_SUBPRODUCTS_REQUEST =
  "FETCH_BRAND_SUBPRODUCTS_REQUEST";
export const FETCH_BRAND_SUBPRODUCTS_SUCCESS =
  "FETCH_BRAND_SUBPRODUCTS_SUCCESS";
export const FETCH_BRAND_SUBPRODUCTS_FAILURE =
  "FETCH_BRAND_SUBPRODUCTS_FAILURE";
// Action creators
// Action creators
export const fetchBrandSubproductsRequest = () => ({
  type: FETCH_BRAND_SUBPRODUCTS_REQUEST,
});

export const fetchBrandSubproductsSuccess = (subproducts) => ({
  type: FETCH_BRAND_SUBPRODUCTS_SUCCESS,
  payload: subproducts,
});

export const fetchBrandSubproductsFailure = (error) => ({
  type: FETCH_BRAND_SUBPRODUCTS_FAILURE,
  payload: error,
});

// Async action creator for fetching brand products
export const fetchBrandSubproducts = (Subcatid) => {
  return (dispatch) => {
    dispatch(fetchBrandSubproductsRequest());

    fetch(baseUrl + `SubBrandsProduts.php?ConnectedToSubBrand_id=${Subcatid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchBrandSubproductsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchBrandSubproductsFailure(error.message));
      });
  };
};





