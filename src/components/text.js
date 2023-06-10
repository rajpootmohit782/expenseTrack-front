import React from 'react';

function FacebookLogin() {
  return (
    <div className="container">
      <div className="logo">
        <img src="facebook_logo.png" alt="Facebook Logo" />
      </div>
      <div className="login-form">
        <input type="text" placeholder="Email or Phone Number" />
        <input type="password" placeholder="Password" />
        <button className="login-button">Log In</button>
        <div className="forgot-password">Forgot Password?</div>
        <div className="separator"></div>
        <button className="create-account-button">Create New Account</button>
      </div>
    </div>
  );
}

export default FacebookLogin;
