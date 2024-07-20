import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Information</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:fredrickmureti@gmail.com">fredrickmureti@gmail.com</a></p>
            <p><FontAwesomeIcon icon={faPhone} /> <a href="tel:+254797504827">0797504827</a></p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Nairobi, Kenya</p>
          </div>
          <div className="footer-section">
            <h3>Social Media</h3>
            <p><FontAwesomeIcon icon={faTwitter} /> <a href="https://twitter.com/devFredrickmureti" target="_blank" rel="noopener noreferrer">@devFredrickmureti</a></p>
            <p><FontAwesomeIcon icon={faInstagram} /> <a href="https://instagram.com/devFredrickmureti" target="_blank" rel="noopener noreferrer">@devFredrickmureti</a></p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/motorcycles">Motorcycles List</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
        </div>
        <p>&copy; 2024 Motorcycle Sales Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;