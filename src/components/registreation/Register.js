import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import allData from "../context/context";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import register_image from "../../photo-1571786256017-aee7a0c009b6.avif";

// regular expression
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Register() {
  const { PostUserData, users } = useContext(allData);

  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
    gender: "",
    cartproduct: [],
    History: [],
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      checkValues();
      navigate("/login");
    }
  };

  // check if the email exist inside the server
  const result = users.find((user) => {
    return user.email === newAccount.email;
  });

  // check input's if empty or not
  const checkValues = () => {
    const { email, name, password, confirmPassword, phone, gender } =
      newAccount;
    if (
      email &&
      name &&
      password &&
      confirmPassword &&
      phone &&
      gender &&
      email.match(emailRegex) &&
      password.match(passwordRegex) &&
      password === confirmPassword
    ) {
      if (result) {
        console.log("email already exist");
      } else if (!result) {
        PostUserData(newAccount);
      }
    }
  };

  // form validation
  const validateForm = () => {
    const { email, name, password, confirmPassword, phone, gender } =
      newAccount;
    const updateErrors = {};
    let valid = true;

    if (!email) {
      updateErrors.emailError = "Email is required";
      valid = false;
    } else if (!email.match(emailRegex)) {
      updateErrors.emailError = "Invalid email address";
      valid = false;
    }
    if (result) {
      updateErrors.alreadyEmailError = "email Already exist";
    }

    if (!name) {
      updateErrors.nameError = "Name is required";
      valid = false;
    }

    if (!password) {
      updateErrors.passwordError = "Password is required";
      valid = false;
    } else if (!password.match(passwordRegex)) {
      updateErrors.passwordError = "Password should be at least 8 characters";
      valid = false;
    }

    if (!confirmPassword) {
      updateErrors.confirmPasswordError = "Please confirm password";
      valid = false;
    } else if (confirmPassword !== password) {
      updateErrors.confirmPasswordError = "Passwords do not match";
      valid = false;
    }

    if (!phone) {
      updateErrors.phoneError = "Phone number is required";
      valid = false;
    }

    if (!gender) {
      updateErrors.genderError = "Gender is required";
      valid = false;
    }

    setErrors(updateErrors);
    return valid;
  };

  return (
    <div className="Register-container">
      <div className="Register-left-side">
        <img src={register_image} alt="" id="register-img" />
      </div>
      <div className="Register-right-side">
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="inputs-fields">
            <div className="username-gender-password">
              <input
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
                name="name"
                value={newAccount.name}
              />
              {errors.nameError && (
                <div className="errors">{errors.nameError}*</div>
              )}

              <select
                onChange={handleInputChange}
                name="gender"
                value={newAccount.gender}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.genderError && (
                <div className="errors">{errors.genderError}*</div>
              )}

              <input
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                name="password"
                value={newAccount.password}
                autoComplete="off"
              />
              {errors.passwordError && (
                <div className="errors">{errors.passwordError}*</div>
              )}
            </div>
            <div className="email-phone-confirm">
              <input
                type="text"
                placeholder="Email"
                onChange={handleInputChange}
                name="email"
                value={newAccount.email}
              />
              {errors.alreadyEmailError && (
                <div className="errors">email Already exist*</div>
              )}
              {errors.emailError && (
                <div className="errors">{errors.emailError}*</div>
              )}

              <input
                type="phone"
                placeholder="Phone Number"
                onChange={handleInputChange}
                name="phone"
                value={newAccount.phone}
              />
              {errors.phoneError && (
                <div className="errors">{errors.phoneError}*</div>
              )}

              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                name="confirmPassword"
                value={newAccount.confirmPassword}
                autoComplete="off"
              />
              {errors.confirmPasswordError && (
                <div className="errors">{errors.confirmPasswordError}*</div>
              )}
            </div>
          </div>
          <div className="register-wrap">
            <Link to="/login">Login</Link>
            <Link id="register" type="submit" onClick={handleSubmit}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
