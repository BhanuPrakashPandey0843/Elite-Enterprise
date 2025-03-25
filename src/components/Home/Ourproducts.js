import React from "react";

import { Container, Row } from "react-bootstrap";

import Shopcardslide2 from "../Shoppages/Shopcardslide2";
import Shopcardslide from "../Shoppages/Shopcardslide";

const Ourproducts = ({ handleShow2 }) => {
  return (
    <div className="ourproductscls mt-2">
      {/* Top section with background color */}
      <div style={{ background: "#FFDAA9" }}>
        <Container>
          <Row className="pt-5 pb-5 text-center ourproductsrow">
            <h1>Our Products</h1>
          </Row>
        </Container>
      </div>

      <div className="container">
        <h2
          className="featuredproducts  px-4 pt-3 mt-4"
          style={{ color: "#000066" }}
        >
          FEATURED PRODUCTS
        </h2>
      </div>

      {/* Render the Shoppage component for featured products */}

      <Shopcardslide handleShow2={handleShow2} />
      <div className="container">
        <h2
          className="featuredproducts  px-4 mt-4"
          style={{ color: "#000066" }}
        >
          NEW ARRIVALS
        </h2>
      </div>

      {/* Render the Shoppage component for new arrivals */}
      <Shopcardslide2 handleShow2={handleShow2} />
    </div>
  );
};

export default Ourproducts;
