import react from "react";

//pamentgate way
const YOUR_KEY_ID = "rzp_test_uXuHsMrzD4gT4k";
const YOUR_KEY_SECRET = "Fev7hGd4nJc4qXl14eX9eAoj";

const Payment = ({ user }) => {
  const id = user.id;
  console.log(id);
  const checkoutHandler = async () => {
    console.log(window);
    console.log("inside checkout");
    const amount = 10001; // Set the amount value here or fetch it from your application state

    const response = await fetch(`https://hx28bh-4000.csb.app/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }), // Include the amount in the request body
    });

    const data = await response.json();

    console.log(data);
    const call_url = `https://hx28bh-4000.csb.app/payment/verifyPayment/${id}`;
    console.log(call_url);
    const options = {
      key: YOUR_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Mohit Rajpoot",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: call_url,
      prefill: {
        name: user,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  return (
    <div style={{ alignItem: "center" }}>
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={checkoutHandler}
      >
        Premium
      </button>
    </div>
  );
};

export default Payment;
