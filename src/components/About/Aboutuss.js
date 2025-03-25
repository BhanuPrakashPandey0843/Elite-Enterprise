import React from "react";
import { Row, Col } from "react-bootstrap";
import chimg4 from "../../Images/About us.jpg";

const AboutUss = () => {
  return (
    <div className="container py-5">
      {/* Title Section */}
      <h1 className="text-center fw-bold mb-3">Building Trust, Delivering Excellence</h1>
      <h3 className="text-center text-muted">
        We do Creative <br /> Things for Success
      </h3>

      {/* First Section: Image in Center, Text Around */}
      <Row className="mt-5 align-items-center text-center text-lg-start">
        <Col lg={4}>
          <h5 className="fw-bold">Our Competitive Edge</h5>
          <p>
          In a market brimming with competition, Elite Enterprise distinguishes itself through a combination of quality, agility, and a customer-centric ethos. We constantly analyze industry trends, adapting our strategies to stay ahead of the curve. Our commitment to continuous improvement propels us to explore new avenues and push the boundaries of what's possible.
          </p>

          <h5 className="fw-bold">Client-Centric Approach</h5>
          <p>
          At Elite Enterprise, our clients are at the heart of everything we do. We understand that each client is unique, with distinct needs and aspirations. Our client-centric approach ensures that we not only meet expectations but exceed them. We forge lasting relationships by delivering solutions that add tangible value to our clients' businesses.
          </p>
        </Col>

        {/* Centered Image */}
        <Col lg={4} className="text-center">
          <img
            src={chimg4}
            alt="About Us"
            className="img-fluid rounded shadow-lg"
          />
        </Col>

        <Col lg={4}>
          <h5 className="fw-bold">Collaborative Partnerships</h5>
          <p>
          We view our clients not just as customers but as partners in success. Through open communication and collaboration, we work hand in hand to achieve mutual goals. Our emphasis on building long-term relationships has been instrumental in our growth and success.
          </p>

          <h5 className="fw-bold">Your Vision, Our Mission</h5>
          <p>
          Our mission is simple – to transform your vision into reality. Whether you're seeking innovative solutions, reliable services, or a trusted partner for your business, Elite Enterprise is here to exceed your expectations. Join us on this journey of excellence, where your success is our success.
Choose Elite Enterprise – Where Excellence Meets Innovation.
          </p>
        </Col>
      </Row>

      {/* Second Section: Image on Right, Text on Left */}
      
    </div>
  );
};

export default AboutUss;
