import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-multilevel-dropdown';
import {
  searchProducts,
  fetchBrands, // Import the fetchBrands action
  setSelectedBrand,
} from "../actions";
import { fetchCartDetails } from "../actions/cartActions";

import "./Navbar.css";
import { NavDropdown, InputGroup, Accordion } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; // Import the user icon

import Cookies from "js-cookie";
import { baseUrl } from "../Globalvarible";
import { useAuth } from "../AuthContext ";

const Navbar = ({ handleShow2 }) => {
  const cartLength = useSelector((state) => state.cart.cartLength);
  const cartLength1 = useSelector((state) => state.cart1.cartLength1);

  const [userId, setUserId] = useState(Cookies.get("userId"));
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false); // Track brand dropdown state

  const navigate = useNavigate();

  

  const brandsData = useSelector((state) => state.brands.brandsData);

  useEffect(() => {
    // Fetch brand data from the API
    dispatch(fetchBrands());
  }, [dispatch]);
  useEffect(() => {
    // Fetch brand data from the API
    dispatch(fetchCartDetails(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    // Fetch brand data from the API
    dispatch(fetchCartDetails(userId));
  }, [dispatch, userId]);

  const handleSubcatClick = (subcat) => {
    navigate(`/subbrand-products?Subcat_id=${subcat.Subcat_id}`);
  };

  const handleBrandChange = (brand) => {
    if (brand.hasSubcat) {
      dispatch(setSelectedBrand(brand.Brand_id));
      navigate(`/brands/Brand_id=${brand.Brand_id}`);
    } else {
      dispatch(setSelectedBrand(null));
      navigate(`/brand-products?Brand_id=${brand.Brand_id}`);
    }
  };

  const handleBrandChange1 = (brand) => {
    dispatch(setSelectedBrand(brand.Brand_id));
    navigate(`/brands/Brand_id=${brand.Brand_id}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    setSearchQuery(query);
    dispatch(searchProducts(query));

    if (query.trim() !== "") {
      navigate(`/search-results?search=${query}`);
    } else {
    }
  };

  //handleclick for moving brands page
  const handlclick = () => {
    navigate("/brandspage");
  };

  const navbarCollapseRef = useRef();

  // navigate to cart
  const cartclick = () => {
    if (!userId) {
      navigate("/cartpage");
    } else {
      navigate("/cart");
    }
  };

  //active links
  // State to track active button
  const { activeButton, setActiveButton } = useAuth();

  useEffect(() => {
    // Update the userId whenever it changes in the cookies
    const interval = setInterval(() => {
      setUserId(Cookies.get("userId"));
    }, 1000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const [logoUrl, setLogoUrl] = useState(""); // State to store the logo URL

  useEffect(() => {
    // Fetch the image URL from the API
    fetch(baseUrl + "FrontEndImages.php?FrontEnd_Id=1")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          // Update the logo URL in the state
          setLogoUrl(data.data.Logo);
        } else {
          // Handle the case where the data couldn't be retrieved
        }
      })
      .catch((error) => {});
  }, []);
  const location = useLocation();
  useEffect(() => {
    const determineActiveButton = (path) => {
      if (path === "/") return 0;
      if (path === "/about") return 1;
      if (
        path === "/shoppage" ||
        path.startsWith("/singleproductpage") ||
        path.startsWith("/brand-products") ||
        path.startsWith("/search-results") ||
        path.startsWith("/subbrand-products")
      )
        return 2;

      if (path === "/brandspage" || path.startsWith("/brands")) return 3;
      if (path === "/contact") return 4;
      if (path === "/blog") return 5;

      if (path === "/cart" || path === "/cartpage") {
        if (userId) {
          return 6; // User is logged in, go to "/cart"
        } else {
          return 6; // User is not logged in, go to "/cartpage"
        }
      }

      if (path === "/account/accountDetails") return 7;

      return 0; // Default to the first button if no match
    };

    setActiveButton(determineActiveButton(location.pathname));
  }, [location, userId, setActiveButton]);

  return (
    <nav className="navbar navbar-expand-lg navbar headerbar mt-lg-4 mb-lg-4 mx-xxxl-5 ms-xxxl-2 px-xxxl-5">
      <div className="container mx-lg-3 mx-xl-2 px-xl-2 mx-xxl-5 px-xxl-5 mx-xxxl-2 ms-xxxl-2">
        <Link
          to="/"
          className={`ms-xxxl-5 nav-link nav-btns  ${
            activeButton === 8 ? "active" : ""
          }`}
          onClick={() => {
            setActiveButton(8);
          }}
        >
          <img
            className="mx-xl-0"
            src={logoUrl}
            width="150px"
            height="80px"
            alt="logo"
          />
        </Link>

        <span
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <span className="navbar-toggler-icon"></span>
        </span>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          ref={navbarCollapseRef}
          data-bs-scroll="true"
          aria-controls="offcanvasExample"
        >
          <div className="offcanvas-header"></div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-lg-3 ms-xl-5 px-xl-0 ms-xxl-5 px-xxl-5">
              <li className="nav-item px-xl-2 s-xxl-5 d-flex justify-content-between ">
                <Link
                  to="/"
                  aria-current="page"
                  data-bs-auto-dismiss="false"
                  className={`nav-link nav-btns  b-link  rounded-3 ${
                    activeButton === 0 ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveButton(0);
                  }}
                >
                  <span data-bs-dismiss="offcanvas">Home</span>
                </Link>

                <button
                  type="button"
                  className="btn-close text-reset mt-2 d-lg-none"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </li>
              <li className="nav-item px-xl-2">
                <Link
                  to="/about"
                  className={`nav-link nav-btns b-link  rounded-3 ${
                    activeButton === 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveButton(1);
                  }}
                >
                  <span data-bs-dismiss="offcanvas">About</span>
                </Link>
              </li>

              <li className="nav-item px-xl-2">
                <Link
                  to="/shoppage"
                  className={`nav-link nav-btns b-link  rounded-3 ${
                    activeButton === 2 ? "active" : ""
                  }`}
                  onClick={() => {
                    navbarCollapseRef.current?.classList.remove("show");
                    setActiveButton(2);
                  }}
                >
                  <span data-bs-dismiss="offcanvas">Shop</span>
                </Link>
              </li>

              <Dropdown title="Brands"  style={{
    color: "#652700",
    fontFamily: "Roboto",
    fontSize: "16px",
    padding: "5px",
    background: "transparent",
    border: "1px solid rgb(236, 236, 235)", // Initially white border
    transition: "color 0.3s ease, border-color 0.3s ease",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.target.style.color = "#000066";
    e.target.style.borderColor = "#000066"; // Change border to blue on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.color = "#652700";
    e.target.style.borderColor = "rgb(236, 236, 235)"; // Reset border to white after hover
  }}
>
               
  {brandsData && brandsData.length > 0 ? (
    brandsData.map((brand) => (
      <Dropdown.Item key={brand.Brand_id} onClick={() => handleBrandChange1(brand)}>
        {brand.Brand_Name}
        {brand.hasSubcat && brand.subcategories && brand.subcategories.length > 0 && (
          <Dropdown.Submenu position="right">
            {brand.subcategories.map((subcat) => (
              <Dropdown.Item 
                key={subcat.Subcat_id}
                onClick={() => handleSubcatClick(subcat)}
              >
                {subcat.Subcat_Name}
              </Dropdown.Item>
            ))}
          </Dropdown.Submenu>
        )}
      </Dropdown.Item>
    ))
  ) : (
    <Dropdown.Item>No brands available</Dropdown.Item>
  )}
</Dropdown>

              <li className="nav-item px-xl-2">
                <Link
                  to="/contact"
                  className={`nav-link nav-btns b-link  rounded-3 ${
                    activeButton === 4 ? "active" : ""
                  }`}
                  onClick={() => {
                    navbarCollapseRef.current?.classList.remove("show");
                    setActiveButton(4);
                  }}
                >
                  <span data-bs-dismiss="offcanvas"> Contact</span>
                </Link>
              </li>
          { /*   <li className="nav-item px-xl-2">
                <Link
                  to="/blog"
                  className={`nav-link nav-btns b-link  rounded-3 ${
                    activeButton === 5 ? "active" : ""
                  }`}
                  onClick={() => {
                    navbarCollapseRef.current?.classList.remove("show");
                    setActiveButton(5);
                  }}
                >
                  <span data-bs-dismiss="offcanvas">Blogs</span>
                </Link>
              </li>*/}

              <div className="d-none d-lg-block">
                <InputGroup className="position-relative">
                  <div className="position-absolute searchbtn">
                    <AiOutlineSearch className="searchicon fs-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control rounded-pill ms-xl-4 ms-lg-4 mx-md-5 mx-lg-1 mx-3 "
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e);
                      }
                    }}
                    onClick={(e) => {
                      // Prevent click propagation to the parent div
                      e.stopPropagation();
                    }}
                  />
                </InputGroup>
              </div>

              <li className="nav-item px-lg-0 px-xl-2 ms-xl-4 my-3 my-lg-0 my-md-0">

                <Link
                  to={userId ? "/cart" : "/cartpage"}
                  className={`cart-btn nav-link rounded-pill nav-btns b-link  rounded-3 ${
                    activeButton === 6 ? "active" : ""
                  }`}
                  onClick={(event) => {
                    if (userId) {
                      // User is logged in, proceed with cart action
                      cartclick();
                      navbarCollapseRef.current?.classList.remove("show");
                      setActiveButton(6);
                    } else {
                      // User is not logged in, handle accordingly (optional)
                      // Example: Display a message, redirect to login, etc.
                    handleShow2() // Show an alert
                      event.preventDefault(); // Prevent the default link behavior
                      // Navigate to the login page, if required
                      // navigate("/login"); // Uncomment and use the appropriate login route
                    }
                  }}
                >
                  {/* Include cart icon and text */}
                  <i
                    className="fas fa-shopping-cart rounded-circle p-1"
                    style={{ background: "#44160F", color: "white" }}
                  ></i>
                  <span className="px-3 px-lg-1" data-bs-dismiss="offcanvas">
                    {/* Display total items in cart based on user login status */}
                    Cart-({userId ? cartLength : cartLength1})
                  </span>
                </Link>

                {/* </Button> */}
              </li>
            </ul>

            <ul className="navbar-nav ms-auto  ">
              <li className="nav-item ">
                {userId === undefined ? (
                  <Link
                    className={`nav-link nav-btns b-link  rounded-3`}
                    onClick={() => {
                      handleShow2();
                      navbarCollapseRef.current?.classList.remove("show");
                    }}
                  >
                    <span data-bs-dismiss="offcanvas">Login</span>
                  </Link>
                ) : (
                  <Link
                    to="/account/accountDetails"
                    className={`nav-link b-linkacount   rounded-3 ${
                      userId ? (activeButton === 7 ? "active" : "") : ""
                    }`}
                    onClick={() => {
                      setActiveButton(7);
                    }}
                  >
                    <span data-bs-dismiss="offcanvas">
                      <FaUser />
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <InputGroup className="d-lg-none mx-2 ">
        {" "}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control rounded-3 ms-xl-4  px-5 p-3 mt-3  mx-3 position-relative"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          onClick={(e) => {
            // Prevent click propagation to the parent div
            e.stopPropagation();
          }}
        />
        <div className="pt-2">
          {" "}
          <AiOutlineSearch className="position-absolute start-0 ms-4 fs-2 mt-4" />
        </div>
      </InputGroup>
    </nav>
  );
};

export default Navbar;
