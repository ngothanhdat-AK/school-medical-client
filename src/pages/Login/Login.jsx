import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// import axios from "axios";
import Swal from "sweetalert2";
import "./Login.scss";
import {Eye, EyeOff} from "lucide-react";
import {authenticationAPI} from "../../services/authentication";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationAPI.Login(formData);

      const data = response;
      console.log(data);
      // Lưu token
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log(data.accessToken);
      // Giải mã role
      const payloadBase64 = data.accessToken.split(".")[1];
      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));
      const roleClaim =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const role =
        decodedPayload[roleClaim] || decodedPayload["role"] || "user";

      // Hiện alert thành công
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "nurse") {
          navigate("/nurse");
        } else {
          navigate("/");
        }
      });
    } catch (err) {
      const msg = err.response?.data || "Login failed";

      // Hiện alert lỗi
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
      });

      setError(msg);
      console.error(error);
    }
  };
  return (
    <>
      <div className="login_main animate__animated animate__fadeIn">
        <div className="login_form">
          <h2 className="login_name">Log in</h2>
          <form onSubmit={handleLogin}>
            <div className="login_form">
              <div>
                <label className="login_form__label">Phone Number: </label>
                <input
                  className="login_form__input"
                  type="text"
                  name="phoneNumber"
                  placeholder="0123456789"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="login_form__label">Password: </label>
                <div className="login_form__eye-password">
                  <div
                    className="login_form__eye"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{cursor: "pointer"}}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                  <div className="login_form__input-password">
                    <input
                      className="login_form__input"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="***"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="login_form__forget">
              <a href="/resetpassword">Reset password</a>
            </div>

            <div className="login_form__terms">
              <div className="terms-container">
                <p>By continuing, you agree to the </p>
                <span>
                  <a href="">Terms of use</a>
                </span>
                <p> and </p>
                <span>
                  <a href="">Privacy Policy</a>
                </span>
              </div>
            </div>
            <button type="submit" className="login_button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
