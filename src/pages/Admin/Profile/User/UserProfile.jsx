import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useState} from "react";
import axiosInstance from "../../../../api/axios";
import "./index.scss";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
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
        const response = await axiosInstance.get(`/api/user-profile/${userId}`);
        setUser(response.data);
        console.log("User profile fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  return (
    <>
      {!user ? (
        <div>Loading...</div>
      ) : (
        <div className="profile_main">
          <div className="profile_image no-upload">
            <img src={user.avatarUrl} alt="img2" />
          </div>
          <div className="profile_form">
            <h2>Hello {user.fullName}</h2>
            <form action="">
              <div>
                <div className="profile_input_1">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    readOnly
                  />

                  <label>Email Address</label>
                  <input
                    type="emailAddress"
                    name="emailAddress"
                    value={user.emailAddress}
                    readOnly
                  />
                </div>

                <div className="profile_input_2">
                  <label>Day of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    readOnly
                  />
                </div>
                <div className="profile_input_1">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    readOnly
                  />
                </div>
                <div className="buttons">
                  <button type="button" onClick={() => navigate("update")}>
                    Edit
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

export default UserProfile;
