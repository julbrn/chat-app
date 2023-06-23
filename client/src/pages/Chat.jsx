import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allContactsRoute } from "../utils/Api";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { host } from "../utils/Api";
import { io } from "socket.io-client";
import { ColorContext } from "../colorContext";
import { greenColors, yellowColors } from "../utils/colors";

function Chat({ setColorScheme }) {
  const colorScheme = useContext(ColorContext);
  const colors = colorScheme === "green" ? greenColors : yellowColors;
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-user")));
  }, []);

  const fetchContacts = useCallback(async () => {
    if (currentUser) {
      if (currentUser.isAvatarSet) {
        const data = await axios.get(`${allContactsRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/avatar");
      }
    }
  }, [currentUser, allContactsRoute, setContacts]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          colors={colors}
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome colors={colors} currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #384254;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
