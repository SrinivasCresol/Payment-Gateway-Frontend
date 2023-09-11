import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { userLoginFunction } from "../Services/Apis";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userLoginFunction(inputValue);

      if (response.status === 200) {
        if (response.data.result.validateUser.role === "User") {
          sessionStorage.setItem("userToken", response.data.result.token);
          navigate("/user");
        } else if (response.data.result.validateUser.role === "Admin") {
          sessionStorage.setItem("adminToken", response.data.result.token);
          navigate("/admin");
        } else if (response.data.result.validateUser.role === "SuperAdmin") {
          sessionStorage.setItem("superAdminToken", response.data.result.token);
          navigate("/super-admin");
        }
      }
    } catch (error) {
      console.log("Catch Block Error:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    const token1 = sessionStorage.getItem("adminToken");

    if (token) {
      navigate("/user");
    } else if (token1) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back, Log In</h1>
          <p>Hi, we are you glad you are back. Please login.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={inputValue.email}
              onChange={setValue}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type="password"
                onChange={setValue}
                value={inputValue.password}
                name="password"
                id="password"
                placeholder="Enter Your password"
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>
            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>{" "}
          </p>
        </form>
      </div>
    </section>
  );
}
