import React, {useState} from "react";
import Swal from "sweetalert2";
import "./index.scss"; // Nếu bạn muốn tách style riêng, hoặc dùng chung style với UserProfileC
import axiosInstance from "../../../../api/axios";

const initialState = {
  phoneNumber: "",
  fullName: "",
  email: "",
  password: "",
  roleName: "",
};

const ROLE_OPTIONS = [
  {value: "manager", label: "Manager"},
  {value: "nurse", label: "Nurse"},
];

const CreateUpdateUser = ({onSuccess}) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axiosInstance.post("/api/accounts/register-staff", {
        phoneNumber: form.phoneNumber,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        roleName: form.roleName,
      });
      await Swal.fire({
        icon: "success",
        title: "User created!",
        text: "Staff account has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setForm(initialState);
      if (onSuccess) onSuccess(); // Gọi callback khi thành công
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create user. Please check your input."
      );
      Swal.fire({
        icon: "error",
        title: "Create Failed!",
        text: err?.response?.data?.message || "Unable to create user.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile_main">
      <div className="profile_form">
        <h2>Create Staff Account</h2>
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

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label>Role</label>
            <select
              name="roleName"
              value={form.roleName}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
          {error && <div className="input-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateUser;
