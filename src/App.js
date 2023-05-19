import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";

function App() {
  const [hasAccount, setHasAccount] = useState(false);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              hasAccount ? <Navigate to="/login" /> : <Navigate to="/signup" />
            }
          />
          <Route
            path="/login"
            element={<LoginScreen toggleHasAccount={toggleHasAccount} />}
          />
          <Route
            path="/signup"
            element={<SignupScreen toggleHasAccount={toggleHasAccount} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
