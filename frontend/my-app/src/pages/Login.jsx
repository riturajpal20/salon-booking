import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location.state?.role || "user";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const redirectAfterLogin = () => {

    navigate("/services");

  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9091/api/user/login", formData, { withCredentials: true });
      console.log('res------>>>>>>>', res);
      const userWithRole = { ...res.data, role: selectedRole, username: res.data.username || res.data.name };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      redirectAfterLogin();
    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9091/api/user/signup", formData);
      setMessage("Signup successful! Please login.");
      setTab("login");
    } catch (err) {
      setMessage("Signup failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      console.log('credentialResponse---',credentialResponse)
      const token = credentialResponse.credential;
      const res = await axios.post("http://localhost:9091/api/user/google-login", { token }, { withCredentials: true });
      console.log('res-----------',res)
      const userWithRole = { ...res.data, role: selectedRole, username: res.data.username || res.data.name };
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      redirectAfterLogin();
    } catch (err) {
      setMessage("Google login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="left-panel">
          <h1 className="brand">
            <span className="highlight">Salon</span>Booking
          </h1>
          <p>Book your favorite salon in just a few clicks.</p>
          <img src="/assets/login-illustration.png" alt="Salon" className="illustration" />
        </div>

        <div className="right-panel">
          <div className="tabs">
            <button className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>
              Login
            </button>
            <button className={tab === "signup" ? "active" : ""} onClick={() => setTab("signup")}>
              Sign Up
            </button>
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="form">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit" className="primary-btn">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="form">
              <input type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit" className="primary-btn">Sign Up</button>
            </form>
          )}

          <div className="or-divider"><span>OR</span></div>
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => setMessage("Google login failed")} />
          {message && <p className="error-msg">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
