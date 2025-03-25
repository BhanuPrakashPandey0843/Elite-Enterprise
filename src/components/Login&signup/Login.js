import React, { useState } from "react";
import "./Login&signup.css";
import { Col, Form, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext "; // Import the useAuth hook
import Cookies from "js-cookie";
import { baseUrl } from "../../Globalvarible";
import logo from "./Elite Enterprise fev icon.png"
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
        // Check if user data is available in the response
        if (response.data.user && response.data.user.User_ID) {
          const userId = response.data.user.User_ID;
          Cookies.set("userId", userId, { expires: 365 }); // Set the cookie to expire in 1 year

          // Cookies.set("userId", userId);
        } else {
          // User data is not available, set userId to null
          Cookies.set("userId", null);
        }

        login(); // Call the login function to set isAuthenticated to true
        navigate("/account");
        handleClose2();
        // Clear the input fields
        setLoginData({
          username: "",
          password: "",
        });
      } else {
        // Login failed, display an error message
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <>
      {/* Cart Pop-up */}
      <center>
        <Modal
          show={show2}
          onHide={handleClose2}
          centered
          className="login-popup"
        >
          <Modal.Body>
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <div className="logincls text-center">
            <h3 className="fs-2 elite">
  <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
</h3>

              <h4>E n t e r p r i s e s</h4>
              <Row>
                <h3 className="loginaccount mb-3">Login To Your Account</h3>

                <Form className="loginform" onSubmit={submitHandler}>
                  <Row className="justify-content-center ">
                    <Form.Group as={Col} md="4" xs="12">
                      <Form.Control
                        type="username"
                        name="username"
                        value={loginData.username}
                        onChange={changeHandler}
                        required
                        placeholder="Username"
                        autoFocus
                      />
                    </Form.Group>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <Form.Group as={Col} md="4" xs="12" className="inputgrp">
                      <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={changeHandler}
                        required
                        placeholder="Password"
                        autoFocus
                      />
                    </Form.Group>
                  </Row>

                  <Row className=" pt-3">
                    <Link to="/forgotpassword" className="forgotlink fw-bold">
                      Forgot Your Password?
                    </Link>
                    <center>
                      <Link
                        onClick={() => {
                          handleShow3();
                          handleClose2();
                        }}
                        className="signup fw-bold mt-2 mb-2"
                      >
                        Signup
                      </Link>
                    </center>
                  </Row>
                  <button className="rounded-4 p-3 px-5 mt-1">Login</button>
                </Form>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </center>
    </>
  );
};

export default Login;
