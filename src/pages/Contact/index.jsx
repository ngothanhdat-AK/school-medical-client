import React from "react";
import "./index.scss";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const index = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          At MEDICARE – School Medical Station of dtn2TT, we are committed to delivering quality
          healthcare support and resources for students, parents, and school staff. Your health,
          safety, and feedback matter deeply to us.
        </p>
        <p>
          Whether you need guidance on our medical services, have questions about appointments,
          or simply want to leave us feedback to improve, our team is ready to help you.
          Don't hesitate to reach out using the contact information below.
        </p>
      </div>

      <div className="contact-info-box">
        <div className="contact-section">
          <h2><FaPhoneAlt className="icon" /> Phone</h2>
          <p>Our hotline is open during business hours. For urgent medical concerns, please call us directly.</p>
          <p className="highlight">000-000-000</p>
        </div>

        <div className="contact-section">
          <h2><FaEnvelope className="icon" /> Email</h2>
          <p>
            For non-urgent questions, suggestions, or administrative support, please email us. We aim
            to respond within 24 hours on weekdays.
          </p>
          <p className="highlight">info@gmail.com</p>
        </div>

        <div className="contact-section">
          <h2><FaMapMarkerAlt className="icon" /> Address</h2>
          <p>
            You can visit our station during operating hours. Our medical office is equipped with
            basic healthcare services and staff trained in pediatric and school-based care.
          </p>
          <p className="highlight">123 Medical St, Thanh Pho Ho Chi Minh</p>
        </div>
      </div>
      
      <div className="time">
        <div className="working-hours">
        <h2>Working Hours</h2>
        <ul>
          <li><strong>Monday – Friday:</strong> 08:00 AM – 05:00 PM</li>
          <li><strong>Saturday & Sunday:</strong> Closed</li>
          <li><strong>Emergency Support:</strong> Available via direct phone</li>
        </ul>
      </div>

      <div className="note">
        <p>
          If you’re visiting us in person, please bring your student ID (or guardian card) for verification.
          We also recommend calling in advance for medical advice or support.
        </p>
        <p>
          For partnerships, volunteer inquiries, or school health program collaboration, kindly contact
          our administration through the provided email.
        </p>
        <p>
          Thank you for choosing MEDICARE as your trusted partner in health. Together, we strive
          to create a safe, informed, and healthier school environment.
        </p>
      </div>
      </div>

      
    </div>
  )
}

export default index