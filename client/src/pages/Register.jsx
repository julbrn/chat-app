import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/Api";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, []);

  const toastifyOptions = {
    position: "bottom-center",
    autoClose: 5500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const { username, email, password } = values;
    if (username.length < 3) {
      toast.error("Username should consist of at least 3 characters", toastifyOptions);
      return false;
    } else if (!usernameRegex.test(username)) {
      toast.error("Username can only include letters, numbers and underscores", toastifyOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password should consist of at least 5 characters", toastifyOptions);
      return false;
    } else if (email.length === "") {
      toast.error("Please write your email", toastifyOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, { username, email, password });
      if (data.status === false) {
        toast.error(data.msg, toastifyOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>YadaChat</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
          <input type="email" placeholder="E-mail" name="email" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    gap: 2rem;
    background-color: #000;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #208060;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #893528;
        outline: transparent;
      }
    }
    button {
      background-color: #208060;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;
      &:hover {
        background-color: #893528;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #208060;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
