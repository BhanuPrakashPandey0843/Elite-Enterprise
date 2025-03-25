import React, { useState, useEffect } from "react";
import { ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, addToCart } from "../../actions";
import { fetchProducts } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Shoppage.css";

import Cookies from "js-cookie";
import { useAuth } from "../../AuthContext ";
import { useSpring, animated } from "react-spring";
import { addToCart1, fetchCartDetails } from "../../actions/cartActions";

const Shoppage = ({ searchQuery, handleShow2 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  // Fetch products from the Redux store when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fetch cart items based on user login status
  useEffect(() => {
    dispatch(fetchCartDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!searchQuery) {
      // If searchQuery is empty, fetch and display all products
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: products });
    } else {
      // If there is a search query, filter and display the matching products
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filteredProducts });
    }
  }, [searchQuery, products, dispatch]);

  // Function to navigate to the single product page
  const Scrollink = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // State to control the cart pop-up visibility
  const [showCartPopup, setShowCartPopup] = useState(false);

  // old handle cart

  // const handleAddToCart1 = (product, Qty) => {
  //   // window.scrollTo(0, 0);
  //   if (!userId) {
  //     dispatch(addToCart(product, Qty));
  //     setShowCartPopup(true);
  //   } else {
  //     dispatch(addToCart1(product, Qty));
  //     setTimeout(() => {
  //       setShowCartPopup(true);
  //     }, 1000);
  //   }
  //   setTimeout(() => {
  //     setShowCartPopup(false);
  //   }, 2000); // Updated to 5 seconds
  // };

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
    setTimeout(() => {
      setShowCartPopup(false);
    }, 2000); // Updated to 5 seconds
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
          {
            searchQuery !== "" ? ( // Only render when there's a search query
              products.length > 0 ? ( // Render products if there are products in the array
                products.map((product, UserCartDetails_ID) => (
                  <Col key={UserCartDetails_ID}>
                    <Card className="rounded-2 pt-1 pb-1 shopcards">
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
                                  className="rounded-3  mt-3  p-lg-4 pt-lg-4 pt-3 pb-3 prdctimg"
                                  src={product.Product_img}
                                  alt={`Image ${UserCartDetails_ID + 1}`}
                                  // style={{ width: "100%", height: "250px" }}
                                />
                              </div>
                              <div className="mt-2  text-center">
                                <h5
                                  className="productname"
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
                                      style={{ color: "#707070", fontSize:15 }}
                                    >
                                      <s>₹{product.Product_originalPrice}</s>
                                    </span>
                                  )}
                                </p>
                              </div>
                            </Col>
                            <Col lg={7} xl={6} md={6} xs={12}>
                              {/* Button to add the product to the cart */}
                              <Card.Text className="text-center  mt-xl-0 mt-md-2">
                                {isProductInCart(product.Product_id) ||
                                product.isAddedToCart ? (
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
                                    className="rounded-3  fw-normal p-1 p-md-2 px-2"
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
                              </Card.Text>
                            </Col>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                // Display a message when there are no products matching the search query
                <Col>
                  <p>No product found</p>
                </Col>
              )
            ) : searchQuery === "" ? ( // Display a message when there is no search query
              <Col>
                <p>No search query entered</p>
              </Col>
            ) : null // You can also replace null with another component or message if needed
          }
        </Row>
      </Container>

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
  );
};

export default Shoppage;
