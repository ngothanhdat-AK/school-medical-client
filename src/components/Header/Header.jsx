import React from "react";
import "./Header.scss";
import {NavLink, useNavigate} from "react-router-dom";
import HeaderLogoTop from "../../assets/images/Medical.svg";
import HeaderLogoBottom from "../../assets/images/Black Modern Medical Logo.svg";
import Call_Icon from "../../assets/images/Call_Icon.svg";
import Clock_Icon from "../../assets/images/Clock_Icon.svg";
import Location_Icon from "../../assets/images/Location_Icon.svg";
import {useSelector} from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken"); // Kiểm tra đăng nhập
  const role = useSelector((state) => state.user.role);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Xóa token khi logout
    // Bạn cũng có thể xóa các thông tin user khác ở đây nếu dùng redux
    navigate("/login"); // Chuyển về trang login hoặc trang chủ
  };
  return (
    <>
      <div className="header">
        <div className="header__top flex justify-around items-center p-2.5">
          <div className="header__top-left">
            <img src={HeaderLogoTop} alt="Medical Logo Top" />
          </div>
          <div className="header__top-right">
            <ul className="header__top-right-list flex">
              <li className="header__top-right-item flex items-center gap-3 mr-7">
                <img
                  className="m-w-[100%] h-[35px]"
                  src={Call_Icon}
                  alt="Call Icon"
                />
                <div>
                  <p className="text-white">Emergency</p>
                  <p className="header__text">(237) 681-812-255</p>
                </div>
              </li>
              <li className="header__top-right-item flex items-center gap-3 mr-7">
                <img
                  className="m-w-[100%] h-[35px]"
                  src={Clock_Icon}
                  alt="Clock Icon"
                />
                <div>
                  <p className="text-white">Working Hours</p>
                  <p className="header__text">Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="header__top-right-item flex items-center gap-3 mr-7">
                <img
                  className="m-w-[100%] h-[35px]"
                  src={Location_Icon}
                  alt="Location Icon"
                />
                <div>
                  <p className="text-white">Location</p>
                  <p className="header__text">123 Medical St, Health City</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="header__bottom flex justify-between items-center bg-white">
          <div className="header__bottom-image ml-10">
            <NavLink
              to="/"
              style={{textDecoration: "none"}}
              className={({isActive}) => (isActive ? "active-link" : "")}
              end
            >
              <img src={HeaderLogoBottom} alt="Medical Logo Bottom" />
            </NavLink>
          </div>

          <nav className="header__bottom-navbar">
            <ul className="header__bottom-list flex justify-center items-center gap-5 font-bold">
              <li className="header__bottom-item">
                <NavLink
                  to="/"
                  style={{textDecoration: "none"}}
                  className={({isActive}) => (isActive ? "active-link" : "")}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="header__bottom-item">
                <NavLink
                  to="/resources"
                  style={{textDecoration: "none"}}
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  Health Resources
                </NavLink>
              </li>
              <li className="header__bottom-item">
                <NavLink
                  to="/blog"
                  style={{textDecoration: "none"}}
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  Blog
                </NavLink>
              </li>
              <li className="header__bottom-item">
                <NavLink
                  to="/contact"
                  style={{textDecoration: "none"}}
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  Contact
                </NavLink>
              </li>
              <li className="header__bottom-item">
                <NavLink
                  to="/parent"
                  style={{textDecoration: "none"}}
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  Services
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header__bottom-button flex justify-center items-center gap-4 mr-10">
            {token && role ? (
              <div className="flex items-center gap-3">
                <span style={{color: "#355383", fontWeight: "bold"}}>
                  Hello, {role}
                </span>
                <button className="header__login" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div>
                  <NavLink
                    className="header__register"
                    to="/resetpassword"
                    style={{textDecoration: "none"}}
                  >
                    <button>Register</button>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    className="header__login"
                    to="/login"
                    style={{textDecoration: "none"}}
                  >
                    <button>Login</button>
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
