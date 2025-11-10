import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRoleSelect.css";

function LoginRoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="role-select-hero">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Welcome to SalonBooking</h1>
        <p>Book your appointments easily or manage your salon efficiently</p>

        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleSelect("user")}>
            <img src="https://img.icons8.com/fluency/96/000000/hair-dresser.png" alt="Customer" />
            <h2>💇 Customer</h2>
            <p>Find and book your favorite salon appointments instantly.</p>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("owner")}>
            <img src="https://img.icons8.com/fluency/96/000000/salon.png" alt="Owner" />
            <h2>🏠 Salon Owner</h2>
            <p>Manage your services, schedule, and customers efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRoleSelect;
