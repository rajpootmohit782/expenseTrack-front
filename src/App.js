import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginScreen from "./components/LoginScreen";
import AfterPaymentPage from "./components/PaymentSuceffull";
import ForgotPasswordButton from "./components/ResetPassword";
import SignupScreen from "./components/SignupScreen";

function App() {
  const [hasAccount, setHasAccount] = useState(false);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
    console.log("done and hasAccount is =>", hasAccount);
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
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/premiumSucessfull" element={<AfterPaymentPage />} />
          <Route path="/forget" element={<ForgotPasswordButton />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
