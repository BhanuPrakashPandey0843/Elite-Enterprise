import React from "react";
import Brandsslide from "../Home/Brandsslide";
import { Col, Row, Container } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./Brandpartners.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext ";

const Brandpartners = () => {
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
      <Brandsslide />
    </div>
  );
};

export default Brandpartners;
