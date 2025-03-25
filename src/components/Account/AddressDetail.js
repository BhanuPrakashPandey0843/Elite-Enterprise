import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "./Account.css";

import { baseUrl } from "../../Globalvarible";
import { useApi } from "../../ApiContext";
import { useNavigate } from "react-router-dom";
const AddressDetail = () => {
  // Define state to manage form data

  const [userAddresses, setUserAddresses] = useState([]);
  const userId = Cookies.get("userId"); // Retrieve userId from cookies
  const navigate=useNavigate()
  const {
    apiResponse,
    discountedPrice,
    couponCode,
    showCartPopup,
    cartClose,
    totalPrice,
  } = useApi(); // Use the useApi hook to access context values

  //for payment success
  const [showModal, setShowModal] = useState(false);
  const fetchUserAddresses = React.useCallback(async (userId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        baseUrl + `Get_addresess.php?user_id=${userId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return { status: false, message: "Error fetching user addresses" };
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserAddresses(userId).then((data) => {
        if (data.status) {
          setUserAddresses(data.data);
        } else {
          setUserAddresses([]);
        }
      });
    }
  }, [userId, fetchUserAddresses, setUserAddresses]);
  //  const amountInPaise = totalPrice ;

  const paymentHandler = async (AddressID) => {
    //console.log("discountedPrice.....", parseInt(discountedPrice));
    const options = {
      key: "rzp_live_KhwDxMrpyzvL4N", // Replace with your actual Razorpay key_id
      name: "Elite Enterprise",
      description: "Payment for Your Product",
      amount: apiResponse ? parseInt(discountedPrice * 100) : totalPrice * 100, // Provide the amount in paise // Convert the price to paisa (e.g., 1000 paisa = 10 INR),
      theme: {
        color: "#686CFD",
      },

      handler: function (response) {
        // Call the Place Order API here
        var formdata = new FormData();
        formdata.append("User_ID", userId);
        formdata.append("AddressID", AddressID);
        //coupon code

        formdata.append("Couponcode", couponCode);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch(baseUrl + "PlaceOrder.php", requestOptions)
          .then((response) => {
            response.text();
            setShowModal(true);
          })
          .then((result) => {})
          .catch((error) => {});
      },
    };
    document.body.style.overflow = "visible";
    // failure
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
    });

    rzp1.open();
  };

  const hadleclick = async (AddressID) => {
    paymentHandler(AddressID);
    await cartClose();

  };

  const closeModal = () => {
    // Close the modal by setting showModal to false
    setShowModal(false);
    window.location.reload();
  };
  return (
    <div className="text-start address-details">
      <Modal className="modalbox" show={showCartPopup} onHide={cartClose}>
        <Modal.Header closeButton className="fw-bold">
          Select The Address
        </Modal.Header>
        <Modal.Body>
          {userAddresses.length > 0 ? (
            userAddresses.map((userAddress, index) => (
              <div key={index}>
                <Card
                  className="m-2 addrescard"
                  onClick={() => {
                    hadleclick(userAddress.AddressID);
                  }}
                >
                  <Card.Body className="p-3">
                    <div>
                      <h4> Address:</h4>
                      <h6>
                        {userAddress.Name},{userAddress.StreetAddress},{" "}
                        {userAddress.City},{userAddress.State},{" "}
                        {userAddress.ZipCode},{userAddress.Contry},
                        {userAddress.AddressID}
                        {userAddress.gst}
                      </h6>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div>No user addresses available.</div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your Order has been placed successfully</p>
        </Modal.Body>
        <Modal.Footer>
       
          <Button className="cartpopupbtn1 p-2 rounded-3" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressDetail;