import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewBooking.css";

function ViewBooking() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const salonId = state?.id || localStorage.getItem("salonId");


  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:9091/api/booking/allbooking`);
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to get all bookings");
    }
  };

 const handleCancel = async (b) => {
  try {
    const { slot, id: bookingId } = b;

    const salonIdResponse = await axios.get(
      `http://localhost:9091/api/booking/getsalonid/${bookingId}`
    );
    const salonId = salonIdResponse.data;

    await axios.delete(
      `http://localhost:9091/api/booking/cancel/${bookingId}/${slot}/${salonId}`
    );

    setBookings((prev) => prev.filter((bk) => bk.id !== bookingId));
    alert("Booking cancelled successfully!");
  } catch (err) {
    console.error("Error cancelling booking:", err);
    alert("Failed to cancel booking");
  }
};


  if (!bookings.length)
    return (
      <div className="view-booking">
        <h2>No bookings found!</h2>
        <button className="home-btn" onClick={() => navigate("/services")}>
          Go Back
        </button>
      </div>
    );

  return (
    <div className="view-booking">
      <h1>Your Bookings</h1>
      <div className="bookings-list">
        {bookings.map((b) => (
          <div key={b.id} className="booking-stripe">
            <div className="booking-info">
              <p><strong>ID:</strong> {b.id}</p>
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Service:</strong> {b.services}</p>
              <p><strong>Slot:</strong> {b.slot}</p>
              <p><strong>Email:</strong> {b.email}</p>
              <p><strong>Salon Name:</strong> {b.salonName}</p>
            </div>
            <button className="cancel-btn" onClick={() => handleCancel(b)}>
              Cancel
            </button>
          </div>
        ))}
      </div>

      <button className="home-btn" onClick={() => navigate("/services")}>
        Back to Services
      </button>
    </div>
  );
}

export default ViewBooking;
