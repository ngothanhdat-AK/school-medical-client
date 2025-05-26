import React from "react";
import "./Footer.scss";
import {FaPhoneAlt, FaEnvelope, FaLocationArrow} from "react-icons/fa";
import HeaderLogoBottom from "../../assets/images/Black Modern Medical Logo.svg";
const Footer = () => (
  <footer className="footer">
    <div className="hr"></div>
    <div className="footer__container">
      <div className="footer__section footer__logo">
        <a href="/">
          <img
            src={HeaderLogoBottom}
            alt="Medicare Logo"
            className="footer__logo-img"
          />
        </a>
      </div>
      <div className="footer__divider" />
      <div className="footer__section">
        <h3>Quick Links</h3>
        <ul>
          <li>Home</li>
          <li>Appointment</li>
          <li>Services</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer__divider" />
      <div className="footer__section">
        <h3>Hours</h3>
        <ul>
          <li>
            Monday: <span>9:00 - 18:00</span>
          </li>
          <li>
            Tuesday: <span>9:00 - 18:00</span>
          </li>
          <li>
            Wednesday: <span>9:00 - 18:00</span>
          </li>
          <li>
            Thursday: <span>9:00 - 18:00</span>
          </li>
          <li>
            Friday: <span>9:00 - 18:00</span>
          </li>
        </ul>
      </div>
      <div className="footer__divider" />
      <div className="footer__section">
        <h3>Contact</h3>
        <ul className="footer__contact">
          <li>
            <FaPhoneAlt /> 000-000-000
          </li>
          <li>
            <FaEnvelope /> info@gmail.com
          </li>
          <li>
            <FaLocationArrow /> Thanh Pho Ho Chi Minh
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
