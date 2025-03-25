import React, { useState, useEffect } from "react";
import { Col, Form, InputGroup, Row, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import Cookies from "js-cookie";
import { baseUrl } from "../../Globalvarible";
import { AiFillEye } from "react-icons/ai";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    username: "",
    Email: "",
    PhoneNumber: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false); // State for update success

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const userId = Cookies.get("userId");

  useEffect(() => {
    if (userId) {
      fetch(baseUrl + "Get_UserDetails.php", {
        method: "POST",
        body: new URLSearchParams({ UserID: userId }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setFormData({
              username: data.data.username,
              Email: data.data.Email,
              PhoneNumber: data.data.PhoneNumber,
              password: data.data.password,
            });
          } else {
            // Handle the case where user details couldn't be retrieved
          }
        })
        .catch((error) => {});
    }
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("UserID", userId);
    formdata.append("Username", formData.username);
    formdata.append("Email", formData.Email);
    formdata.append("PhoneNumber", formData.PhoneNumber);
    formdata.append("Password", formData.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        baseUrl + "Update_UserDetails.php",
        requestOptions
      );

      if (response.ok) {
        setUpdateSuccess(true); // Update success state to show the info box
        setTimeout(() => {
          setUpdateSuccess(false); // Hide the info box after 5 seconds
        }, 5000);
      } else {
        console.error("Error updating user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="checkoutcls">
      <Row className="mx-lg-5 px-lg-5 col-lg-12 text-start">
        <Form className="mt-2 px-5 mx-lg-5" onSubmit={handleFormSubmit}>
          <Row lg={2} xs={1} md={1}>
            <Col xs={12} lg={12}>
              <Row className="mb-4">
                <Form.Group as={Col} md="6" lg="6" xs="12">
                  <Form.Label className="formlabel"> Username*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="username"
                    value={formData.username}
                    className="labelholder "
                    disabled
                    required
                    type="text"
                    placeholder=" Name"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" lg="6" xs="12">
                  <Form.Label className="formlabel">Phone No.*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    value={formData.PhoneNumber}
                    name="PhoneNumber"
                    className="labelholder"
                    required
                    type="text"
                    placeholder="Phone Number"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="6" lg="6" xs="12">
                  <Form.Label className="formlabel">Email*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="Email"
                    value={formData.Email}
                    className="labelholder"
                    required
                    type="text"
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" lg="6" xs="12">
                  <Form.Label className="formlabel">
                    Current password *
                  </Form.Label>
                  <div className="password-input-wrapper">
                    <InputGroup className="position-relative">
                      <Form.Control
                        onChange={handleInputChange}
                        name="password"
                        value={formData.password}
                        className="labelholder position-relative"
                        required
                        type={passwordVisible ? "text" : "password"}
                        placeholder="*******"
                      />
                      <AiFillEye
                        className="eye-icon position-absolute top-50 end-0  translate-middle"
                        onClick={togglePasswordVisibility}
                      />
                    </InputGroup>
                  </div>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <button type="submit" className="rounded-4 p-3 mt-4 mb-4">
            Save Changes
          </button>
        </Form>

        {updateSuccess && (
          <Alert variant="success" className="slide-in-info">
            User details updated successfully!
          </Alert>
        )}
      </Row>
    </div>
  );
};

export default AccountDetails;
