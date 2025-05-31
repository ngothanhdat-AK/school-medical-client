import React from "react";
import "./index.scss";
import HeaderLogoTop from "../../assets/images/Medical.svg";
import Call_Icon from "../../assets/images/Call_Icon.svg";
import Clock_Icon from "../../assets/images/Clock_Icon.svg";
import Location_Icon from "../../assets/images/Location_Icon.svg";

const SystemHeader = () => {
  return (
    <>
      <div className="header">
        <div className="header__top flex justify-around items-center p-2.5">
          <div className="header__top-left">
            <img src={HeaderLogoTop} alt="Medical Logo Top" />
          </div>
          <div className="header__top-right">
            <ul className="header__top-right-list">
              <li className="header__top-right-item flex items-center gap-3 mr-7">
                <img
                  className="m-w-[100%] h-[35px]"
                  src={Call_Icon}
                  alt="Call Icon"
                />
                <div>
                  <p className="text-white m-0">Emergency</p>
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
                  <p className="text-white m-0">Working Hours</p>
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
                  <p className="text-white m-0">Location</p>
                  <p className="header__text">123 Medical St, Health City</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemHeader;
