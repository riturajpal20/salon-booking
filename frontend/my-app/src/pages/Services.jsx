import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services({ user }) {
  const [salons, setSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [date, setDate] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const navigate = useNavigate();

  

  const handleFilter = async () => {
    if (!date || !timeRange) {
      alert("Please select both date and time range!");
      return;
    }

    try {
      const res = await fetch("http://localhost:9091/api/admin/getall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, timeRange }),
      });

      const data = await res.json();
      const filteredData = Array.isArray(data)
        ? data.map((s) => ({ ...s, showServices: false }))
        : [];
      setFilteredSalons(filteredData);

      if (filteredData.length === 0) {
        alert("No salons available for selected date & time!");
      }
    } catch (err) {
      console.error("Error filtering salons:", err);
    }
  };

  const handleBooking = (salon) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/book/${salon.id}`, { state: salon });
    }
  };

  const toggleServices = (id) => {
    setFilteredSalons((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, showServices: !s.showServices } : s
      )
    );
  };

  return (
    <div className="services-container">
      <h1 className="title">Find Your Perfect Salon</h1>

      {/* Filter Section */}
      <div className="filter-bar">
        <div className="filter-item">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="08:00 AM - 12:00 PM">Morning (8AM - 12PM)</option>
            <option value="12:00 PM - 05:00 PM">Afternoon (12PM - 5PM)</option>
            <option value="05:00 PM - 09:00 PM">Evening (5PM - 9PM)</option>
          </select>
        </div>

        <button className="search-btn" onClick={handleFilter}>
          Search
        </button>
      </div>

      {/* Salon Cards */}
      <div className="salon-strip-container">
        {filteredSalons.length === 0 ? (
          <p className="no-results">No salons found. Try different filters!</p>
        ) : (
          filteredSalons.map((salon) => (
            <div key={salon?.id} className="salon-card">
              <div className="salon-row">
                {/* Left Section - Name + Location */}
                <div className="salon-left">
                  <h2 className="salon-name">{salon?.salonName}</h2>
                  <p className="salon-location">
                    {salon?.location || "Location not available"}
                  </p>
                </div>

                {/* Middle - Rating */}
                <div className="salon-rating">
                  ⭐ {salon?.rating ? salon.rating.toFixed(1) : "4.5"}
                </div>

                {/* View Services */}
                <button
                  className="toggle-services-btn"
                  onClick={() => toggleServices(salon.id)}
                >
                  {salon.showServices ? "Hide Services" : "View Services"}
                </button>

                {/* View Slot */}
                <button
                  className="view-slot-btn"
                  onClick={() => handleBooking(salon)}
                >
                  View Slots
                </button>
              </div>

              {/* Vertical Services List */}
              {salon.showServices && salon?.services?.length > 0 && (
                <div className="service-column">
                  {salon.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <span className="service-name">{service.name}</span>
                      <span className="service-price">₹{service.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
