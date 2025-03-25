import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchBrandProducts } from "../../actions"; // Import the action to fetch brand products
import { ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  Button } from "react-bootstrap";
import "../Shoppages/Shoppage.css";

import Cookies from "js-cookie";
import { Player } from "@lottiefiles/react-lottie-player";
import { baseUrl } from "../../Globalvarible";
import { useSpring, animated } from "react-spring";
import { useAuth } from "../../AuthContext ";
import { addToCart1 } from "../../actions/cartActions";

const BrandProductsPage = ({ handleShow2 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandId = queryParams.get("Brand_id");
  const loading = useSelector((state) => state.brandProducts.loading);

  const products = useSelector((state) => state.brandProducts.products);

  const error = useSelector((state) => state.brandProducts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch an action to fetch products for the specified Brand_id
    dispatch(fetchBrandProducts(brandId));
  }, [dispatch, brandId]);

  const Scrollink = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // State to control the cart pop-up visibility
  const [showCartPopup, setShowCartPopup] = useState(false);

  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  const handleAddToCart1 = (product, Qty) => {
    // window.scrollTo(0, 0);
    if (!userId) {
    handleShow2();
    } else {
      dispatch(addToCart1(product, Qty));
      setTimeout(() => {
        setShowCartPopup(true);
      }, 1000);
    }
    setTimeout(() => {
      setShowCartPopup(false);
    }, 2000); // Updated to 5 seconds
  };
  const { setActiveButton } = useAuth();
  const handleViewCart = () => {
    window.scrollTo(0, 0);
    setShowCartPopup(false); // Close the popup
    if (!userId) {
      setActiveButton(6);
      navigate("/cartpage"); // Navigate to cartpage if userId is not available
    } else {
      setActiveButton(6);
      navigate("/cart"); // Navigate to cart if userId is available
    }
  };

  const notificationAnimation = useSpring({
    opacity: showCartPopup ? 1 : 0,
    transform: showCartPopup ? "translateY(0)" : "translateY(-100%)",
  });

  const cartItems = useSelector((state) => state.cart.cartDetails);
  const cartItems1 = useSelector((state) => state.cart1.items);
  // Function to check if a product is already in the cart
  const isProductInCart = (productId) => {
    if (!userId) {
      return cartItems1.some((item) => item.Product_id === productId);
    } else {
      return cartItems.some((item) => item.Product_id === productId);
    }
  };

  return (
    <div>
      {products.length === 0 ? (
        <div>
          <Player
            autoplay
            loop
            src={baseUrl + "Animations/Brand404.json"}
            style={{ height: "300px", width: "300px" }}
            visible={true}
          ></Player>
        </div>
      ) : loading ? (
        <div>
          <Player
            autoplay
            loop
            src={baseUrl + "Animations/loading.json"}
            style={{ height: "300px", width: "300px" }}
            visible={true}
          ></Player>
        </div>
      ) : error ? (
        <>error:{error}</>
      ) : (
        <div className="shoppagecls">
          <Container>
            {/* Render product cards */}
            <Row
              xs={2}
              md={2}
              lg={3}
              xl={4}
              className="g-4 cardsrow  pb-md-5 py-md-3 mb-md-5 pt-5"
            >
              {products.map((product, UserCartDetails_ID) => (
                <div key={UserCartDetails_ID} className="px-2">
                  <Card className="rounded-3 pt-1 pb-1 shopcards mx-1 mb-2">
                    <Card.Body>
                      <div className="position-relative">
                        {/* Display "Sale" button if the product is on sale */}
                        {product.isSale && (
                          <button
                            className="sale-button rounded-3 px-2"
                            style={{
                              background: "#DC0000",
                              border: "none",
                              color: "white",
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                          >
                            Sale
                          </button>
                        )}
                        {/* Handle clicking on a product card to navigate */}
                        <Link
                          className="cartlink"
                          to={`/singleproductpage/${product.Product_id}`}
                          onClick={() => {
                            Scrollink();
                          }}
                        >
                          <Row>
                            <div className="cardimg">
                              <Card.Img
                                variant="top"
                                className="rounded-3 mt-3 prdctimg  p-lg-4 pt-lg-4 pt-3 pb-3"
                                src={product.Product_img}
                                alt={`Image ${UserCartDetails_ID + 1}`}
                                // style={{ width: "100%", height: "250px" }}
                              />
                            </div>
                            <div
                              className="text-center"
                              // style={{ height: "50px" }}
                            >
                              <h5
                                className="productname mt-2"
                                style={{ lineHeight: "1.2" }}
                              >
                                {product.Product_name}
                              </h5>
                            </div>
                          </Row>
                        </Link>
                        <div className="px-3 d-md-none d-lg-block d-none">
                          <hr />
                        </div>
                        {/* Display original and offer prices */}
                        <Row lg={2} className="row2cart">
                          <Col lg={5} xl={6} md={6} xs={12}>
                            <div className="mt-0 mt-lg-2 mt-md-2 ms-lg-0 price fs-5">
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
                                {product.isSale && (
                                  <span
                                    className="fw-normal"
                                    style={{ color: "#B8B8B8" }}
                                  >
                                    <s>₹{product.Product_originalPrice}</s>
                                  </span>
                                )}
                              </p>
                            </div>
                          </Col>
                          <Col lg={7} xl={6} md={6} xs={12}>
                            {/* Button to add the product to the cart */}
                            <div className="text-center  mt-xl-0 mt-md-2">
                              {isProductInCart(product.Product_id) ? (
                                <button
                                  className="rounded-3  fw-normal p-1 p-md-2 px-2"
                                  style={{
                                    background: "#000066",
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={handleViewCart}
                                >
                                  View Cart
                                </button>
                              ) : (
                                <button
                                  className="rounded-3  fw-normal p-2"
                                  style={{
                                    background: "#8F3300",
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    handleAddToCart1(product, "1");
                                  }}
                                >
                                  Add To Cart
                                </button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </Container>

          {/* Cart Pop-up */}
          <animated.div
            className="notification m-2"
            style={{
              ...notificationAnimation,
              position: "fixed",
              top: 0,
              right: 0,
            }}
          >
            <Card className="popupcart text-center pt-2 pb-2 ">
              <p>Item Added to Cart</p>
              <p>Your item has been added to the cart.</p>
              <Container className="d-flex justify-content-center align-items-center ">
                <ButtonGroup>
                  <Button
                    className="cartpopupbtn2 p-2 rounded-3"
                    onClick={handleViewCart}
                  >
                    View Cart
                  </Button>
                  <Button
                    className="cartpopupbtn1 p-2 px-4 mx-1 rounded-3"
                    onClick={() => setShowCartPopup(false)}
                  >
                    Close
                  </Button>
                </ButtonGroup>
              </Container>
            </Card>
          </animated.div>
        </div>
      )}
    </div>
  );
};

export default BrandProductsPage;
