import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { baseUrl } from '../../Globalvarible';


// Encrypt function with IV
const encryptData = (data, key) => {
  const iv = "tHis1s1v123aBcD3"; // 16 bytes IV for AES
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
  return encrypted;
};

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userGenOtp, setUserGenOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const generatedOTP = generateOTP(); // Generate a random 4-digit OTP
    const encryptedOTP = encryptData(generatedOTP, 'tHis1sK3y123aBcD');
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('otp', generatedOTP); // Pass the generated OTP
  
    const requestOptions = {
      method: 'POST',
      body: formdata,
    };
  
    fetch(baseUrl+'ForgetPassword.php', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setOtpSent(true);
          setUserId(data.cbB2kas1v5wa2987ku);
          setUserGenOtp(generatedOTP);
        } else {
          alert(data.message); // Display error message
        }
      })
      .catch((error) => console.error(error));
  };
  

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === userGenOtp && otpAttempts < 3) {
      const formdata = new FormData();
      formdata.append('otp', otp);
      formdata.append('user_id', userId);
      formdata.append('password', password);

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch(baseUrl+'ForgetPassword.php', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            alert(data.message); // Success message
            // Redirect to home page
            window.location.href = '/'; // Change '/' to the URL of your home page
          } else {
            alert(data.message); // Display error message
          }
        })
        .catch((error) => console.error(error));
    } else {
      if (otpAttempts >= 2) {
        alert('You have exceeded the maximum number of attempts.');
        setOtpSent(false);
      } else {
        alert('Invalid OTP. Please try again.');
        setOtpAttempts(otpAttempts + 1);
      }
    }
  };

  const generateOTP = () => {
    // Generate a random 4-digit OTP
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  return (
    <div className="container logincls">
      <h2 className="elite">Forget Password</h2>
      <form className="model" onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}>
        {!otpSent && (
          <div className="form-group">
            <label className="elite">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        {otpSent && (
          <div className="form-group">
            <label className="elite">Enter OTP:</label>
            <input
              type="number"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        {otpSent && (
          <div className="form-group">
            <label className="elite">New Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {otpSent ? 'Set New Password' : 'Get OTP'}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;