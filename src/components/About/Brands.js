import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Brands.css";
import Brandsslide from "./Brandsslide";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext ";
const Brands = () => {
  const navigate = useNavigate();

  //navigate brandspage
  const { setActiveButton } = useAuth();
  const handleclick = () => {
    window.scrollTo(0, 0);
      setActiveButton(3);
    navigate("/brandspage");
  };
  return (
    <div>
      <div style={{ backgroundColor: "#FBD198" }}>
        <Container className="brandspage  pt-3 pb-3">
          <Row className="justify-content-between mt-5 p-5">
            <Col lg="3" xs="12" md="5">
              <p style={{fontSize:40}}>Brands</p>
              <h3>Our Brand Partners</h3>
            </Col>

            <Col lg="3" xs="12" md="5">
              <button className="px-4 p-3 text-center" onClick={handleclick}>
                View All Brands Now &nbsp;
                <FaArrowRight
                  className="ms-2 rounded-circle  text-black p-1"
                  style={{ backgroundColor: "#FFDAA9" }}
                />
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ background: "rgb(255, 247, 239)" }}>
        <Brandsslide />
      </div>
    </div>
  );
};

export default Brands;
