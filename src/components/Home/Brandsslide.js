import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands } from "../../actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Card, Container } from "react-bootstrap";

const Brandsslide = () => {
  const dispatch = useDispatch();
  const brandsData = useSelector((state) => state.brands.brandsData);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const filteredBrands = brandsData.filter((pro) => pro.isPartner);

  // Custom Arrow Components
  const SampleArrow = ({ className, style, onClick, direction }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: "50%",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        color: "#333",
        cursor: "pointer",
        position: "absolute",
        [direction]: "-50px",
        zIndex: "1000",
      }}
      onClick={onClick}
    >
      {direction === "left" ? <FaAngleLeft /> : <FaAngleRight />}
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1000,
    nextArrow: <SampleArrow direction="right" />,
    prevArrow: <SampleArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div style={{ background: "#f9f9f9", padding: "50px 0" }}>
      <Container>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontWeight: "bold" }}>
          Our Brand Partners
        </h2>
        <Slider {...settings}>
          {filteredBrands.map((brand) => (
            <Card
              key={brand.Brand_id}
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                overflow: "hidden",
                border: "none",
                padding: "20px",
                textAlign: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Card.Img
                src={brand.Brand_image}
                alt={brand.Brand_Name}
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            </Card>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Brandsslide;
