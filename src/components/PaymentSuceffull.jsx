import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    background: "#f5f5f5",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  paragraph: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  button: {
    fontSize: "16px",
    padding: "10px 20px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

function AfterPaymentPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1); // Redirects to the previous page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Successful</h1>
      <p style={styles.paragraph}>Thank you for your purchase!</p>
      <p style={styles.paragraph}>Your payment has been received.</p>
      <p style={styles.paragraph}>
        You now have access to our premium features.
      </p>
      <p style={styles.paragraph}>Enjoy your premium membership!</p>
      {/* Add any additional information or components as needed */}
      <button style={styles.button} onClick={handleButtonClick}>
        My Dashboard
      </button>
    </div>
  );
}

export default AfterPaymentPage;
