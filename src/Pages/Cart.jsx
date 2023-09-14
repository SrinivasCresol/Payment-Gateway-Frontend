import React from "react";
import { useSocket } from "../ContextProvider/SocketProvider";
import { makePaymentFunction } from "../Services/Apis";

export default function Cart({ products, removeFromCart }) {
  const socket = useSocket();

  const handleAction = (action) => {
    socket.emit("userAction", action);
  };

  const calculateTotal = () => {
    const total = products.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
    return total;
  };

  const handlePayment = async () => {
    try {
      const res = await makePaymentFunction(products, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.url || res.status === 200) {
        window.location.href = res.data.url;
        const notificationMessage = `User purchased the following items: ${products
          .map((item) => item.model)
          .join(", ")}`;
        handleAction(notificationMessage);
      }
    } catch (error) {
      console.error("Error:", error);
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
