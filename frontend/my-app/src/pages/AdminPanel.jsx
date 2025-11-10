import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

function AdminPanel() {
  const [formData, setFormData] = useState({
    salonName: "",
    location: "",
    number: "",
    date: "",
    services: [{ name: "", price: "" }],
    schedule: [""],
    occasions: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = value;
    setFormData((prev) => ({ ...prev, schedule: newSchedule }));
  };

  const addSchedule = () => setFormData((prev) => ({ ...prev, schedule: [...prev.schedule, ""] }));
  const removeSchedule = (index) => setFormData((prev) => ({
    ...prev,
    schedule: prev.schedule.filter((_, i) => i !== index),
  }));

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData((prev) => ({ ...prev, services: newServices }));
  };

  const addService = () => setFormData((prev) => ({
    ...prev,
    services: [...prev.services, { name: "", price: "" }],
  }));

  const removeService = (index) => setFormData((prev) => ({
    ...prev,
    services: prev.services.filter((_, i) => i !== index),
  }));

  const handleOccasionChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, occasions: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9091/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data) {
        alert("Salon added successfully!");
        navigate("/services");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add salon. Check console for details.");
    }
  };

  return (
    <div className="admin-panel-container">
      <h2 className="title">Salon Owner Dashboard</h2>
      <p className="subtitle">Add your salon details and manage your listings</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-section">
          <input
            name="salonName"
            value={formData.salonName}
            onChange={handleChange}
            placeholder="Salon Name"
            className="input-field"
            required
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input-field"
            required
          />
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Contact Number (+91)"
            className="input-field"
            required
          />
          <label className="label">Available Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Schedule */}
        <h3 className="section-title">Time Slots</h3>
        {formData.schedule.map((slot, index) => (
          <div key={index} className="schedule-row">
            <input
              type="text"
              placeholder="Slot (e.g., 10:00 AM - 12:00 PM)"
              value={slot}
              onChange={(e) => handleScheduleChange(index, e.target.value)}
              className="input-field"
              required
            />
            {formData.schedule.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removeSchedule(index)}>
                ✖
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addSchedule}>
          ➕ Add Slot
        </button>

        {/* Occasions */}
        <h3 className="section-title">Occasions</h3>
        <select
          multiple
          className="input-field"
          onChange={handleOccasionChange}
          value={formData.occasions}
          required
        >
          <option value="Bridal">Bridal</option>
          <option value="Groom">Groom's Party</option>
          <option value="Casual">Casual</option>
          <option value="Party">Party</option>
        </select>

        {/* Services */}
        <h3 className="section-title">Services & Prices</h3>
        {formData.services.map((service, index) => (
          <div key={index} className="service-row">
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, "name", e.target.value)}
              className="input-field service-name"
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={service.price}
              onChange={(e) => handleServiceChange(index, "price", e.target.value)}
              className="input-field service-price"
              required
            />
            {formData.services.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removeService(index)}>
                ✖
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addService}>
          ➕ Add Service
        </button>

        <button type="submit" className="submit-btn">
          Submit Salon
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
