import {useContext, useEffect, useState } from "react";
import profile_image from "../../ahmad.jpg";
import "./Profile.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import allData from "../context/context";
function Profile() {

  const {getuserID} = useContext(allData);

  useEffect(() => {
    userdata();
  }, []);

  // use location to get id
  // const location = useLocation();
  // console.log(location);
  // const userId = location.pathname.split("/")[1];
  // console.log(userId);
  // console.log(location.pathname.split("/"));
  getuserID()



  const [userData, setUserData] = useState({});

  const userdata = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((data) => {
      setUserData(data.data);
    });
  };



  return (
    <>
      <div className="Profile-container">
        <h2 id="caption-profile">Your Profile</h2>
        <div className="image-section">
          <img src={profile_image} alt="profile_image" />
          <div className="contact-info">
            <h2 className="caption-contact-info">Contact Information</h2>
            <h3>
              <span>phone : </span>
              {userData.phone}
            </h3>
            <h3>
              <span>Address : </span>Amman, Dabouc
            </h3>
            <h3>
              <span>Email : </span>
              {userData.email}
            </h3>
            <div className="Basic-info">
              <h2 className="caption-contact-info">Basic Info</h2>
              <h3>
                <span>Birthday : </span>June 1, 2000
              </h3>
              <h3>
                <span>Gender : </span>
                {userData.gender}
              </h3>
            </div>
          </div>
        </div>
        <div className="details-section">
          <span id="username">{userData.name}</span>
          <span style={{ color: "gray" }}>
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(250, 165, 0)" }}
            ></i>{" "}
            your location
          </span>
        </div>
        <div className="wrap-feedback-show">
          <h3 id="feedback-caption">your feedbacks</h3>
          <div className="inner-wrap">
            <h6>I got a problem when I use your website</h6>
            <div className="sitting-feedback">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          {/* Repeat the feedback section for other feedback items */}
        </div>
      </div>
    </>
  );
}

export default Profile;
