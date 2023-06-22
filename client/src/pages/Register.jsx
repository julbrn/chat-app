import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo6.png";
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
    theme: "light",
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
      <StyledContainer></StyledContainer>
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
  background-color: #384254;
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
    background-color: rgba(0, 0, 0, 0.1);
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #b3d87d;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #3a9bc2;
        outline: transparent;
      }
    }
    ::-ms-reveal {
      filter: invert(100%);
    }
    button {
      background-color: #81ba5d;
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
        background-color: #b3d87d;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #81ba5d;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.4s ease-in-out;
        &:hover {
          color: #b3d87d;
        }
      }
    }
  }
`;
const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background-color: #f45d5e;
  }
  .Toastify__close-button {
    filter: invert(100%);
  }
`;

export default Register;
