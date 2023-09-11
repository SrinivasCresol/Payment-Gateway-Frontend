import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const logoutAdmin = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (token) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  const createProduct = () => {
    navigate("product/create");
  };

  const updateProduct = () => {
    navigate("product/update");
  };

  return (
    <div>
      <div>
        <h1>Hello from Admin Page</h1>
        <button onClick={logoutAdmin}>Logout</button>
      </div>
      <div>
        <button onClick={createProduct}>Create Product</button>
        <button onClick={updateProduct}>Update Product</button>
      </div>
      <Outlet />
    </div>
  );
}
