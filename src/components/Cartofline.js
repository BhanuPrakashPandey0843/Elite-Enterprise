import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row, Table } from "react-bootstrap";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../actions"; // Import the actions
import "./Cart.css";
import Cookies from "js-cookie";
import { Player } from "@lottiefiles/react-lottie-player";
import { baseUrl } from "../Globalvarible";
import Marquee from "react-fast-marquee";

const Cartofline = ({ handleShowA }) => {
  const cartItems1 = useSelector((state) => state.cart1.items);
  const { totalPrice } = useSelector((state) => state.cart1);
  const dispatch = useDispatch();

  const userId = Cookies.get("userId"); 

  const handleIncrementQuantity = (productId, Qty) => {
    dispatch(incrementQuantity(productId, Qty));
  };

  const handleDecrementQuantity = (productId, Qty) => {
    dispatch(decrementQuantity(productId, Qty));

    const item = cartItems1.find((item) => item.Product_id === productId);
    if (item && item.Qty === 0) {
      dispatch(removeFromCart(productId, Qty));
    }
  };

  //checkout
  const handleCheckout = () => {
    if (!userId) {
      // User is not logged in
      // Show a signup or login form

      handleShowA();
    }
  };
  const handleRemoveFromCart = (productId) => {
    const itemIndex = cartItems1.findIndex(
      (item) => item.Product_id === productId
    );

    if (itemIndex !== -1) {
      // Use the index to remove the item from the array
      cartItems1.splice(itemIndex, 1);
      dispatch(removeFromCart(productId));
    }
  };



  
  return (
    <div className="container cartpage">
      <Container>
        <Row lg={2}>
          <Col xs={12} lg={8}>
            {" "}
            { cartItems1.length === 0 ? (
              <div className="mx-5 mt-4">
                <Player
                  autoplay
                  loop
                  src={baseUrl + "Animations/Cart404.json"}
                  style={{ height: "300px", width: "300px" }}
                  visible={true}
                ></Player>
              </div>
            ) :
             (
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
                      {cartItems1.map((product, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              className="rounded-3  p-4  prdctimg"
                              src={product.Product_img}
                              alt={`Image ${i + 1}`}
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
                              className=" rounded-2 pt-1 pb-1 px-2 inc-dec-btn"
                              onClick={() =>
                                handleDecrementQuantity(product.Product_id)
                              }
                            >
                              -
                            </button>
                            <span className="fw-bold px-1  pt-1 pb-1 px-lg-4 Qty">
                              {product.Qty}
                            </span>
                            <button
                              className=" rounded-2 pt-1 pb-1 px-2 inc-dec-btn"
                              onClick={() =>
                                handleIncrementQuantity(product.Product_id)
                              }
                            >
                              +
                            </button>
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            Total: ₹
                            {product.isSale ? (
                              <span className="fw-bold">
                                {product.Product_offerPrice * product.Qty}
                              </span>
                            ) : (
                              <span className="fw-bold">
                                {product.Product_originalPrice * product.Qty}
                              </span>
                            )}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <button
                              rounded-3
                              className="rounded-3 cartremove-btn p-2"
                              onClick={() =>
                                handleRemoveFromCart(product.Product_id)
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
                  {cartItems1.map((product, i) => (
                    <div key={i}>
                      <center>
                        <Card>
                          <Card.Body>
                            <Row>
                              <Col xs={5}>
                                <img
                                  className="rounded-3 pt-3 pb-2   "
                                  src={product.Product_img}
                                  alt={`Image ${i + 1}`}
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
                                    <span className="fw-bold ">
                                      ₹{product.Product_originalPrice}
                                    </span>
                                  )}
                                </p>
                                <div>
                                  <button
                                    className=" rounded-3  pt-1 pb-1 px-2  inc-dec-btn"
                                    onClick={() =>
                                      handleDecrementQuantity(
                                        product.Product_id
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="px-1  pt-1 pb-1 px-lg-4 fw-bold ">
                                    {product.Qty}
                                  </span>
                                  <button
                                    className=" rounded-3  pt-1 pb-1 px-2 inc-dec-btn"
                                    onClick={() =>
                                      handleIncrementQuantity(
                                        product.Product_id
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
                                      {product.Product_offerPrice * product.Qty}
                                    </span>
                                  ) : (
                                    <span className="fw-bold">
                                      {product.Product_originalPrice *
                                        product.Qty}
                                    </span>
                                  )}
                                </p>

                                <button
                                  className="rounded-3 cartremove-btn p-2"
                                  onClick={() =>
                                    handleRemoveFromCart(product.Product_id)
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
                  <Col>
                    {" "}
                    <p> ₹{totalPrice}</p>
                  </Col>
                </Row>
                <div>
                  <p>Shipping:</p>

                  <hr />
                  <Row className="justify-content-between">
                    {" "}
                    <Col>
                      <h6>Total</h6>
                    </Col>
                    <Col>
                      {" "}
                      <p> ₹{totalPrice}</p>
                    </Col>
                  </Row>
                  {userId ? (
                    <>
                      <input type="text" />
                      <br />
                      <button className="coupon p-2 rounded-3 mt-2 mb-3">
                        check coupon
                      </button>
                    </>
                  ) : null}
                  <center>
                    {cartItems1 && cartItems1.length !== 0 ? (
                      <button
                        className="btna w-100 p-2 rounded-3"
                        onClick={handleCheckout}
                      >
                        Proceed To Checkout
                      </button>
                    ) : null}
                  </center>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cartofline;
