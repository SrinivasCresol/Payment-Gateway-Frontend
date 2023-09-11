import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-bar-header">
          <div className="header-container">
            <h1 className="nav-head">Mobiles App</h1>
          </div>
        </div>
        <div className="desktop-container">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/user" className="home-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="cart-link">
                Cart
                {/* {renderCartItemsCount()} */}
              </Link>
            </li>
            <button type="button" className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
