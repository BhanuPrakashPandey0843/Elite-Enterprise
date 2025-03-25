import React from "react";
import AboutUs from "./AboutUS"; // Ensure AboutUS.js has a default export
import AboutUss from "./Aboutuss"; // Ensure Aboutuss.js has a default export
import WhyChooseUs from "./WhyChooseUs"; // Ensure WhyChooseUs.js has a default export
import Cardsimgs2 from "./Cardsimgs2";
import Brandpartners from "./Brandpartners";
import { Col, Row } from "react-bootstrap";
import chimg1 from "../../Images/image 55.png";
import Brands from "./Brands";
import "./About.css";

const About = () => {
  return (
    <div className="aboutcls">
      {/* Header section */}
      <div className="position-relative">
        <img src={chimg1} width="100%" style={{ height: "250px" }} alt="About Header" />
        <h3
          className="position-absolute top-50 start-50 translate-middle"
          style={{ color: "white" }}
        >
          About
        </h3>
      </div>

      <div className="mt-4">
        {/* About Sections */}
        <AboutUs />
        <AboutUss />
        <WhyChooseUs />

        {/* Spacer row for larger screens */}
        <Row className="d-none d-lg-block pt-5 pb-5 mt-5 mb-5">
          <Col className="mt-5 mb-5 pt-5 pb-5"></Col>
        </Row>
      </div>

      {/* Cards Section */}
      <div>
        <Cardsimgs2 />
      </div>
       <Brands />
      {/* Brand Partners Section */}
      <Brandpartners />
    </div>
  );
};

export default About;
