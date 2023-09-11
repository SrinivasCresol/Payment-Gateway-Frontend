import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userRegisterFunction } from "../Services/Apis";

export default function Register() {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await userRegisterFunction(inputValue);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleRegister}>
          <div className="form_input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={setValue}
              value={inputValue.name}
              name="name"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={setValue}
              value={inputValue.email}
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
                value={inputValue.password}
                onChange={setValue}
                name="password"
                id="password"
                placeholder="Enter Your password"
              />
            </div>
          </div>
          <div className="form_input">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              value={inputValue.role}
              onChange={setValue}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p>
            Already have an account? <NavLink to="/">Log In</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
}
