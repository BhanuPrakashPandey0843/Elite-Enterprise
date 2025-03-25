import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { useAuth } from "../../AuthContext ";
import "./Account.css";
const Account = () => {
  const { logout } = useAuth();
const navigate=useNavigate()
  const [activeButton1, setActiveButton1] = useState(0); // Initialize the first button as active
 const { setActiveButton } = useAuth();
  const handleLogout = () => {
    Cookies.remove("userId");
    logout();
    setActiveButton(0);
    navigate('/')
  };
  const linkRef = React.useRef();

  React.useEffect(() => {
    // Trigger a click event on the Link element when the component mounts
    linkRef.current.click();
  }, []);
  return (
    <div className="accountfile">
      <Container>
        <Row className="text-center justify-content-center ">
          <Col lg={2} xs={6} md={3}>
            <nav className="navbar mt-lg-4 mb-lg-4   fw-bolder text-md-start  text-center mt-lg-5 pt-lg-4">
              <ul className="navbar-nav ms-lg-3">
                <li
                  className={`nav-item px-xl-2 c-link   ${
                    activeButton1 === 0 ? "active" : ""
                  }`}
                >
                  <Link
                    to="accountDetails"
                    className="nav-link c-link "
                    onClick={() => setActiveButton1(0)}
                    ref={linkRef}
                  >
                    Account Details
                  </Link>
                </li>
                <li
                  className={`nav-item px-xl-2  c-link ${
                    activeButton1 === 1 ? "active" : ""
                  }`}
                >
                  <Link
                    to="addresses"
                    className="nav-link  c-link"
                    onClick={() => setActiveButton1(1)}
                  >
                    Addresses
                  </Link>
                </li>
                <li
                  className={`nav-item px-xl-2 c-link   ${
                    activeButton1 === 2 ? "active" : ""
                  }`}
                >
                  <Link
                    to="myorders"
                    className="nav-link  c-link"
                    onClick={() => setActiveButton1(2)}
                  >
                    MyOrders
                  </Link>
                </li>

                <li className="nav-item px-xl-2 ">
                  <button className="btnlogout p-2 px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
          <Col lg={10} xs={12} md={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
