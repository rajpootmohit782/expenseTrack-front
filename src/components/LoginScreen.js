import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginScreen() {
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

    fetch("https://r77cn3-5000.csb.app/auth/login", {
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

          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred during login.");
      });
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
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
