import React, {useEffect, useState, useCallback} from "react";
import axiosInstance from "../../../../api/axios";
import {useSelector} from "react-redux";
import "./indexUpdate.scss";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.user.userId) || storedUserId;
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  //get user profile
  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await axiosInstance.get(`/api/user-profile/${userId}`);
      setUser(res.data);
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
    setError(null);

    const startTime = Date.now(); // Bắt đầu đo thời gian

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/darnrlpag/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");
      setUser((prev) => ({...prev, avatarUrl: data.secure_url}));

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      // Hiển thị SweetAlert khi upload thành công kèm thời gian
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Profile image updated!`,
        text: `Upload time: ${duration} seconds`,
        showConfirmButton: false,
        timer: 2200,
        showClass: {popup: ""},
        hideClass: {popup: ""},
        customClass: {
          popup: "swal2-alert-custom-size",
        },
      });
    } catch (error) {
      console.error(error);
      setError("Error uploading image");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Upload failed!",
        text: "Could not update profile image.",
        showConfirmButton: false,
        timer: 2000,
        showClass: {popup: ""},
        hideClass: {popup: ""},
        customClass: {
          popup: "swal2-alert-custom-size",
        },
      });
    }
  };

  // Validation function
  const validate = () => {
    const errors = {};
    if (!user.fullName || user.fullName.trim().length < 2) {
      errors.fullName = "Full Name is required (at least 2 characters)";
    }
    // Email phải có @gmail.com hoặc @fpt.edu.vn
    const allowedEmailDomains = [
      "@gmail.com",
      "@fpt.edu.vn",
      "@student.fpt.edu.vn",
      "@fe.edu.vn",
      "@fpt.com.vn",
      // Thêm các đuôi khác nếu cần
    ];
    const isValidDomain = allowedEmailDomains.some((domain) =>
      user.emailAddress.endsWith(domain)
    );
    if (!user.emailAddress || !isValidDomain) {
      errors.emailAddress = "Email must end with a valid domain";
    }
    // Date of birth phải là ngày quá khứ
    if (!user.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    } else {
      const today = new Date();
      const dob = new Date(user.dateOfBirth);
      // So sánh chỉ ngày/tháng/năm, không tính giờ
      today.setHours(0, 0, 0, 0);
      dob.setHours(0, 0, 0, 0);
      if (dob >= today) {
        errors.dateOfBirth = "Date of Birth must be in the past";
      }
    }
    return errors;
  };

  //get user profile to update
  const handleSave = async () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please check your input!",
        text: Object.values(errors).join("\n"),
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: {popup: ""},
        hideClass: {popup: ""},
        customClass: {
          popup: "swal2-alert-custom-size",
        },
      });
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await axiosInstance.put(`/api/user-profile/${userId}`, {
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        dateOfBirth: user.dateOfBirth,
        avatarUrl: user.avatarUrl,
      });

      await Swal.fire({
        icon: "success",
        title: "Update Successfully!",
        text: "Your profile has been updated.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/parent/profile");
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
    setFormErrors((prev) => ({...prev, [name]: undefined}));
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
          {error && <p className="error">{error.message || error}</p>}
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
                {formErrors.fullName && (
                  <span className="input-error">{formErrors.fullName}</span>
                )}

                <label>Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={user.emailAddress || ""}
                  onChange={handleChange}
                  required
                />
                {formErrors.emailAddress && (
                  <span className="input-error">{formErrors.emailAddress}</span>
                )}
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  required
                />
                {formErrors.dateOfBirth && (
                  <span className="input-error">{formErrors.dateOfBirth}</span>
                )}
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
