// src/pages/BookSlot.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BookingPage.css";

function BookSlot() {
  const { state: salon } = useLocation();
  const navigate = useNavigate();
  console.log('salon-->>>>>>', salon);

  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 8;

  if (!salon) return <p className="error">Salon not found!</p>;

  const startIndex = (currentPage - 1) * slotsPerPage;
  const paginatedSlots = salon.schedule
    ? salon.schedule.slice(startIndex, startIndex + slotsPerPage)
    : [];
  const totalPages = salon.schedule
    ? Math.ceil(salon.schedule.length / slotsPerPage)
    : 1;

  const handleBooking = (slot) => {
    if (!salon.services || salon.services.length === 0) {
      alert("No services available!");
      return;
    }

   
    console.log('salon--', salon);

    navigate("/payment", {
      state: { salon, slot, service: salon.services },
    });
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Choose Your Slot</h1>
      <h2 className="salon-name">{salon.salonName}</h2>
      <p className="salon-location">{salon.location}</p>
      <p className="salon-number">{salon.number}</p>

      {/* Slots Grid */}
      <div className="slots-grid">
        {paginatedSlots.length > 0 ? (
          paginatedSlots.map((slot, idx) => (
            <div key={idx} className="slot-card">
              <h3 className="slot-time">{slot}</h3>

              <div className="services-list">
                <h4>Available Services:</h4>
                {salon.services && salon.services.length > 0 ? (
                  salon.services.map((service, i) => (
                    <div key={i} className="service-item">
                      <span>{service.name}</span>
                      <span className="service-price">₹{service.price}</span>
                    </div>
                  ))
                ) : (
                  <p>No services available</p>
                )}
              </div>

           
              <button
                className="book-btn"
                onClick={() => handleBooking(slot)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="no-slots">No slots available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookSlot;
