import React, { useState } from "react";
import "./Login&signup.css";
import { Col, Form, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext "; // Import the useAuth hook
import Cookies from "js-cookie";
import { baseUrl } from "../../Globalvarible";
import logo from "./Elite Enterprise fev icon.png";

const Login = ({ show2, handleClose2, handleShow3 }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Access authentication state and functions

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl + "Login.php", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.message === "Login successful") {
        if (response.data.user && response.data.user.User_ID) {
          const userId = response.data.user.User_ID;
          Cookies.set("userId", userId, { expires: 365 });
        } else {
          Cookies.set("userId", null);
        }

        login();
        navigate("/account");
        handleClose2();

        setLoginData({
          username: "",
          password: "",
        });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <>
      <center>
        <Modal show={show2} onHide={handleClose2} centered>
          <Modal.Body style={{
            background: "#f8f9fa",
            borderRadius: "12px",
            padding: "20px",
          }}>
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}>
              <h3 style={{
                fontWeight: "bold",
                fontSize: "24px",
                color: "#6c757d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img src={logo} alt="Logo" style={{ width: "130px", height: "80px", marginRight: "10px" }} />
               
              </h3>

              <h4 style={{ color: "#333", marginTop: "10px", fontSize: "18px" }}>Login to Your Account</h4>

              <Form className="loginform" onSubmit={submitHandler} style={{ marginTop: "15px" }}>
                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={changeHandler}
                      required
                      placeholder="Username"
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
                      }}
                    />
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col md="8">
                    <Form.Control
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={changeHandler}
                      required
                      placeholder="Password"
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Link to="/forgotpassword" className="fw-bold"
                    style={{ textDecoration: "none", color: "#6c757d", fontSize: "14px" }}>
                    Forgot Your Password?
                  </Link>
                </Row>

                <Row>
                  <center>
                    <Link
                      onClick={() => { handleShow3(); handleClose2(); }}
                      className="fw-bold mt-2 mb-2"
                      style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
                      Sign Up
                    </Link>
                  </center>
                </Row>

                <button style={{
                  background: "#8B4513",
                  border: "none",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "15px",
                  transition: "0.3s",
                }}
                  onMouseOver={(e) => e.target.style.background = "#5a2c00"}
                  onMouseOut={(e) => e.target.style.background = "#8B4513"}>
                  Login
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </center>
    </>
  );
};

export default Login;
