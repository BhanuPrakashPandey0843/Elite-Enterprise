import React, { useState } from "react";
import "./Login&signup.css";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Globalvarible";
import axios from "axios";
import logo from "./Elite Enterprise fev icon.png";

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
      alert("Password and confirm password do not match.");
      return;
    }

    let data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    let config = {
      method: "post",
      url: baseUrl + "Signup.php",
      headers: { "Content-Type": "multipart/form-data" },
      data: data,
    };

    try {
      const response = await axios(config);

      if (response.status === 200) {
        setFormData({ username: "", password: "", confirmPassword: "", email: "", phone: "" });
      }

      if (response.data && response.data.status === false) {
        alert("Username already exists. Please choose a different username.");
      } else {
        handleClose3();
        setTimeout(() => {
          handleClose3();
          alert("Congratulations! You have successfully signed up.");
          setTimeout(() => { handleShow2(); }, 0);
        }, 1000);
      }
    } catch (error) {
      alert("Signup failed. Please try again later.");
    }
  };

  return (
    <>
      <center>
        <Modal show={show3} onHide={handleClose3} centered>
          <Modal.Body style={{ background: "#f8f9fa", borderRadius: "10px", padding: "20px" }}>
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <div style={{
              background: "white",
              borderRadius: "10px",
              padding: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center"
            }}>
              <h3 style={{
                fontWeight: "bold",
                fontSize: "24px",
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img src={logo} alt="Logo" style={{ width: "130px", height: "80px", marginRight: "10px" }} />
               
              </h3>
              <h4 style={{ color: "#333", marginTop: "10px", fontSize: "18px" }}>Sign Up For Free</h4>

              <Form className="loginform" onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      required
                      style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Link onClick={() => { handleShow2(); handleClose3(); }} className="fw-bold"
                    style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
                    Already have an account?
                  </Link>
                </Row>

                <button style={{
                  background: "linear-gradient(to right, #007bff, #00c6ff)",
                  border: "none",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "15px",
                  transition: "0.3s",
                }}
                  onMouseOver={(e) => e.target.style.background = "linear-gradient(to right, #0056b3, #00a2c6)"}
                  onMouseOut={(e) => e.target.style.background = "linear-gradient(to right, #007bff, #00c6ff)"}>
                  Create Account
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </center>
    </>
  );
};

export default Signup;
