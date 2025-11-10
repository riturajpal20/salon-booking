import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/services");
  };

  return (
    <div className="home-hero">
      <div className="hero-overlay">
        <h1>Book Your Salon Appointment Easily</h1>
        <p>Discover salons, compare services, and book instantly!</p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Enter city, salon, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="hero-cta">
          <p>Are you a salon owner?</p>
          <button onClick={() => navigate("/login", { state: { role: "owner" } })}>
            List Your Salon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
