import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { RiShoppingBagFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./Bottombar.css"; // Import the external CSS file
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { fetchCartDetails } from "../actions/cartActions";
import { useAuth } from "../AuthContext ";

const Bottombar = ({ handleShow2 }) => {
  const cartLength = useSelector((state) => state.cart.cartLength);
  const cartLength1 = useSelector((state) => state.cart1.cartLength1);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  useEffect(() => {
    // Fetch brand data from the API
    dispatch(fetchCartDetails(userId));
  }, [dispatch, userId]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const { activeButton, setActiveButton } = useAuth();
  const navigate=useNavigate()
const handleLinkClickcart=()=>{
  navigate("/cart")
}
  return (
    <div className="bottompage d-lg-none d-md-none">
      <Navbar
        fixed="bottom"
        bg="light"
        className="bottomnav mx-0 px-0  pb-2 d-flex justify-content-center"
        style={{ marginBottom: "-4px", borderRadius: "10px" }}
      >
        <Nav className="d-flex gap-4 bottomlinks gap-lg-5 gap-md-5">
          {/* Home link */}

          <Link
            to="/"
            className={`b-link px-3  rounded-3 p-1 text-center ${
              activeButton === 0 ? "active" : ""
            }`}
            onMouseEnter={() => setActiveButton(0)}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleLinkClick}
          >
            <AiFillHome size={20} color="#652700" />
            <br />
            {activeButton === 0 && <p className="text-center mb-0">Home</p>}
          </Link>
          {/* shop link */}
          <Link
            to="/shoppage"
            className={`b-link px-3  rounded-3 text-center  p-2 ${
              activeButton === 2 ? "active" : ""
            }`}
            onMouseEnter={() => setActiveButton(2)}
            onClick={handleLinkClick}
            style={{ color: "black", textDecoration: "none" }}
          >
            <RiShoppingBagFill size={20} color="#652700" />
            {activeButton === 2 && <p className="mb-0"> Shop</p>}
          </Link>

          {/* Cart link */}
          <Link
            // to={!userId ? "/cartpage" : "/cart"}
            className={`b-link  px-3   rounded-3 text-center  p-2 ${
              activeButton === 6 ? "active" : ""
            }`}
            // onClick={handleLinkClickcart}
            onClick={(event) => {
              if (userId) {
                // User is logged in, proceed with cart action
                handleLinkClickcart();
              
              } else {
                // User is not logged in, handle accordingly (optional)
                // Example: Display a message, redirect to login, etc.
                handleShow2(); // Show an alert
                event.preventDefault(); // Prevent the default link behavior
                // Navigate to the login page, if required
                // navigate("/login"); // Uncomment and use the appropriate login route
              }
            }}
            onMouseEnter={() => setActiveButton(6)}
            style={{ color: "black", textDecoration: "none" }}
          >
            <BsFillCartDashFill size={20} color="#652700" />
            <sup>
              <span
                className="bg-danger rounded-circle px-1"
                style={{ color: "white" }}
              >
                {userId ? cartLength : cartLength1}
              </span>
            </sup>
            {activeButton === 6 && (
              <p className="mb-0 me-3 text-center me-1">Cart</p>
            )}
          </Link>

          {/* User link */}
          {userId === undefined ? (
            <>
              <Link
                // to="/"
                onClick={() => {
                  handleLinkClick();
                  handleShow2();
                }}
                className={`b-link px-3  rounded-3 text-center  p-2 ${
                  activeButton === null ? "active" : ""
                }`}
                onMouseEnter={() => setActiveButton(null)}
                style={{ color: "black", textDecoration: "none" }}
              >
                <FaUserAlt size={20} color="#652700" />
                {activeButton === null && <p className="mb-0"> Profile</p>}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/account/accountDetails"
                onClick={handleLinkClick}
                className={`b-link px-3  rounded-3 text-center  p-2 ${
                  activeButton === 7 ? "active" : ""
                }`}
                onMouseEnter={() => setActiveButton(7)}
                style={{ color: "black", textDecoration: "none" }}
              >
                <FaUserAlt size={20} color="#652700" />
                {activeButton === 7 && <p className="mb-0"> Profile</p>}
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Bottombar;
