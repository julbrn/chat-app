import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../assets/preloader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { avatarRoute } from "../utils/Api";

function AvatarSettings() {
  const api = "https://api.dicebear.com/6.x/open-peeps/svg";
  const navigate = useNavigate();
  const toastifyOptions = {
    position: "bottom-center",
    autoClose: 5500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const generateAvatars = () => {
    const promises = [];
    for (let i = 0; i < 4; i++) {
      promises.push(fetch(`${api}?seed=${Math.round(Math.random() * 1000)}`));
    }
    Promise.all(promises).then((responses) => {
      const urls = responses.map((res) => res.url);
      setAvatars(urls);
    });
  };

  useEffect(() => {
    generateAvatars();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                <img width="150px" height="150px" src={avatar} alt="avatar" onClick={() => setSelectedAvatar(index)} />
              </div>
            );
          })}
        </div>
        <button type="button" width="150px" height="150px" onClick={generateAvatars}>
          GENERTAE
        </button>
      </Container>
      <ToastContainer />
    </>
  );
}

export default AvatarSettings;

const Container = styled.div``;
