import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const UserDetails = ({ baseUrl1 }) => {
  // Define state to manage form data

  const [userAddresses, setUserAddresses] = useState([]);
  const userId = Cookies.get("userId"); // Retrieve userId from cookies

  const fetchUserAddresses = React.useCallback(
    async (userId) => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          baseUrl1 + `Get_addresess.php?user_id=${userId}`,
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
    },
    [baseUrl1]
  );

  const removeAddress = async (addressId) => {
    try {
      const formdata = new FormData();
      formdata.append("AddressID", addressId);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        baseUrl1 + "DeleteAddress.php",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted address from the state
      setUserAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.AddressID !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

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
  }, [userId, fetchUserAddresses]);

  return (
    <div className="text-start address-details">
      {userAddresses.map((userAddress, index) => (
        <div key={index}>
          <Container>
            <Row>
              <Col lg={6} xs={12}>
                {" "}
                <Card className="m-2" style={{ background: "#9e9e9e14" }}>
                  <Card.Body className="p-3">
                    <div>
                      <h4> Address:</h4>
                      <div>
                        <p className="fs-5">{userAddress.Name}</p>
                        <p className="fs-5">{userAddress.StreetAddress}</p>
                        <p className="fs-5">
                          {userAddress.City}&nbsp;{userAddress.ZipCode}
                        </p>
                        <p className="fs-5">{userAddress.State}</p>

                        <p className="fs-5">{userAddress.Contry}</p>
                        <p className="fs-5">{userAddress.gst}</p>
                        <button
                          className="btna  p-2"
                          onClick={() => removeAddress(userAddress.AddressID)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
