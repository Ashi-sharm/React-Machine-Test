import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { FaEnvelope, FaLock, FaUser, FaCalendarDay } from "react-icons/fa";
import "./style.css";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for empty fields
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const bodyReq = JSON.stringify(formData);

      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyReq,
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return setErrorMessage(data.message || "Signup failed");
      }

      // Save token and user info in localStorage after successful signup
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Navigate to home or a protected route after signup
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer-card">
      <div className="center">
        <h1>Sign Up</h1>
        <img
          src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
          alt="Login Logo"
          className="login-logo"
        />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <i>
              <FaUser />
            </i>
            <input type="text" id="name" required onChange={handleChange} />
            <span></span>
            <label>Name</label>
          </div>
          <div className="txt_field">
            <i>
              <FaCalendarDay />
            </i>
            <input type="text" id="dob" required onChange={handleChange} />
            <span></span>
            <label>Date Of Birth</label>
          </div>
          <div className="txt_field">
            <i>
              <FaEnvelope />
            </i>
            <input type="email" id="email" required onChange={handleChange} />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <i>
              <FaLock />
            </i>
            <input
              type="password"
              id="password"
              required
              onChange={handleChange}
            />
            <span></span>
            <label>Password</label>
          </div>

          <input
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={loading}
          />
          <div className="signup_link">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </form>

        {errorMessage && (
          <Alert className="error-message mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
