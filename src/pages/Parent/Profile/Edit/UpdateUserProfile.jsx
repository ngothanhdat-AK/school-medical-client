import React from "react";
import {useEffect, useState, useCallback} from "react";
import axiosInstance from "../../../../api/axios";
import {useSelector} from "react-redux";
import "./indexUpdate.scss";
import Swal from "sweetalert2";

const UpdateUserProfile = () => {
  const storedUserId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.user.userId) || storedUserId;
  console.log("userId:", userId);
  const [user, setUser] = useState(null);
  const [upload, setUpload] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  //get user profile
  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await axiosInstance.get(`/user-profile/${userId}`);
      setUser(res.data);
      console.log("User profile fetched:", res.data);
    } catch (error) {
      setError(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  //upload image to cloud
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      if (!data.secure_url) throw new Error("Upload failed");
      setUser((prev) => ({...prev, avatarUrl: data.secure_url}));
    } catch (err) {
      console.error("Error uploading image", err);
      setError("Error uploading image");
    } finally {
      setUpload(false);
    }
  };

  //get user profile to update
  const handleSave = async () => {
    setSaving(true);
    setError(null);
   
    try {
      await axiosInstance.put(`/user-profile/${userId}`, {
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        dateOfBirth: user.dateOfBirth,
        avatarUrl: user.avatarUrl,
      });
       
      Swal.fire({
        icon: "success",
        title: "Update Successfully!",
        text: "Your profile has been updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Unable to save profile information.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({...prev, [name]: value}));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      {!user ? (
        <div>Loading...</div>
      ) : (
        <div className="profile_main">
          <h2> Update User Profile</h2>
          {error && <p className="error">{error.message}</p>}
          <div className="profile_image">
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt="avatar"
              width={150}
              height={150}
              style={{borderRadius: "50%"}}
            />
            <label className="upload-label">
              <input type="file" accept="image/*" onChange={handleUpload} />
            </label>
            {upload && <p className="m-4">Uploading...</p>}
          </div>

          <div className="profile_form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="profile_input_1">
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
                  type="emailAddress"
                  name="emailAddress"
                  value={user.emailAddress || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile_input_2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="buttons">
                  <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleGoBack}
                    disabled={saving}
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserProfile;
