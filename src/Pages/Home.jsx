import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSocket } from "../ContextProvider/SocketProvider";
import { getProductsFunction } from "../Services/Apis";
import Header from "../Components/Header";
import Cart from "./Cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== product._id)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsFunction();
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");

    if (token) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <div>
          <h2>Products List</h2>
          <div className="products">
            {products.map((product) => (
              <div className="product" key={product._id}>
                <h3>{product.model}</h3>
                <img src={product.imageUrl} alt={product.subCategory.Brand} />
                <div className="details">
                  <span>{product.description}</span>
                  <span>{product.price}/-</span>
                </div>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
        <Link to="/cart">Go To Cart</Link>
      </div>
      <Cart products={cartItems} removeFromCart={removeFromCart} />
    </>
  );
}
