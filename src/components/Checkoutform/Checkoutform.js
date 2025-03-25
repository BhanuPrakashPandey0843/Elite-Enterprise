import React, { useState } from "react";
import { Card, Col, Form, Row, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Checkoutform.css";
import Cookies from "js-cookie";
import AddressDetail from "../Account/AddressDetail";
import { useApi } from "../../ApiContext";
import { useNavigate } from "react-router-dom";

const Checkoutform = ({ baseUrl1 }) => {
  const cartItems = useSelector((state) => state.cart.cartDetails);

  const {
    totalPrice,

    cartClose,
    showCartPopup,

    fetchUserAddress,
    setUserAddress,
  } = useApi(); // Use the useApi hook to access context values

  const userId = Cookies.get("userId");

  // Define state to manage form data

  //modal popup
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const showAlertInModal = (message) => {
    setAlertMessage(message);
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
    UserID: userId,
    Name: "",
    StreetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Contry: "",
  });

  //checkout

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object and append the form fields
    const formdata = new FormData();
    formdata.append("UserID", formData.UserID);
    formdata.append("Name", formData.Name);
    formdata.append("StreetAddress", formData.StreetAddress);
    formdata.append("City", formData.City);
    formdata.append("State", formData.State);
    formdata.append("ZipCode", formData.ZipCode);
    formdata.append("Contry", formData.Contry);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        baseUrl1 + "Add_addresess.php",
        requestOptions
      );

      if (response.ok) {
        // Clear the input fields by resetting formData to its initial state
        showAlertInModal(
          "Your address has been saved successfully. You can now place your order."
        );

        setFormData({
          UserID: userId,
          Name: "",
          StreetAddress: "",
          City: "",
          State: "",
          ZipCode: "",
          Contry: "",
        });
        // After successfully saving the address, fetch the user address
        fetchUserAddress(userId).then((data) => {
          if (data.status) {
            setUserAddress(data.data[0]);
          } else {
            setUserAddress(null);
          }
          // Now, the user address is checked and updated immediately
          // You can choose to show the modal or perform any other actions as needed
          // Note: Avoid calling functions that cause a re-render within a useEffect to prevent infinite loops
          // showCartPopup(); // For example, if this re-renders the component, avoid it here
        });
        // Trigger a parent component's function if needed
      } else {
        // Form submission failed, display an error message to the user
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert("Form submission failed. Please try again later.");
    }
  };

  React.useEffect(() => {
    // Check if the userAddress is available or not
    // Fetch user address when the component mounts
    if (userId) {
      fetchUserAddress(userId).then((data) => {
        if (data.status) {
          setUserAddress(data.data[0]);
        } else {
          setUserAddress(null);
        }
      });
    }
  }, [userId, fetchUserAddress, setUserAddress]);
  // Handle input field changes and update form data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const Popupclose = () => {
    setShowModal(false);
    window.scroll(0, 0);
    navigate("/cart");
  };
  return (
    <div className="checkoutcls">
      <h2 className="text-center">Delivery Address</h2>
      <Row className="mx-lg-5 px-xl-5">
        <Form className="mt-5 px-5 mx-xl-5" onSubmit={handleSubmit}>
          <Row xs={1} md={1}>
            <Col xs={12} xl={6} lg={6} md={6} className="mt-md-5">
              <Row className="mb-4">
                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel"> Name*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="Name"
                    value={formData.Name}
                    className="labelholder"
                    required
                    type="text"
                    placeholder=" Name"
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel">Country*</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleInputChange}
                    name="Contry"
                    value={formData.Contry}
                    className="labelholder form-select"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel">StreetAddress*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    value={formData.StreetAddress}
                    name="StreetAddress"
                    className="labelholder"
                    required
                    type="text"
                    placeholder="Your StreetAddress here"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel">City*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="City"
                    value={formData.City}
                    className="labelholder"
                    required
                    type="text"
                    placeholder="Your City here"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel">State*</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleInputChange}
                    value={formData.State}
                    name="State"
                    className="labelholder form-select"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andrapradesh">Andrapradesh</option>
                    <option value="MadhyaPradesh">MadhyaPradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6" lg="5">
                  <Form.Label className="formlabel">ZipCode*</Form.Label>
                  <Form.Control
                    onChange={handleInputChange}
                    name="ZipCode"
                    value={formData.ZipCode}
                    className="labelholder"
                    required
                    type="number"
                    placeholder="ZipCode"
                  />
                </Form.Group>
              </Row>
            </Col>
            <Col xl={6} lg={6} md={6}>
              <Card>
                <div className="px-md-2 px-lg-2 mx-lg-2 mx-xl-5 mx-md-2 px-2 mx-2 row mt-2 ">
                  <h2 className="mt-5 mb-2">Your Order</h2>
                  <hr />

                  <table className="shop_table ">
                    <tbody className="pt-2 pb-2">
                      <tr className="mt-5 pb-5">
                        <th>Product</th>
                        <th>SubTotal</th>
                      </tr>
                      <tr className="border-0 mt-4">
                        <td>
                          {cartItems.map((product, i) => (
                            <span
                              key={i}
                              className="mt-2"
                              style={{ marginTop: "1rem", display: "block" }}
                            >
                              {product.Product_name}{" "}
                              <span className="ms-2">
                                x &nbsp; {product.Qty}
                              </span>
                              <br />
                            </span>
                          ))}
                        </td>

                        <td>
                          {cartItems.map((product, i) => (
                            <span
                              key={i}
                              className="mt-2"
                              style={{ marginTop: "1rem", display: "block" }}
                            >
                              {product.isSale ? (
                                <span>₹{product.Product_offerPrice}</span>
                              ) : (
                                <span>₹{product.Product_originalPrice}</span>
                              )}
                              <br />
                            </span>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5 className="mt-2">Subtotal </h5>
                        </td>
                        <td>₹{totalPrice}</td>
                      </tr>

                      <tr>
                        <td>
                          <h5>Total Price </h5>
                        </td>
                        <td>₹{totalPrice}</td>
                      </tr>
                      <tr className="mt-2">
                        <td>Pay with Cash upon delivery</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="justify-content-center">
                    <center>
                      <button
                        type="submit"
                        className="rounded-4 p-3 w-100  mt-4 mb-4 "
                      >
                        Save And Continue
                      </button>
                    </center>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </Row>

      <AddressDetail showCartPopup={showCartPopup} cartClose={cartClose} />

      <Modal show={showModal} onHide={() => Popupclose()}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{alertMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => Popupclose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkoutform;
