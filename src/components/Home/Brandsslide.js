import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "../../actions"; // Import the fetchBrands action
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Card, Col, Container, Row } from "react-bootstrap";

import "./Brandsslide.css";

const Brandsslide = () => {
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black", // Text color
          fontSize: "24px", // Adjust the font size as needed
        }}
        onClick={onClick}
      >
        <FaAngleLeft />
      </div>
    );
  };

  // Custom next arrow component
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black", // Text color
          fontSize: "24px", // Adjust the font size as needed
        }}
        onClick={onClick}
      >
        <FaAngleRight />
      </div>
    );
  };

  // Number of cards to show per slide
  const slidesToShow = 4;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,  // Enables automatic sliding
    autoplaySpeed: 1000,  // Slide every 2 seconds (adjust as needed)
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  

  const dispatch = useDispatch();

  // Fetch brands data from Redux store
  const brandsData = useSelector((state) => state.brands.brandsData);

  // Fetch brands data when the component mounts
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const prodta = brandsData.filter((pro) => pro.isPartner);

  return (
    <div className="brandsliding">
      <div className="container">
        <Container className="pt-2">
          <Row className="pt-3 pb-3  px-lg-3">
            <Slider {...settings}> 
              {prodta.map((brand) => (
                <Col key={brand.Brand_id}>
                  <Card
                    className=" mt-2 mb-2  "
                    style={{ background: "none", border: "none" }}
                  >
                    <center>
                      <Card.Img
                        className="pt-3 pb-3 brandimg"
                        src={brand.Brand_image} // Use the brand image here
                        alt={brand.Brand_Name}
                      />
                    </center>
                  </Card>
                </Col>
              ))}
            </Slider>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Brandsslide;
