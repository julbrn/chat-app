import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../assets/preloader.gif";
import Reload from "../assets/reload-white.svg";
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

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    }
  }, []);

  const setAvatar = () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastifyOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-user"));
      axios
        .post(`${avatarRoute}/${user._id}`, { image: avatars[selectedAvatar] })
        .then(({ data }) => {
          user.isAvatarSet = true;
          user.avatar = avatars[selectedAvatar];
          console.log(user);
          localStorage.setItem("chat-user", JSON.stringify(user));
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error setting avatar. Please try again.", toastifyOptions);
        });
    }
  };

  const generateAvatars = () => {
    setIsLoading(true);
    const promises = [];
    for (let i = 0; i < 4; i++) {
      promises.push(fetch(`${api}?seed=${Math.round(Math.random() * 1000)}`));
    }
    Promise.all(promises).then((responses) => {
      const urls = responses.map((res) => res.url);
      setAvatars(urls);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    });
  };

  useEffect(() => {
    generateAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="wrapper">
            <div className="title-container">
              <h1>Pick your profile picture</h1>
            </div>
            <img src={Loader} alt="loader" className="loader" />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="wrapper">
            <div className="title-container">
              <h1>Pick your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                    <img
                      width="150px"
                      height="150px"
                      src={avatar}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
              <button className="generate-btn" onClick={generateAvatars} type="button">
                <img src={Reload} alt="reload" />
              </button>
            </div>
            <button className="submit-btn" type="button" onClick={setAvatar}>
              SELECT
            </button>
            <ToastContainer />
          </div>
        </Container>
      )}
    </>
  );
}

export default AvatarSettings;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding-top: 35vh;
  }

  .loader {
    width: 6rem;
    height: 8rem;
  }

  .title-container {
    h1 {
      color: white;
      padding-bottom: 2rem;
    }
  }
  .avatars {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 2rem;

    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 5.5rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .generate-btn {
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    background-color: #4e0eff;
    height: 2.3rem;
    width: 2.3rem;
    border: none;
    outline: transparent;
    img {
      height: 1.7rem;
      width: 1.7rem;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
