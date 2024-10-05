import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { FaEnvelope, FaLock } from "react-icons/fa"; 
import "./style.css";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }

    try {
      dispatch(signInStart());

      const bodyReq = JSON.stringify(formData);

      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyReq,
      });

      const data = await res.json();
      console.log("data", data);

      if (!res.ok || data.success === false) {
        return dispatch(signInFailure(data.message || "Login failed"));
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify({ data }));

      dispatch(signInSuccess(data));
      navigate("/protected"); 
    } catch (error) {
      dispatch(signInFailure("An error occurred. Please try again."));
    }
  };

  return (
    <div className="outer-card">
      <div className="center">
        <h1>Sign In</h1>
        <img
          src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
          alt="Login Logo"
          class="login-logo"
        ></img>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <i>
              <FaEnvelope />
            </i>{" "}
            <input
              type="email"
              id="email"
              required
              onChange={handleChange}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <i>
              <FaLock />
            </i>{" "}
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
            value={loading ? "Loading..." : "Sign In"}
            disabled={loading}
          />
          <div className="signup_link">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
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
