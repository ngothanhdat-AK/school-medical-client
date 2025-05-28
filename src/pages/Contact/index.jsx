import React from "react";
import "./index.scss";
import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";

const index = () => {
  return (
    <div className="contact-wrapper flex flex-col justify-center align-items-center">
      <div className="contact-hero">
        <h1>
          <span className="contact-hero-icon">
            <FaMapMarkerAlt size={32} color="#355383" />
          </span>
          Contact Us
        </h1>
        <p>
          <span className="contact-highlight">
            MEDICARE – School Medical Station of dtn2TT
          </span>{" "}
          is always ready to support the health of students, parents, and
          teachers. We listen to all feedback to improve the quality of school
          healthcare services.
        </p>
        <p>
          Don’t hesitate to contact us through the channels below for
          consultation, appointment booking, or feedback!
        </p>
      </div>

      <div className="contact-info-box">
        <div className="contact-info-row">
          <div className="contact-section">
            <div className="flex justify-center align-items-center gap-2">
              <div className="contact-section-icon">
                <FaPhoneAlt size={28} color="#355383" />
              </div>
              <h2>Hotline</h2>
            </div>
            <p>
              Emergency medical support and health consultation during office
              hours.
            </p>
            <p className="highlight">079-999-5828</p>
          </div>
          <div className="contact-section">
            <div className="flex justify-center align-items-center gap-2">
              <div className="contact-section-icon">
                <FaEnvelope size={28} color="#355383" />
              </div>
              <h2>Email</h2>
            </div>
            <p>
              Send questions, feedback, or administrative support requests.
              Response within 24 hours.
            </p>
            <p className="highlight">gcteam2023@gmail.com</p>
          </div>
          <div className="contact-section">
            <div className="flex justify-center align-items-center gap-2">
              <div className="contact-section-icon">
                <FaMapMarkerAlt size={28} color="#355383" />
              </div>
              <h2>Address</h2>
            </div>
            <p>
              School medical office, dedicated to providing student healthcare.
            </p>
            <p className="highlight">4/48 Medical St, Ho Chi Minh City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
