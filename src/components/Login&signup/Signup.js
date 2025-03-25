import React, { useState } from "react";
import "./Login&signup.css";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Globalvarible";
import axios from "axios";
import logo from "./Elite Enterprise fev icon.png"
const Signup = ({ show3, handleClose3, handleShow2 }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Password and confirm password do not match, show an error message
      alert("Password and confirm password do not match.");
      return; // Exit the function to prevent the API request
    }
    let data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    let config = {
      method: "post",
      url: baseUrl + "Signup.php",
      headers: {
        "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data
      },
      data: data,
    };

    try {
      const response = await axios(config);

      if (response.status === 200) {
        // Clear the input fields by resetting the formData state
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          phone: "",
        });
      }
      // Check the response data for the "message" property
      if (response.data && response.data.status === false) {
        alert("Username already exists. Please choose a different username.");
      } else {
        handleClose3();
        // Close the modal with a slight delay
        setTimeout(() => {
          handleClose3();
          alert("Congratulations! You have successfully signed up.");
          // Call handleShow2() after the user dismisses the alert
          setTimeout(() => {
            handleShow2();
          }, 0); // Adding a minimal delay (0 milliseconds) to ensure it's called after the alert
        }, 1000); // Delay for 1 second (adjust as needed)
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert("Signup failed. Please try again later.");
    }
  };

  return (
    <>
      <center>
        <Modal show={show3} onHide={handleClose3} centered>
          <Modal.Body>
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <div className="signupcls text-center">
            <h3 className="fs-2 elite">
  <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
</h3>
              <h4>E n t e r p r i s e s</h4>
              <Row className="mt-2">
                <h3 className="singupfree">Sign Up For Free</h3>
                <Form className="loginform" onSubmit={handleSubmit}>
                  <Row className="justify-content-center mt-3">
                    <Form.Group as={Col} md="4" lg="8" xs="12">
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <Form.Group
                      as={Col}
                      md="4"
                      lg="8"
                      xs="12"
                      className="inputgrp"
                    >
                      <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <Form.Group
                      as={Col}
                      md="4"
                      lg="8"
                      xs="12"
                      className="inputgrp"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <Form.Group
                      as={Col}
                      md="4"
                      lg="8"
                      xs="12"
                      className="inputgrp"
                    >
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="confirmPassword"
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="justify-content-center mt-4">
                    <Form.Group
                      as={Col}
                      md="4"
                      xs="12"
                      lg="8"
                      className="inputgrp"
                    >
                      <Form.Control
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mt-2">
                    <Link
                      onClick={() => {
                        handleShow2();
                        handleClose3();
                      }}
                      className="haveanaccount fw-bold"
                    >
                      already have an account?
                    </Link>
                  </Row>
                  <button className="rounded-4 p-3 px-5 mt-1">
                    Create Account
                  </button>
                </Form>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </center>
    </>
  );
};

export default Signup;
