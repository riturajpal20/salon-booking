import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import "./PaymentPage.css";
import { v4 as uuidv4 } from "uuid";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log('state here -->>', state);
  

  const salon = state?.salon;
  const slot = state?.slot;
  
  const preSelectedService = state?.service;
  console.log('salon---->>', salon);
  console.log('state here -->>', state);

  const [selectedService, setSelectedService] = useState(preSelectedService || null);

  // New form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ans, setans] = useState();

  const price = useMemo(
    () => (selectedService?.price ? selectedService.price / 4 : 0),
    [selectedService]
  );

  useEffect(() => {
    if (!salon || !slot) {
      alert("Booking info missing! Redirecting to services.");
      navigate("/services");
    }
  }, [salon, slot, navigate]);

  const handlePayment = async () => {
    if (!selectedService) {
      alert("Please select a service first!");
      return;
    }
    if (!name || !email || !phone) {
      alert("Please fill in all your details!");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:9091/api/payment/create-order?amount=${price}`
      );

      function generateBookingId() {
        const randomPart = Math.floor(10000 + Math.random() * 90000);
        const timePart = Date.now() % 100000;
        return `${randomPart}${timePart}`;
      }

      const bookingId = generateBookingId();
      console.log(bookingId);


      const options = {
        key: "rzp_test_RP4Z8FcFIPATnf",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Salon Booking",
        description: `Booking for ${salon.salonName} - ${selectedService.name} - Slot ${slot}`,

        handler: async function (response) {
          try {
            await axios.delete(
              `http://localhost:9091/api/admin/delete/${salon.id}/${encodeURIComponent(slot)}`
            );
            console.log('selected-->>', selectedService)
            const salonId = salon.id;

            const res = await axios.post("http://localhost:9091/api/booking/create", {
              email,
              salonId,
              name,
              slot,
              services: selectedService.name,
              salonName: salon.salonName,
              phone
            });

            console.log("res.data:", res.data);
            await axios.post("http://localhost:9091/api/booking/send-email", {
              id: res.data.id,
              email: res.data.email
            });

            const bookingObj = {
              bookingId,
              customerName: name,
              slot,
              phone,
              serviceType: selectedService.name,
              salonName: salon.salonName,
              location: salon.location,
              amount: price
            };

            navigate("/viewslot", { state: { id: salon.id } });
            localStorage.setItem("salonId", salon.id);



          } catch (err) {
            console.error("Slot deletion or email failed:", err);
            alert("Payment succeeded but there was a backend error!");
          }
        },

        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: { color: "#007bff" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment creation failed:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title"> Confirm Your Booking</h2>

        <div className="payment-info">
          <p><strong>Salon:</strong> {salon?.salonName}</p>
          <p><strong>Location:</strong> {salon?.location}</p>
          <p><strong>Slot:</strong> {slot}</p>
        </div>

        <div className="user-details-form">
          <h3>Enter Your Details</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="service-selector">
          <h3>Select a Service</h3>
          <div className="service-grid">
            {salon?.services?.length > 0 ? (
              salon.services.map((srv, idx) => (
                <div
                  key={idx}
                  className={`service-option ${selectedService?.name === srv.name ? "selected" : ""}`}
                  onClick={() => setSelectedService(srv)}
                >
                  <h4>{srv.name}</h4>
                  <p>₹{srv.price}</p>
                </div>
              ))
            ) : (
              <p>No services available</p>
            )}
          </div>
        </div>

        {selectedService && (
          <div className="price-section">
            <p><strong>Selected:</strong> {selectedService.name} (₹{selectedService.price})</p>
            <p><strong>Advance to pay:</strong> ₹{price}</p>
          </div>
        )}

        <button className="pay-btn" onClick={handlePayment}>
          Pay & Confirm
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
