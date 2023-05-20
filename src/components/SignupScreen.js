import React, { useState } from "react";
import "./css/SignupScreen.css";
import { Link, useNavigate } from "react-router-dom";

function SignupScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    if (!name || !email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Make an API request to your backend for signup
    fetch("https://r77cn3-5000.csb.app/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred during signup.");
      });


    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} required />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignupScreen;
