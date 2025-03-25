import React, { useEffect, useState } from "react";

import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./Singleshoppage.css";
import Shopcardslide from "./Shopcardslide";

import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import {  fetchProducts } from "../../actions";
import { useSpring, animated } from "react-spring";
import { addToCart1 } from "../../actions/cartActions";
import DOMPurify from "dompurify";

const Singleshoppage = ({ handleShow2 }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  //single cartpage

  const navigate = useNavigate();
  const [showCartPopup, setShowCartPopup] = useState(false);

  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  const { cardId } = useParams() || {};
  const card = useSelector((state) =>
    state.products.filteredProducts.find(
      (product) => product.Product_id === cardId
    )
  );
  const notificationAnimation = useSpring({
    opacity: showCartPopup ? 1 : 0,
    transform: showCartPopup ? "translateY(0)" : "translateY(-100%)",
  });
  const dispatch = useDispatch();

  const [Qty, setQty] = useState("1");
  const [selectedImage, setSelectedImage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  //img zoom
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = (newImage) => {
    setSelectedImage(newImage);
  };
  // Handle input change for custom quantity
  const handleInputChange = (e) => {
    const inputNumber = parseInt(e.target.value, 10);
    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 100) {
      setQty(inputNumber.toString());
      // Removed the setSelectedQuantity line since selectedQuantity is not used
    } else {
      setQty("1");
    }
  };
  const handleIncrementQuantity = () => {
    const newQty = parseInt(Qty, 10) + 1;
    setQty(newQty.toString());
  };

  const handleDecrementQuantity = () => {
    const newQty = parseInt(Qty, 10) - 1;
    if (newQty >= 1) {
      setQty(newQty.toString());
    }
  };

  // Toggle showInfo state for product information
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Toggle showInfo1 state for additional information
  const toggleInfo1 = () => {
    setShowInfo1(!showInfo1);
  };

  //single cart

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchProducts());

      if (card && card.Product_img) {
        setSelectedImage(card.Product_img);
        setDataLoaded(true);
      }
    }
  }, [cardId, dispatch, card, dataLoaded]);
  if (!card) {
    return (
      <Container>
        <p>Card not found.</p>
      </Container>
    );
  }

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
  const handleViewCart = () => {
    setShowCartPopup(false); // Close the popup
    if (!userId) {
      navigate("/cartpage"); // Navigate to cartpage if userId is not available
    } else {
      navigate("/cart"); // Navigate to cart if userId is available
    }
  };

  // img zoom
  const handleMouseMove = (e) => {
    if (isZoomed) {
      const image = document.getElementById("zoomed-image");
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const zoomedImage = document.getElementById("zoomed-image");
      zoomedImage.style.transformOrigin = `${(x / rect.width) * 100}% ${
        (y / rect.height) * 100
      }%`;
    }
  };

  const handleZoomIn = () => {
    setIsZoomed(true);
    // Add the 'zoomed' class to apply the zoom effect
    const zoomedImage = document.getElementById("zoomed-image");
    zoomedImage.classList.add("zoomed");
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
    // Remove the 'zoomed' class to reset the zoom effect
    const zoomedImage = document.getElementById("zoomed-image");
    zoomedImage.classList.remove("zoomed");
  };

  return (
    <div className="singleproductpage">
      <div className="position-relative mb-3">
        <img src={"https://theeliteenterprise.in/static/media/image%2055.01e41ab2d7e4b1386300.png"} width="100%" style={{ height: "250px" }} alt="img" />
        <h3
          className="position-absolute top-50 start-50 translate-middle"
          style={{ color: "white" }}
        >
          {card.Product_name}
        </h3>
      </div>
      <Container>
        <Row className="justify-content-center d-md-flex flex-md-row d-sm-block">
          <Col
            lg={2}
            md={2}
            className="pt-md-4 px-xl-5 mt-md-5 imgcol order-md-0 order-2"
          >
            <Row className="justify-content-center mt-md-0 mt-4">
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img2}
                  alt=" "
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img2)}
                />
              </Col>
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img3}
                  alt=" "
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img3)}
                />
              </Col>
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img}
                  alt=" "
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img)}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} className="mt-md-5 order-md-1 order-1 pt-4">
            <div>
              <br />
              <div className="position-relative">
                <div>
                  {card.isSale && (
                    <button
                      className="sale-button  rounded-3 position-absolute  px-4"
                      style={{
                        background: "#DC0000",
                        border: "none",
                        color: "white",
                        top: "-30px" /* Adjust this value for vertical positioning */,
                        right:
                          "0px" /* Adjust this value for horizontal positioning */,
                      }}
                    >
                      Sale
                    </button>
                  )}
                </div>
                <Card
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)",
                    border: "none",
                    overflow: "hidden",
                  }}
                >
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleZoomOut}
                    id="zoomed-image"
                  >
                    <Card.Img
                      variant="top"
                      className=" singlecardprdctimg p-3"
                      src={selectedImage}
                      alt="product"
                      onMouseEnter={handleZoomIn}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </Col>

          {/* carameldiv column */}
          <Col lg={6} md={6} className="px-xl-5 order-md-1 order-3">
            <div className="carameldiv mt-md-5">
              <p className="fs-3 pt-3 pb-0 mb-0">{card.Product_name}</p>

              <p className="fs-4 mb-1 mt-0 pt-0">
                Price
                <br />
                {card.isSale ? (
                  <span className="fw-bold">₹{card.Product_offerPrice}</span>
                ) : (
                  <span className="fw-bold">₹{card.Product_originalPrice}</span>
                )}
                &nbsp;
                {card.isSale && (
                  <span className="fw-normal" style={{ color: "#707070", fontSize:15 }}>
                    <s>₹{card.Product_originalPrice}</s>
                  </span>
                )}
              </p>
              <p className="fs-4 fw-bolder ">Description:</p>
              <p className="mt-3">{card.Product_desc}</p>
              <div>
                <Row className="quantitycls mt-4 mb-5">
                  <Col>
                    <div className="mb-2">
                      <div className="d-flex">
                        <h6 className="mt-1">Quantity:</h6>
                        <br />
                        <div>
                          <button
                            className="rounded-3 pt-1 pb-1 px-2  inc-dec-btn"
                            onClick={() =>
                              handleDecrementQuantity(
                                card.Product_id,
                                Number(card.Qty) - 1
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            className="quantity p-1 text-center"
                            type="number"
                            placeholder="1"
                            value={Qty}
                            onChange={handleInputChange}
                            style={{
                              width: "50px",
                              border: "1px solid #dee2e6",
                            }}
                          />
                          <button
                            className="rounded-3  pt-1 pb-1 px-2  inc-dec-btn"
                            onClick={() =>
                              handleIncrementQuantity(
                                card.Product_id,
                                Number(card.Qty) + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Row lg={2} className=" mt-3">
                    <Col xs={6}>
                      <button className="px-lg-4 p-2 px-2 p-lg-3 mb-2 text-center rounded-4 shareproductbtn">
                        {" "}
                        Share this Product
                      </button>
                    </Col>
                    <Col xs={6}>
                      {" "}
                      <button
                        className="px-lg-4 p-2 px-3  p-lg-3 mb-2 text-center addtocart"
                        onClick={() => {
                          handleAddToCart1(card, Qty);
                        }}
                      >
                        ADD TO CART
                        <FaArrowRight
                          className="ms-2 rounded-circle  text-black p-1"
                          style={{ backgroundColor: "#FFDAA9" }}
                        />
                      </button>
                    </Col>
                  </Row>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

          {/* Buttons to toggle product information and additional information */}
        <center>
          <button
            className="mx-5 mt-5 mb-2 p-3 text-center rounded-4 additionalinfotbtn"
            onClick={toggleInfo}
          >
            Additional Info
          </button>
        </center>

        {/* Welcome paragraphs */}
        <div className="welcomeparaclses">

          {showInfo && (
            <Row className="text-center mt-5 mb-4">
               <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.Product_desc_long) }} />
            </Row>
          )}

          <Row className="relaprds">
            <h3 className=" text-center mt-5 mb-4">Related Products</h3>
            <Shopcardslide />
          </Row>
        </div>
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
  );
};

export default Singleshoppage;
