import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../assets/camera.png";
import styled from "styled-components";
import Logo from "../assets/logo6.png";

function Contacts({ contacts, currentUser, changeChat, colors }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      setCurrentUserAvatar(currentUser.avatar);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  function changeCurrentSelectedChat(index, contact) {
    setCurrentSelectedChat(index);
    changeChat(contact);
  }

  function onEditAvatar() {
    navigate("/avatar");
  }

  return (
    <>
      {currentUserAvatar && currentUserName && (
        <Container colors={colors}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Yada-Chat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelectedChat ? "selected" : ""}`}
                  onClick={() => changeCurrentSelectedChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.avatar} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserAvatar} alt="avatar" />
              <button onClick={onEditAvatar} className="avatar-button" aria-label="Edit avatar" type="button" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #384254;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: ${({ colors }) => colors.semiTransparent};
    }
  }

  .current-user {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    .avatar {
      border-radius: 50%;
      position: relative;
      height: 4rem;
      width: 4rem;
      .avatar-button {
        background-image: url(${Camera});
        background-color: ${({ colors }) => colors.semiTransparent};
        background-repeat: no-repeat;
        background-size: 3rem;
        background-position: center;
        position: absolute;
        height: 4.7rem;
        width: 4.7rem;
        top: 0;
        left: -5px;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
        border-radius: 50%;
        opacity: 0;
        z-index: 2;
        &:hover {
          opacity: 1;
          cursor: pointer;
          transition: opacity 0.7s linear;
        }
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
