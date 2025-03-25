import React, { useState } from "react";
import comg1 from "../../Images/image 55.png";
import comg2 from "../../Images/contact us.jpg";
import comg3 from "../../Images/contact us 2nd image elite enterprise.jpg";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  // Define state to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  // Handle input field changes and update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="contactcls">
      {/* Top section with an image and title */}
      <div className="position-relative">
        <img src={comg1} width="100%" style={{ height: "250px" }} alt="img5" />
        <h3
          className="position-absolute fw-bold top-50 start-50 translate-middle"
          style={{ color: "white" }}
        >
          Contact Us
        </h3>
      </div>
      <Container className="mt-5 pt-lg-5">
        {/* 2-column layout */}
        <Row lg={2} md={1} xs={1} className="row2 g-5 justify-content-center">
          <Col xs={12} lg={5}>
            <img className="rounded-4" width="100%" src={comg2} alt="img4" />
          </Col>
          <Col xs={12} lg={5}>
            <h3>We'd love to talk about how we can work together.</h3>
            <p className="pt-2 pb-3">
            We're thrilled to connect with you! At EliteEnterprises, crafting delicious chocolates is our passion, 
            and we're always eager to explore new opportunities. Whether you have questions about our products, 
            want to inquire about custom orders, or simply want to share your love for chocolate, 
            we're here to listen and assist you every step of the way.
            </p>

            {/* Contact information */}
            <div className="me-lg-5 pe-lg-5 ">
              <Row
                className="bg-white mt-3 p-lg-3  pt-3 pb-3 rounded-3 "
                style={{ border: "1px solid #EEE" }}
              >
                <Col lg={2} xs={2}>
                  <FaEnvelope className="ms-2 rounded-3  p-1 ficon" />
                </Col>
                <Col lg={6} xs={8}>
                  <h5 className="fw-bold">
                    Message
                    <br />
                  </h5>
                  <p>elite.enter@yahoo.com</p>
                </Col>
              </Row>
            </div>
            <div className="me-lg-5 pe-lg-5">
              <Row
                lg={6}
                className="bg-white mt-3 p-lg-3 pt-3 pb-3 rounded-3 "
                style={{ border: "1px solid #EEE" }}
              >
                <Col lg={2} xs={2}>
                  <FaPhoneAlt className="ms-2 rounded-3  p-2 ficon" />
                </Col>
                <Col lg={6} xs={8}>
                  <h5 className="fw-bold">
                    Contact Us
                    <br />
                  </h5>
                  <p>+919820244338</p>
                </Col>
              </Row>
            </div>

            {/* Social media icons */}
            <Row className="iconsrow mt-3 text-md-start justify-content-md-start justify-content-center">
              <FaInstagram className="icons rounded-circle m-1 p-2" />
              <FaFacebook className="icons rounded-circle m-1 p-2" />
              <FaTwitter className="icons rounded-circle m-1 p-2" />
              <FaPinterest className="icons rounded-circle m-1 p-2" />
            </Row>
          </Col>
        </Row>

        {/* Additional content */}
        <Row className="mt-5 mb-4 row-3img  px-lg-5 col-lg-11 ">
          <div className="w-100 leafimgdiv">
            <img
              className="leafimg rounded-5 mx-lg-5 px-lg-3 w-100 d-none d-md-block"
              style={{height:'80%'}}
              src={comg3}
              alt="iconimg"
            />
            <div className="cardlocation mx-lg-5 px-3 py-3 col-lg-8 col-xl-6 col-md-5 me-md-5 px-md-3" style={{marginTop:50}}>
              <Card className="p-lg-5 m-lg-5 rounded-5   px-3 py-3">
                <Card.Title className="titlelocation">Location</Card.Title>
                <Card.Text className="Establishedtext">
                </Card.Text>
                <Card.Text className="adrstext fw-bold">
                  Near Gala no 34 sarvodya industrial estate, Paper Box Ln,
                  Andheri East, Mumbai, Maharashtra 400093
                </Card.Text>
              </Card>
            </div>
          </div>
        </Row>

        {/* Contact form */}
        <Row className="mxlg-5 px-lg-5 ">
          <Form className="mt-5 px-5 mx-lg-5 " onSubmit={handleFormSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} md="6" lg="5">
                <Form.Label className="formlabel">Full Name*</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="fullName"
                  className="labelholder"
                  required
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" lg="5">
                <Form.Label className="formlabel">Your Email*</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleInputChange}
                  className="labelholder"
                  required
                  type="text"
                  placeholder="example@yourmail.com"
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="6" lg="5">
                <Form.Label className="formlabel">Company*</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="company"
                  className="labelholder"
                  required
                  type="text"
                  placeholder="yourcompany name here"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" lg="5">
                <Form.Label className="formlabel">Subject*</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="subject"
                  className="labelholder"
                  required
                  type="text"
                  placeholder="how can we help"
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="8">
                <Form.Label className="formlabel">Message*</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  as="textarea"
                  required
                  name="message"
                  className="w-100 labelholder"
                  placeholder="hello there,i would like to talk aout how to..."
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Row>
            <button className="rounded-4 p-3">Send Message</button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
