import React from "react";
import { useLocation } from "react-router-dom";
import sbimg from "../../Images/image 55.png";
import "./Singleblog.css";
import { Card, Col, Row } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import DOMPurify from "dompurify";

const Singleblog = () => {
  // Access location state to get the passed data
  const location = useLocation();
  const { blogData } = location.state;

  // Destructure blogData to access its properties
  const { date, cname, caption1, caption2 } = blogData;

  return (
    <div className="sblog mb-2">
      <div className="position-relative">
        <img src={sbimg} width="100%" alt="img" />
        <div className="sb-card pb-lg-5 mx-3  mx-lg-5 px-lg-5">
          <Card
            className="rounded-4 px-lg-5 mx-lg-5 py-lg-3 px-md-4 py-2 px-2 py-md-3 "
            style={{
              border: "none",
              boxShadow: "rgba(204, 204, 204, 0.25) 0px 14px 36px 0px",
            }}
          >
            <Card.Body>
              <Row className="srow" lg={2}>
                <Col xl={3} lg={5} md={4}>
                  <p className="postdate">
                    <span className="fw-bold">Posted On:</span> {date}
                  </p>
                </Col>
                <Col xl={2} lg={4} md={4}>
                  <p>
                    <FaUser style={{ color: "rgb(178, 123, 96)" }} />
                    <span> By {cname}</span>
                  </p>
                </Col>
              </Row>
              <Card.Title className="card-title h5">
                <h3 className="fw-bold mt-2">{caption1}</h3>
              </Card.Title>
              <p className="Established-text me-lg-5 pe-lg-5 card-text" 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(caption2) }}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Singleblog;
