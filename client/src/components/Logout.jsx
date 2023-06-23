import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutIcon from "../assets/logout.png";

function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.removeItem("chat-user");
    navigate("/login");
  };
  return (
    <Button>
      <img src={LogoutIcon} onClick={handleClick} alt="Log out" />
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  object-fit: contain;
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  img {
    height: 28px;
    width: 28px;
  }
  &:hover {
    transform: scale(0.9);
  }
`;

export default Logout;
