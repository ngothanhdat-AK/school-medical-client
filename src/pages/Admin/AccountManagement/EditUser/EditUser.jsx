import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../api/axios";
import "./index.scss";

const initialState = {
  fullName: "",
  dateOfBirth: "",
  avatarUrl: "",
  emailAddress: "",
  address: "",
};

const UserForm = ({userId, onSuccess}) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const id = userId || localStorage.getItem("editUserId");
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/api/user-profile/${id}`);
        setForm({
          fullName: res.data.fullName || "",
          dateOfBirth: res.data.dateOfBirth?.split("T")[0] || "",
          avatarUrl: res.data.avatarUrl || "",
          emailAddress: res.data.emailAddress || "",
          address: res.data.address || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const validate = () => {
    const errors = {};
    if (!form.fullName || form.fullName.trim().length < 2) {
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
      form.emailAddress.endsWith(domain)
    );
    if (!form.emailAddress || !isValidDomain) {
      errors.emailAddress = "Email must end with a valid domain";
    }
    // Date of birth phải là ngày quá khứ
    if (!form.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    } else {
      const today = new Date();
      const dob = new Date(form.dateOfBirth);
      today.setHours(0, 0, 0, 0);
      dob.setHours(0, 0, 0, 0);
      if (dob >= today) {
        errors.dateOfBirth = "Date of Birth is invalid";
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSaving(false);
      return;
    }
    setFormErrors({});

    try {
      await axiosInstance.put(
        `/api/user-profile/${userId || localStorage.getItem("editUserId")}`,
        {
          fullName: form.fullName,
          dateOfBirth: form.dateOfBirth,
          avatarUrl: form.avatarUrl,
          emailAddress: form.emailAddress,
          address: form.address,
        }
      );
      await Swal.fire({
        icon: "success",
        title: "User updated!",
        text: "Staff account has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update user. Please check your input."
      );
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err?.response?.data?.message || "Unable to update user.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile_main">
      <div className="profile_form">
        <h2>Edit Staff Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile_input_1">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            {formErrors.fullName && (
              <div className="input-error">{formErrors.fullName}</div>
            )}

            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
            {formErrors.dateOfBirth && (
              <div className="input-error">{formErrors.dateOfBirth}</div>
            )}

            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleChange}
              required
            />
            {formErrors.emailAddress && (
              <div className="input-error">{formErrors.emailAddress}</div>
            )}

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
            {formErrors.address && (
              <div className="input-error">{formErrors.address}</div>
            )}
          </div>
          <div className="buttons">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update"}
            </button>
          </div>
          {error && <div className="input-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
