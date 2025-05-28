import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import "./index.scss";

const UserProfile = () => {
  // const [upload, setUpload] = useState(false);
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

  // const handleUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "SchoolManagement");
  //   setUpload(true);
  //   try{
  //     const res = await fetch(`https://api.cloudinary.com/v1_1/dcmms8d19/image/upload`, {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     const avatarUrl = data.secure_url;
  //     console.log("File uploaded successfully:", data);
  //     setUser(prev => ({...prev, avatarUrl }));
  //     await axiosInstance.put(`/user-profile/${userId}`, {
  //       avatarUrl,
  //     });
      
  //   }catch (error) {
  //     console.error("Error uploading file:", error);
  //   } finally{
  //     setUpload(false);
  //   }
  // }

  return (
  <>
   { !user ? (<div>Loading...</div>) : (
      <div className='profile_main'>
      <div className='profile_image'>
        {/* <input type="file" accept='image/*' onChange={handleUpload} /> */}
        {/* {upload && <p>Uploading...</p>} */}
        <img src={user.avatarUrl} alt="img2" />
      </div>
      <div className='profile_form'>
        <h2>Hello {user.fullName}</h2>
        <form action="">
          <div>
            <div className='profile_input_1'>
              <label>Full Name</label>
              <input type="text" name="fullName" value={user.fullName}  readOnly />

              <label>Email Address</label>
              <input type="email" name="email" value={user.email} readOnly />
            </div>

            <div className='profile_input_2'>
              <label>Day of Birth</label>
              <input type="date" name="dateOfBirth" value={user.dateOfBirth} readOnly />                     
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
