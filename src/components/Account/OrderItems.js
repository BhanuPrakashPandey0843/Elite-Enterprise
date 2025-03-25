import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { baseUrl } from "../../Globalvarible";
import { Player } from "@lottiefiles/react-lottie-player";

const OrderItems = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderID } = useParams(); // Get the orderID route parameter from the URL
  const userId = Cookies.get("userId"); // Retrieve userId from cookies

  useEffect(() => {
    const fetchData = async () => {
      var formdata = new FormData();
      formdata.append("User_ID", userId); // Replace with the desired User_ID
      formdata.append("Order_ID", orderID); // Use the selected order_ID

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
 
      try {
        const response = await fetch(
          baseUrl + "GetOrderDetails.php",
          requestOptions
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status) {
            setOrderDetails(data.data);
          }
        }
      } catch (error) {}
    };

    fetchData(); // Fetch data when a selectedOrderID is available
  }, [userId, orderID]);

  return (
    <div>
      <h2 className="text-start mt-3 mb-3 mx-md-0 mx-lg-0 mx-2">
        Order Details
      </h2>
      <Container>
        <Row lg={2}>
          <Col xs={12} lg={8}>
            {orderDetails ? (
              <div>
                <div className="d-lg-block d-md-block d-none">
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              className="rounded-3  p-4  prdctimg"
                              src={item.Product_img}
                              alt={`Image ${index + 1}`}
                              id={`prdctimg${index + 1}`}
                              style={{ width: "150px", height: "150px" }}
                            />
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            <Marquee>{item.Product_name}</Marquee>
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            {item.Quantity}
                          </td>
                          <td style={{ width: "20%", verticalAlign: "middle" }}>
                            ₹{item.TotalPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="d-lg-none d-md-none d-block">
                  {orderDetails.map((item, index) => (
                    <div key={index}>
                      <center>
                        <Card>
                          <Card.Body>
                            <Row className="text-start">
                              <Col xs={5}>
                                <img
                                  className="rounded-3 pt-3 pb-2"
                                  src={item.Product_img}
                                  alt={`Image ${index + 1}`}
                                  style={{ width: "100%", height: "150px" }}
                                />
                              </Col>
                              <Col xs={7} className="mt-3">
                                <p>{item.Product_name}</p>
                                <p>Quantity: {item.Quantity}</p>
                                <p>Total: ₹{item.TotalPrice}&nbsp;</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </center>
                    </div>
                  ))}
                </div>
              </div>
            ) : orderDetails === 0 ? (
              <Player
                autoplay
                loop
                src={baseUrl + "Animations/Brand404.json"}
                style={{ height: "300px", width: "300px" }}
                visible={true}
              ></Player>
            ) : (
              <div className="mx-5 mt-4">
                <Player
                  autoplay
                  loop
                  src={baseUrl + "Animations/loading.json"}
                  style={{ height: "300px", width: "300px" }}
                  visible={true}
                ></Player>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderItems;
