import React, { useState } from 'react'
import {Eye, EyeOff} from "lucide-react";
import axiosInstance from '../../api/axios';
import './index.scss';


const ResetPassword = () => {
   
   const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if(newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try{
      const response = await axiosInstance.post('/auth/change-password', {
        phoneNumber,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      console.log(response);
      setSuccess(response.data.message ||'Mat khau da duoc cap nhat thanh cong');
      setPhoneNumber('');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

    }
    catch(err) {
      setError(err.response?.data?.message || 'Phone number or password is incorrect.');
      return;
    }
}
  return (
    <>
    <div className='reset_main'>
      <div className='reset_form'>
        <h2 className='reset_name'>Reset Password</h2>
        <div className='reset_message'>
           {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </div>      
        <form onSubmit={handleReset}>
            <div
                className="reset_form__eye"
                onClick={() => setShowPassword(!showPassword)}
                style={{cursor: "pointer"}}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            <div className='reset_form__input'>
              <label >phoneNumber</label>
              <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Enter phone number' required />
            </div>
            <div className='reset_form__input'>
                <label > Current Password:</label>               
                <input type={showPassword ? "text" : "password"} value={oldPassword} name="oldPassword" onChange={(e) => setOldPassword(e.target.value)} placeholder='Enter current password' required />
            </div>
            <div className='reset_form__input'>
                <label > New Password:</label>              
                <input type={showPassword ? "text" : "password"} value={newPassword} name="newPassword" onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter new password' required />
            </div>
            <div className='reset_form__input'>
                <label > Confirm New Password:</label>
                <input type={showPassword ? "text" : "password"} value={confirmNewPassword} name="confirmNewPassword" onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder='Confirm new password' required />
            </div>
           
            <button type="submit">Update</button>
        </form>

      </div>
  </div>
    </>
  )
}

export default ResetPassword
