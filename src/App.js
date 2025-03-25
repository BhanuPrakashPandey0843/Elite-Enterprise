// src/App.js
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./components/Home/Home";
import Footer from "./layout/Footer";
import About from "./components/About/About";
import Blogpage from "./components/Blog/Blogpage";
import Contact from "./components/Contact/Contact";
import Singleshoppage from "./components/Shoppages/Singleshoppage";
import Shoppage from "./components/Shoppages/Shoppage";
import Bottombar from "./layout/Bottombar";
import Singleblog from "./components/Blog/Singleblog";
import MainShop from "./components/Shoppages/MainShop";
import NewBrandspage from "./components/Brandspage/NewBrandspage";
import Login from "./components/Login&signup/Login";
import Signup from "./components/Login&signup/Signup";
import BrandDetails from "./components/Brandspage/BrandDetails";

import Cookies from "js-cookie"; // Import js-cookie
import Checkoutform from "./components/Checkoutform/Checkoutform";
import BrandProductsPage from "./components/Brandspage/BrandProductsPage";
import Subbrandproducts from "./components/Brandspage/Subbrandproducts";
import Account from "./components/Account/Account";

import AccountDetails from "./components/Account/AccountDetails ";
import ForgetPassword from "./components/Login&signup/ForgotPassword";
import Addressform from "./components/Account/Addressform";
import Cartofline from "./components/Cartofline";
//import AddressDetail from "./components/Account/AddressDetail";
import { baseUrl } from "./Globalvarible";
import Privacypolicy from "./components/FooterPagesComponents/Privacypolicy";
import Terms from "./components/FooterPagesComponents/Terms";
import Shipping from "./components/FooterPagesComponents/shipping";
import Refund from "./components/FooterPagesComponents/Refund";
import Myorderdetails from "./components/Account/Myorderdetails";
import OrderItems from "./components/Account/OrderItems";

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [signupshow, signupsetShow] = useState(false);

  const signuphandleClose = () => signupsetShow(false);
  const signuphandleShow = () => signupsetShow(true);

  const [showCartPopup, setShowCartPopup] = useState(false);
  const cartClose = () => setShowCartPopup(false);
  const cartShow = () => setShowCartPopup(true);

  const [userId, setUserId] = useState(Cookies.get("userId"));

  useEffect(() => {
    // Update the userId whenever it changes in the cookies
    const interval = setInterval(() => {
      setUserId(Cookies.get("userId"));
    }, 1000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <Navbar handleShow2={handleShow} />

      <Routes>
        <Route path="/" element={<Home handleShow2={handleShow} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <Cart
              handleShowA={signuphandleShow}
              cartShow={cartShow}
              baseUrl1={baseUrl}
              showCartPopup={showCartPopup}
              cartClose={cartClose}
            />
          }
        />
        <Route
          path="/cartpage"
          element={
            <Cartofline handleShowA={signuphandleShow} baseUrl1={baseUrl} />
          }
        />

        <Route path="/singleblog" element={<Singleblog />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/singleproductpage/:cardId"
          element={<Singleshoppage handleShow2={handleShow} />}
        />
        <Route
          path="/search-results"
          element={<Shoppage baseUrlCart={baseUrl} handleShow2={handleShow} />}
        />

        <Route path="/brandspage" element={<NewBrandspage />} />
        <Route
          path="/shoppage"
          element={<MainShop handleShow2={handleShow} />}
        />
        <Route path="/brands/:brandId" element={<BrandDetails />} />

        {userId === undefined ? (
          <Route
            path="/account/*"
            element={<Navigate to="/account/accountDetails" replace />}
          />
        ) : (
          <Route path="/account/*" element={<Account />}>
            <Route index element={<Navigate to="accountDetails" replace />} />
            <Route path="accountDetails" index element={<AccountDetails />} />
            <Route
              path="addresses"
              element={
                <Addressform
                  handleShow2={handleShow}
                  handleClose2={handleClose}
                  baseUrl1={baseUrl}
                  show2={show}
                />
              }
            />
            <Route path="myorders" element={<Myorderdetails />} />
            <Route path="orderspage/:orderID" element={<OrderItems />} />
          </Route>
        )}

        <Route
          path="/checkout"
          element={<Checkoutform handleShow2={handleShow} baseUrl1={baseUrl} />}
        />

        <Route path="/blog" element={<Blogpage />} />
        <Route
          path="/brand-products"
          element={<BrandProductsPage handleShow2={handleShow} />}
        />
        <Route
          path="/subbrand-products"
          element={<Subbrandproducts handleShow2={handleShow} />}
        />
        <Route
        path="/forgotpassword"
        element={<ForgetPassword/>}
        />
        {/* //footer pages links */}
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        <Route path="/terms&condions" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
      <Login
        handleShow2={handleShow}
        handleClose2={handleClose}
        show2={show}
        handleShow3={signuphandleShow}
      />
      <Signup
        handleShow3={signuphandleShow}
        handleShow2={handleShow}
        handleClose3={signuphandleClose}
        show3={signupshow}
      />

      <Bottombar handleShow2={handleShow} />

      <Footer />
    </div>
  );
};

export default App;
