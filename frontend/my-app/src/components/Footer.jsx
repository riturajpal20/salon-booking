// Footer.js
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Column 1: About */}
        <div className="footer-col">
          <h4>About</h4>
          <p>SalonBooking is your one-stop solution to book salon appointments online. Fast, convenient, and reliable.</p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-col">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social insta">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social linkedin">
              <FaLinkedin />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Column 5: Mail Us */}
        <div className="footer-col">
          <h4>Mail Us</h4>
          <p>For support or queries, write to us at:</p>
          <a href="mailto:support@salonbooking.com" className="footer-mail">support@salonbooking.com</a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        © 2025 SalonBooking. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
