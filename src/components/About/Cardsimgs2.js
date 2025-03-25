import React from "react";
import cimg1 from "../../Images/Return Purchase.png";
import cimg2 from "../../Images/Natural Food.png";
import cimg3 from "../../Images/Phone Time.png";
import cimg4 from "../../Images/Card Security.png";
import { Card, Col, Row } from "react-bootstrap";
import "./Cardsimgs-2.css";
import { Link } from "react-router-dom";

const cimgs = [
  {
    img: cimg1,
    caption1: "Return Policy",
    link: "/refund", // Add a 'link' property for the URL to navigate,
    caption2:
      "Our commitment to your satisfaction is unwavering. If, for any reason, you're not completely satisfied with your purchase, our hassle-free return policy ensures a seamless process for returns and exchanges.",
  }, 
  {
    img: cimg2,
    caption1: "100% Fresh",
    caption2:
      "At Elite Enterprise, freshness is our promise. We source and deliver products with the utmost care, guaranteeing that every item you receive is of the highest quality and as fresh as can be.",
  },
  {
    img: cimg3,
    caption1: "Support 24/7",
    caption2:
      "Your convenience is our priority. Our dedicated support team is available 24/7 to assist you with any queries, concerns, or assistance you may need. We're here around the clock to ensure a smooth and enjoyable experience for you.",
  },
  {
    img: cimg4,
    caption1: "Secured Payment",
    caption2:
      "Your security is paramount. With state-of-the-art encryption and secure payment gateways, you can trust that your transactions with Elite Enterprise are safe and protected, providing you with peace of mind during every purchase.",
  },
];
const handleLinkClick = () => {
  window.scrollTo(0, 0);
};
const Cardsimgs2 = () => {
  return (
    <div className="cardimgscls-2 ">
      <div
        className="cardimgscls-div px-xl-5 pt-5 pt-lg-0 pb-5 mt-5 mt-lg-0"
        style={{ background: "#D1D1D1" }}
      >
        <Row className="d-none d-lg-block pb-5  mb-5">
          <Col className=" mb-5 pb-5"></Col>
        </Row>
        <Row
          xs={1}
          md={2}
          lg={4}
          className="g-4 cardsrow pb-lg-5 py-lg-3 mb-lg-5  pt-5 justify-content-center px-xl-5 mx-lg-5  mx-4"
        >
          {cimgs.map((item, i) => (
            <Col key={i} className="justify-content-center px-xl-3">
              <Card
                className="rounded-5 about-cards p-lg-2 py-lg-5  pt-5 pb-5"
                style={{ background: "#FFF" }}
              >
                <center>
                  <Card.Img
                    className="rounded-3 p-4"
                    src={item.img}
                    alt={`Image ${i + 1}`}
                    width="80px"
                    style={{ width: "80px", backgroundColor: "#EAE6DC" }}
                  />
                </center>
                <Card.Body>
                  {item.caption1 === "Return Policy" ? (
                    <Link
                      to={item.link}
                      style={{ textDecoration: "none" }}
                      onClick={() => handleLinkClick()}
                    >
                      <Card.Text className="text-center text-1">
                        {item.caption1}
                      </Card.Text>
                    </Link>
                  ) : (
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Card.Text className="text-center text-1">
                        {item.caption1}
                      </Card.Text>
                    </Link>
                  )}

                  <Card.Text className="text-start px-xl-2 text-2">
                    {item.caption2}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Cardsimgs2;
