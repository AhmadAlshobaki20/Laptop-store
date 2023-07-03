import "./Login.css";
import login_image from "../../router.avif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import allData from "../context/context";
import axios from "axios";
import { Profile } from "../intermediry";

function Login() {
  const navigate = useNavigate();
  const {users, userID,setUserID} = useContext(allData);
  const [error, setError] = useState("");
  const [CurrentUser, setCurrentUser] = useState({
    Email: "",
    password: "",
  });
  const handelFormData = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevLogin) => ({ ...prevLogin, [name]: value }));
  };



  // handel data which we get it from server
  // const findUser = users.find((elm) => {
  //   return elm.email === CurrentUser.Email;
  // });

  // const getData = () => {
  //   axios.get(`http://localhost:5001/users/${findUser.id}`).then((data) => {
  //   setUserID(findUser.id);  
  //   navigate(`/${findUser.id}`);
  //   });
  // };

  const handelSubmit = (event) => {
    event.preventDefault();
    getData();
    // if (findUser) {
    //   console.log(findUser);
    // } else if (!findUser) {
    //   console.log(false);
    // }
    console.log("userID = ",userID)
};

  const getData = () => {
  axios
    .get(
      `http://localhost:5001/users/?email=${CurrentUser.Email}&&password=${CurrentUser.password}`
    )
    .then((response) => {
      try {
        if (
          response.data[0].email === CurrentUser.Email &&
          response.data[0].password === CurrentUser.password
        ) {
          setUserID(response.data[0].id)
          navigate(`/${response.data[0].id}`);
          console.log(response.data[0].email, response.data[0].password);
          // sessionStorage.setItem('userId',response.data[0].id);
        }
      } catch (error) {
        setError("invalid email or password");
      }
    });
};

  return (
    <>
      <div className="login-container">
        <div className="login-right-side">
          <img src={login_image} id="login-image" alt="" />
        </div>
        <div className="login-left-side">
          {error && <div id="invalid-error">{error}</div>}
          <form onSubmit={handelSubmit}>
            <div className="username-email">
              <input
                type="email"
                placeholder="Email"
                onChange={handelFormData}
                name="Email"
                value={CurrentUser.Email}
              />
            </div>
            <div className="password-confirmPassword">
              <input
                type="password"
                placeholder="password"
                onChange={handelFormData}
                name="password"
                value={CurrentUser.password}
              />
            </div>
            <div className="login-wrap">
              <Link to={"/Register"}>I have already Registered</Link>
              <button id="login" onClick={handelSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;


