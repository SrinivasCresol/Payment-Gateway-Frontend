import React from "react";

export default function Cart({ products, removeFromCart }) {
  const calculateTotal = () => {
    const total = products.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      console.log(
        `Item: ${item.model}, Quantity: ${item.quantity}, Price: ${item.price}, Item Total: ${itemTotal}`
      );
      return total + itemTotal;
    }, 0);
    console.log(`Total: ${total}`);
    return total;
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
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
        </>
      )}
    </div>
  );
}
