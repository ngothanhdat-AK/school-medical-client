
import React from 'react'
import { useEffect, useState, useCallback, useSelector } from 'react'
import axiosInstance from '../../../api/axios';
import "./index.scss";


const UpdateUserProfile = () => {
    const storedUserId = localStorage.getItem("userId");
    const userId = useSelector((state) => state.user.userId) || storedUserId;

    const [user, setUser] = useState(null);
    const [upload, setUpload] = useState(false);
    const[saving, setSaving] = useState(false);
    const[error, setError] = useState(null);

    //get user profile
    const fetchUserProfile = useCallback(async () => {
        if(!userId){
            return;
        }
        try{
            const res = await axiosInstance.get(`/user-profile/${userId}`);
            setUser(res.data);
        }
        catch (error) {
            setError(error);
        }
    },[userId]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);
    

//upload image to cloud
    const handleUpload = async (e) => {
        const file = e.target.file[0];
        if(!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "SchoolManagement");
        setUpload(true);
        setError(null);
         try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcmms8d19/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload lỗi");
      setUser((prev) => ({ ...prev, avatarUrl: data.secure_url }));
    } catch (err) {
      console.error("Error uploading image", err);
      setError("Lỗi upload ảnh.");
    } finally {
      setUpload(false);
    }
  };

  //get user profile to update
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try{
        await axiosInstance.put(`/user-profile/${userId}`, {
            fullName: user.fullName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            avatarUrl: user.avatarUrl
        });
        alert("User profile updated successfully");
    
  }catch (error) {
    setError(error);
    alert("failed to upload user profile");
  }
  finally {
    setSaving(false);
  }

  }

  const handleChange = (e) => {
    const { name, value} = e.target;
    setUser((prev) => ({...prev, [name]: value}))
  }

  const handleGoBack = () => {
    window.history.back();
  }

  return (
    <>
    <div className='profile_main'>
        <h2> Update User Profile</h2>
        {error && <p className="error">{error.message}</p>}
        <div className='profile_image'>
           <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt="avatar"
          width={150}
          height={150}
          style={{ borderRadius: "50%" }}
        />
        <input type="file" accept='image/*' onChange={handleUpload} />
        {upload && <p>Uploading...</p>}

      </div>
      
      <div className='profile_form'>
        <form onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
        <div className='profile_input_1'>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName || ""}
            onChange={handleChange}
            required
          />
        
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className='profile_input_2'>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button type="submit" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" onClick={handleGoBack} disabled={saving}>
            Quay lại
          </button>
        </div>
      </form>
        
      </div>

      
    </div>
    </>
  )
}

export default UpdateUserProfile