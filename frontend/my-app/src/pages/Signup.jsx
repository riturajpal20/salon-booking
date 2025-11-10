import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobilenumber: "",
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:9091/api/user/signup", formData);
      setMessage("Signup successful! Welcome " + res.data.username);
      setFormData({
        username: "",
        email: "",
        mobilenumber: "",
        password: "",
        cpassword: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Error during signup");
      } else {
        setMessage("Error during signup");
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#ffffff", // page background white
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "400px",
        padding: "30px",
        backgroundColor: "#ffffff", // form background white
        borderRadius: "15px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#000000" }}>Signup</h2>
        <form onSubmit={handleSubmit}>
          {["username", "mobilenumber", "email", "password", "cpassword"].map((field, idx) => (
            <input
              key={idx}
              type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
              name={field}
              placeholder={field === "cpassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#ffffff", // input background white
                transition: "0.3s"
              }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 5px #3399ff"}
              onBlur={(e) => e.target.style.boxShadow = "none"}
            />
          ))}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#3399ff", // sky blue button
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseOver={e => e.target.style.backgroundColor = "#66b3ff"}
            onMouseOut={e => e.target.style.backgroundColor = "#3399ff"}
          >
            Signup
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "20px", textAlign: "center", color: "red", fontWeight: "500" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
