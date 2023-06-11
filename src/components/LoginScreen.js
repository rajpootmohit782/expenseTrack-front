import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginScreen({ toggleHasAccount }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    if (!email || !password) {
      setError("Please fill in all the required fields.");
      return;
    }

    fetch("https://hx28bh-4000.csb.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        if (data.message === "User not found") {
          setError("Email not found. Please try again.");
        } else if (data.message === "Invalid password") {
          setError("Invalid password. Please try again.");
        } else if (data.message === "Login successful") {
          setEmail("");
          setPassword("");
          setError("");
          toggleHasAccount();
          console.log(data.user);
          const userId = data.user.id; // Assuming the response contains the user ID
          const userData = data.user;
          navigate(`/dashboard/${userId}`, { state: { userData } }); // Pass the user ID as state to the dashboard route
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred during login.");
      });
  };
  const handleForgotPassword = () => {
    window.location.href = "/forget";
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <div>
          <button
            style={{
              backgroundColor: "brown",
              margin: "10px",
            }}
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
