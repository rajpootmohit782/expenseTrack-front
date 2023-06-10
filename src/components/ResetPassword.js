import React, { useState } from "react";
import "./css/reset.css";
const ForgotPasswordButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [reqId, setReqId] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPassword = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://hx28bh-4000.csb.app/reset/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data.resetRequest.id);
      setReqId(data.resetRequest.id);
      setIsLoading(false);
      setIsSuccess(true);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(error);
      console.log(error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch("https://hx28bh-4000.csb.app/reset/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: reqId, newPassword }),
      });
      const data = await response.json();
      console.log(data);
      setNewPassword("");
      window.location.href = "/login";
      // Handle the response from the backend as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  console.log(reqId);

  return (
    <div className="forgot-password-container">
      {isLoading && <p>Loading...</p>}
      {!isLoading && isSuccess && (
        <p className="success-message">
          Forgot password request created successfully!
        </p>
      )}
      {!isLoading && !isSuccess && error && (
        <p className="error-message">{error}</p>
      )}
      {!isLoading && !isSuccess && !error && (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button
            className="forgot-password-button"
            onClick={handleForgotPassword}
          >
            Request Password change
          </button>
        </div>
      )}
      {reqId && (
        <div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
          />
          <button className="update-password-button" onClick={updatePassword}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordButton;
