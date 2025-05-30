import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../api/axios";
import "./index.scss";

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

const UserForm = ({userId, onSuccess}) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Lấy userId từ localStorage nếu không truyền qua props
    const id = userId || localStorage.getItem("editUserId");
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/api/user-profile/${id}`);
        setForm({
          phoneNumber: res.data.phoneNumber || "",
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          password: "", // Không show password cũ
          roleName: res.data.roleName || "",
        });
      } catch (err) {
        console.log(err);
        setError("Failed to fetch user data.");
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axiosInstance.put(
        `/api/accounts/${userId || localStorage.getItem("editUserId")}`,
        {
          phoneNumber: form.phoneNumber,
          fullName: form.fullName,
          email: form.email,
          password: form.password, // Nếu không đổi password, backend nên bỏ qua nếu rỗng
          roleName: form.roleName,
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
              placeholder="Leave blank to keep current password"
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
