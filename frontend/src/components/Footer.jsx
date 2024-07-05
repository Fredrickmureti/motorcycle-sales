import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Information</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> Email: fredrickmureti@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> Contact: 0797504827</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Location: Nairobi</p>
          </div>
          <div className="footer-section">
            <h3>Social Media</h3>
            <p><FontAwesomeIcon icon={faTwitter} /> Twitter: <a href="https://twitter.com/devFredrickmureti" target="_blank" rel="noopener noreferrer">@devFredrickmureti</a></p>
            <p><FontAwesomeIcon icon={faInstagram} /> Instagram: <a href="https://instagram.com/devFredrickmureti" target="_blank" rel="noopener noreferrer">@devFredrickmureti</a></p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/motorcycles">Motorcycles List</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/profile">Profile</a></li>

              <li><a href="/total-users">Total Users</a></li>
            </ul>
          </div>
        </div>
        <p>&copy; 2024 Motorcycle Sales Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;