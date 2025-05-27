import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import "./index.scss";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.user.userId) || storedUserId;
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!userId || !token) {
      console.error("User ID or token is missing");
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`/user-profile/${userId}`);
        setUser(response.data);
        console.log("User profile fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);



  return (
  <>
   { !user ? (<div>Loading...</div>) : (
      <div className='profile_main'>
      <div className='profile_image'>
        <input type="file" accept='image/*' />
        <img src={user.avatarUrl} alt="img2" />
      </div>
      <div className='profile_form'>
        <h2>Hello {user.fullName}</h2>
        <form action="">
          <div>
            <div className='profile_input_1'>
              <label>Full Name</label>
              <input type="text" value={user.fullName}  readOnly />

              <label>Email Address</label>
              <input type="email" value={user.emailAddress} readOnly />
            </div>

            <div className='profile_input_2'>
              <label>Day of Birth</label>
              <input type="date" value={user.dateOfBirth} readOnly />                     
            </div>

            
          </div>
        </form>
      </div>
    </div>

    ) }
    
  
  </>
)
}

export default UserProfile;
