import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row, Table } from "react-bootstrap";

import "./Cart.css";
import Cookies from "js-cookie";

import { fetchCartDetails } from "../actions/cartActions";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Marquee from "react-fast-marquee";
import AddressDetail from "./Account/AddressDetail";

import { useApi } from "../ApiContext";
import { useState } from "react";
import { baseUrl } from "../Globalvarible";

const Cart = ({ handleShowA, baseUrl1 }) => {
  const dispatch = useDispatch();
  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  const cartItems = useSelector((state) => state.cart.cartDetails);
  const {
    inputValue,
    setInputValue,
    apiResponse,
    discountedPrice,
    userAddress,
    handleCheckCoupon,
    totalPrice,
    cartShow,
    cartClose,
    showCartPopup,
  } = useApi(); // Use the useApi hook to access context values
  const navigate = useNavigate(); // useNavigate should be declared from 'react-router-dom'

  //coupon availblity
  const [inputValue2, setInputValue2] = useState("");
  const [showCouponButton2, setShowCouponButton2] = useState(
    // Retrieve the showCouponButton2 value from localStorage or default to false
    localStorage.getItem("showCouponButton2") === "true" || false
  );
  const [apiData, setApiData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Save the showCouponButton2 value to localStorage whenever it changes
    localStorage.setItem("showCouponButton2", showCouponButton2);
  }, [showCouponButton2]);

  useEffect(() => {
    dispatch(fetchCartDetails(userId));
  }, [dispatch, userId]);

  const handleIncrementQuantity = (productId, Qty) => {
    dispatch(incrementQuantity(productId, Qty));

    if (Qty <= 100) {
      Qty = 100;
    }
    
  };

  const handleDecrementQuantity = (productId, Qty) => {
    dispatch(decrementQuantity(productId, Qty));
    const item = cartItems.find(
      (item) => item.UserCartDetails_ID === productId
    );
    if (item && item.Qty <= 1) {
      dispatch(removeFromCart(productId));
    }
  };

  const handleRemoveFromCart = (userCartDetailsId) => {
    dispatch(removeFromCart(userCartDetailsId));
  };

  //checkout
  const handleCheckout = () => {
    if (userId) {
      if (userAddress) {
        // User is logged in and has an address
        // Proceed to the payment gateway
        cartShow();
      } else {
        // User is logged in but doesn't have an address
        // Show a form to add an address or perform any required actions
        navigate("/checkout");
      }
    } else {
      // User is not logged in
      // Show a signup or login form
      navigate("/checkout");
      handleShowA();
    }
  };

  //coupon availblity

  const handleCheckCouponavailble = (e) => {
    // Make the API request and handle the response
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("ZipCode", inputValue2);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(baseUrl + "CheckZipAvailability.php", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setShowCouponButton2(true);
          setLoading(true); // Show loading animation immediately

          setLoading(true); // Show loading animation immediately

          setTimeout(() => {
            setLoading(false); // Hide loading animation after 2 seconds
            setApiData(data.data[0]); // Set API data when status is true
          }, 2000);
        } else {
          // The coupon is not available, so hide the button and display a popup
          setShowCouponButton2(false);
          alert("Unable to deliver at this address");
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        // Clear the input field
        setInputValue2("");
      });
  };

  // Load API data when showCouponButton2 is true on initial render
  useEffect(() => {
    if (showCouponButton2) {
      // Retrieve necessary data from localStorage or any other source
      const savedData = JSON.parse(localStorage.getItem("savedData"));

      if (savedData) {
        setApiData(savedData.apiData);
        setInputValue2(savedData.inputValue2);
      }
    }
  }, [showCouponButton2]);

  // Save necessary data to localStorage when showCouponButton2 changes
  useEffect(() => {
    if (showCouponButton2) {
      localStorage.setItem(
        "savedData",
        JSON.stringify({
          apiData,
          inputValue2,
        })
      );
    }
  }, [showCouponButton2, apiData, inputValue2]);

  return (
    <div className="container cartpage">
      <Container>
        <Row lg={2}>
          <Col xs={12} lg={8}>
            {" "}
            {cartItems.length === 0 ? (
              <div className="mx-5 mt-4">
                <Player
                  autoplay
                  loop
                  src={baseUrl1 + "Animations/Cart404.json"}
                  style={{ height: "300px", width: "300px" }}
                  visible={true}
                ></Player>
              </div>
            ) : (
              <div>
                <div className="d-lg-block d-md-block d-none">
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product, UserCartDetails_ID) => (
                        <tr key={UserCartDetails_ID}>
                          <td>
                            <img
                              className="rounded-3  p-4  prdctimg"
                              src={product.Product_img}
                              alt={`Image ${UserCartDetails_ID + 1}`}
                              id="prdctimg1"
                              style={{ width: "150px", height: "150px" }}
                            />
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            {product.Product_name}
                          </td>
                          <td style={{ width: "15%", verticalAlign: "middle" }}>
                            <p>
                              {product.isSale ? (
                                <span className="fw-bold">
                                  ₹{product.Product_offerPrice}
                                </span>
                              ) : (
                                <span className="fw-bold">
                                  ₹{product.Product_originalPrice}
                                </span>
                              )}
                            </p>
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            <button
                              className="rounded-2 pt-1 pb-1 px-2 inc-dec-btn"
                              onClick={() =>
                                handleDecrementQuantity(
                                  product.UserCartDetails_ID,
                                  Number(product.Qty) - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="fw-bold px-1   pt-1 pb-1 px-lg-4 Qty">
                              {product.Qty}
                            </span>
                            <button
                              className=" rounded-2 pt-1 pb-1 px-2 inc-dec-btn"
                              onClick={() =>
                                handleIncrementQuantity(
                                  product.UserCartDetails_ID,
                                  Number(product.Qty) + 1
                                )
                              }
                            >
                              +
                            </button>
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            Total: ₹
                            {product.isSale ? (
                              <span className="fw-bold">
                                {product.Product_offerPrice *
                                  parseFloat(product.Qty)}
                              </span>
                            ) : (
                              <span className="fw-bold">
                                {product.Product_originalPrice *
                                  parseFloat(product.Qty)}
                              </span>
                            )}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <button
                              className="rounded-3 cartremove-btn p-2"
                              onClick={() =>
                                handleRemoveFromCart(product.UserCartDetails_ID)
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="d-lg-none d-md-none d-block ">
                  {cartItems.map((product, UserCartDetails_ID) => (
                    <div key={UserCartDetails_ID}>
                      <center>
                        <Card>
                          <Card.Body>
                            <Row>
                              <Col xs={5}>
                                <img
                                  className="rounded-3 pt-3 pb-2   "
                                  src={product.Product_img}
                                  alt={`Image ${UserCartDetails_ID + 1}`}
                                  style={{ width: "100%", height: "150px" }}
                                />
                              </Col>
                              <Col xs={7}>
                                <p>{product.Product_name}</p>
                                <p>
                                  {product.isSale ? (
                                    <span className="fw-bold">
                                      ₹{product.Product_offerPrice}
                                    </span>
                                  ) : (
                                    <span className="fw-bold">
                                      ₹{product.Product_originalPrice}
                                    </span>
                                  )}
                                  &nbsp;
                                </p>
                                <div>
                                  <button
                                    className="rounded-3 pt-1 pb-1 px-2  inc-dec-btn"
                                    onClick={() =>
                                      handleDecrementQuantity(
                                        product.UserCartDetails_ID,
                                        Number(product.Qty) - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="fw-bold  pt-1 pb-1 px-lg-4 px-1">
                                    {product.Qty}
                                  </span>
                                  <button
                                    className="rounded-3  pt-1 pb-1 px-2  inc-dec-btn"
                                    onClick={() =>
                                      handleIncrementQuantity(
                                        product.UserCartDetails_ID,
                                        Number(product.Qty) + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <p className="mt-2">
                                  Total: ₹
                                  {product.isSale ? (
                                    <span className="fw-bold">
                                      {product.Product_offerPrice *
                                        parseFloat(product.Qty)}
                                    </span>
                                  ) : (
                                    <span className="fw-bold">
                                      {product.Product_originalPrice *
                                        parseFloat(product.Qty)}
                                    </span>
                                  )}
                                </p>

                                <button
                                  className="mt-2 rounded-3 cartremove-btn p-2"
                                  onClick={() =>
                                    handleRemoveFromCart(
                                      product.UserCartDetails_ID
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </center>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Col>

          <Col xs={12} lg={4}>
            <Card>
              <CardBody>
                <h5>
                  Cart totals
                  <hr />
                </h5>
                <Row className="justify-content-between">
                  <Col>
                    <p>Sub total</p>
                  </Col>
                  <Col></Col>
                  <Col>
                    {" "}
                    <p>₹{apiResponse ? discountedPrice : totalPrice}</p>
                  </Col>
                </Row>
                <div>
                  <p>Shipping:</p>
                  {/* Show loading animation for 2 seconds */}
                  {loading && (
                    <Player
                      autoplay
                      loop
                      src={baseUrl + "Animations/loading.json"}
                      style={{ height: "50px", width: "50px" }}
                      visible={true}
                    />
                  )}

                  {/* Display API data after loading */}
                  {apiData && (
                    <div>
                      {/* Display data from apiData */}
                      <div>
                        <p>Estimated Days: {apiData.estimated_Days}</p>
                        <p>ZipCode: {apiData.ZipCode}</p>
                      </div>
                    </div>
                  )}
                  <p>
                    {apiResponse && apiResponse.data && apiResponse.data[0]
                      ? `DiscountPercent: ${apiResponse.data[0].DiscountPercent} %`
                      : totalPrice}
                  </p>

                  <hr />
                  <Row className="justify-content-between">
                    {" "}
                    <Col>
                      <h6>Total</h6>
                    </Col>
                    <Col>
                      {" "}
                      <p>₹{apiResponse ? discountedPrice : totalPrice}</p>
                    </Col>
                  </Row>
                  <div>
                    <form onSubmit={handleCheckCouponavailble}>
                      <input
                        type="text"
                        value={inputValue2}
                        placeholder="Enter pin code"
                        onChange={(e) => setInputValue2(e.target.value)}
                      />
                      <br />
                      <button
                        type="submit"
                        className="coupon p-2 rounded-3 mt-2 mb-3"
                      >
                        Check Available
                      </button>
                    </form>
                  </div>

                  <div>
                    {cartItems.length !== 0 && showCouponButton2 && (
                      <div>
                        <form onSubmit={handleCheckCoupon}>
                          <input
                            type="text"
                            required
                            placeholder="Enter coupon code"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                          />
                          <br />
                          <button className="coupon p-2 rounded-3 mt-2 mb-3">
                            Check Coupon
                          </button>
                        </form>
                        {/* <input
                          type="text"
                          value={inputValue2}
                          onChange={(e) => setInputValue2(e.target.value)}
                        /> */}
                        <br />
                        <button
                          className="btna w-100 p-2 rounded-3"
                          onClick={handleCheckout}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <AddressDetail showCartPopup={showCartPopup} cartClose={cartClose} />
    </div>
  );
};

export default Cart;
