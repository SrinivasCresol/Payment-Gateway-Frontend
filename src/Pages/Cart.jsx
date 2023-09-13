import React from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart({ products, removeFromCart }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    const total = products.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
    return total;
  };

  const handlePayment = async () => {
    const token = sessionStorage.getItem("userToken");

    if (token) {
      const stripePromise = await loadStripe(
        "pk_test_51Np1quSHnUWkZzn7d8tc3ivT8T13kWLEEizX3679LrnocnMHyr7ENWQLFYB2ETw3ejqqys0kJo9QHintcCsmYeov00UbbwmWMQ"
      );
      const res = await fetch(
        "https://payment-gateway-backend-hoj3.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );
      if (res.status === 500) return;

      const data = await res.json();
      console.log(data);
      const sessionId = data.sessionId;
      stripePromise.redirectToCheckout({ sessionId });
    } else {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <>
        {products.map((item) => (
          <div key={item._id} className="cart-item">
            <h3>{item.model}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price * item.quantity}/-</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
        <p>Total: {calculateTotal()}/-</p>
        <button onClick={handlePayment}>Place Order</button>
      </>
    </div>
  );
}
