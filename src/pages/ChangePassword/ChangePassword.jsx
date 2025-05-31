import React, { useState } from "react";
import "./index.scss";
import axiosInstance from "../../api/axios";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [stepAnimation, setStepAnimation] = useState("fade-in");
  const navigate = useNavigate();

  // Step 1: send otp to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axiosInstance.post('/api/auth/forgot-password/send-otp', {
        phoneNumber,
        emailAddress,
      });     
      setStepAnimation("fade-out");
      setTimeout(() => {
        setSuccess("OTP sent successfully. Please check your email.");
        setStep(2);
        setStepAnimation("fade-in");
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || "Check again your email or phone number.");
    }
  };

  // Step 2: verify otp
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axiosInstance.post('/api/auth/forgot-password/verify-otp', `"${otp}"`);
      setSuccess("OTP verified successfully. Please enter your new password.");
      setStepAnimation("fade-out");
      setTimeout(() => {
        setStep(3);
        setStepAnimation("fade-in");
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  // Step 3: change password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    try {
      await axiosInstance.post('/api/auth/forgot-password/reset-password', {
        otp,
        phoneNumber,
        newPassword,
        confirmNewPassword,
      });
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/login");
      }, 2000);
      setStep(1);
      setPhoneNumber("");
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password. Please try again.");
    }
  };

  // Title cho từng step
  const getStepTitle = () => {
    if (step === 1) return "Forgot Password";
    if (step === 2) return "Verify OTP";
    if (step === 3) return "Reset Password";
    return "";
  };

  return (
    <div className='reset_main'>
      <div className='reset_form'>
        <h2 className={`reset_name ${stepAnimation}`}>{getStepTitle()}</h2>
        <div className='reset_message'>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className={error ? "custom-alert-animate" : "custom-alert-hide"}
              style={{ marginBottom: 12 }}
            />
          )}
          {success && (
            <Alert
              message={success}
              type="success"
              showIcon
              className={success ? "custom-alert-animate" : "custom-alert-hide"}
              style={{ marginBottom: 12 }}
            />
          )}
          {showSuccessAlert && (
            <Alert
              message="Reset password successfully"
              type="success"
              showIcon
              className={showSuccessAlert ? "custom-alert-animate" : "custom-alert-hide"}
              style={{
                marginBottom: 12,
                position: "fixed",
                top: 140,
                right: 0,
                width: 300,
                zIndex: 9999,
              }}
              closable={false}
            />
          )}
        </div>
        {step === 1 && (
          <form onSubmit={handleSendOtp} className={stepAnimation}>
            <div className='reset_form__input'>
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder='Enter phone number'
                required
              />
            </div>
            <div className='reset_form__input'>
              <label>Email</label>
              <input
                type="email"
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
                placeholder='Enter email'
                required
              />
            </div>
            <button type="submit">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className={stepAnimation}>
            <div className='reset_form__input'>
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder='Enter OTP'
                required
              />
            </div>
            <button type="submit">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className={stepAnimation}>
            <div className='reset_form__input'>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder='Enter new password'
                required
              />
            </div>
            <div className='reset_form__input'>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                placeholder='Confirm new password'
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
