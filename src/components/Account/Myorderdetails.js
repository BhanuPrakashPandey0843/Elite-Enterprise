import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../Globalvarible";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Myorderdetails = () => {
  const [orders, setOrders] = useState([]);

  const userId = Cookies.get("userId"); // Retrieve userId from cookies
  useEffect(() => {
    // Make the API call when the component is mounted
    const fetchData = async () => {
      var formdata = new FormData();
      formdata.append("User_ID", userId);

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
            setOrders(data.data);
          } else {
          }
        } else {
        }
      } catch (error) {}
    };

    fetchData();
  }, [userId]);
  const navigate = useNavigate();
  const handleOrderClick = (order_ID) => {
    // Set the selected order_ID when the button is clicked
    navigate(`/account/orderspage/${order_ID}`); // Ensure that `navigate` is defined and correctly navigating
  };

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="mt-4">
        <Container>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>View All</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, order_ID) => (
                <tr key={order_ID}>
                  <td>{order.order_ID}</td>
                  <td>{order.order_date}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className=" btna p-2"
                      onClick={() => handleOrderClick(order.order_ID)}
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Myorderdetails;
