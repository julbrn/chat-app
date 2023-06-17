import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allContactsRoute } from "../utils/Api";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-user")));
    }
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
  }, [currentUser, axios, allContactsRoute, setContacts, navigate]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        <Welcome currentUser={currentUser} />
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
