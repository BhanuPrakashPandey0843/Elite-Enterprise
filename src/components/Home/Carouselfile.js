import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./Carouselfile.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Globalvarible";
import { useAuth } from "../../AuthContext ";

const Carouselfile = () => {
  const navigate = useNavigate();

  const { setActiveButton } = useAuth();
  //navigate shoppage
  const handleclick = () => {
    window.scrollTo(0, 0);
    setActiveButton(2);
    navigate("/shoppage");
  };

  const [carouselData, setCarouselData] = useState([]);
  useEffect(() => {
    fetch(baseUrl + "Home_Slider_Images_API.php")
      .then((resp) => resp.json())
      .then((res) => setCarouselData(res));
  }, []);





  
  return (
    <div className="homecarousel ">
      <Carousel
        className="carouselbtns"
        nextIcon={
          <BsChevronRight className="rightangle" style={{ color: "black" }} />
        }
        prevIcon={
          <BsChevronLeft className="leftangle" style={{ color: "black" }} />
        }
      >
        {carouselData.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="position-relative carouseldiv">
              <img
                src={item.url}
                className="d-block w-100 h-100vh carouselimg"
                // style={{ height: "400px" }}
                alt={`Slide ${index + 1}`}
              />
              <div className="carousel-caption ">
                <div className="caption-content mb-lg-0 pb-lg-0 mt-lg-4  mb-3 pb-5 ">
                  <h5 className="text-white " style={{ color: "#B27B60" }}>
                    {item.caption}
                  </h5>
                  <p className=" text-white" style={{ color: "#525C60" }}>
                    {item.content}
                  </p>
                  <div className="shopnowbtn">
                    <button className="d-flex   px-4 p-2 fs-6" onClick={handleclick}>
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carouselfile;
