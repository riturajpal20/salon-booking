import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Navigate to admin page if logged in, else redirect to login
  const handleAdminClick = () => {
    if (user) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getProfileInitial = () => {
    if (!user) return "";
    if (user.username && user.username.length > 0) return user.username.charAt(0).toUpperCase();
    if (user.name && user.name.length > 0) return user.name.charAt(0).toUpperCase();
    return "?";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo">
          <span className="logo-highlight">Salon</span>Booking
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/viewslot" className="nav-link">View Slot</Link>
        <button className="nav-link admin-btn" onClick={handleAdminClick}>
          List Your Salon
        </button>

        {user ? (
          <div className="profile-wrapper">
            <div
              className="profile-icon"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {getProfileInitial()}
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link login-link">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
