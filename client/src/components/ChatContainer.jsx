import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute } from "../utils/Api";
import { recieveMessagesRoute } from "../utils/Api";
import { v4 as uuidv4 } from "uuid";
import { ColorContext } from "../colorContext";
import { greenColors, yellowColors } from "../utils/colors";

function ChatContainer({ currentChat, currentUser, socket }) {
  const colorScheme = useContext(ColorContext);
  const colors = colorScheme === "green" ? greenColors : yellowColors;
  const [messages, setMessages] = useState([]);
  const [recievedMessage, setRecievedMessage] = useState(null);
  let scrollRef = useRef();
  useEffect(() => {
    async function fetchMessages() {
      if (currentChat) {
        try {
          const response = await axios.post(recieveMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchMessages();
  }, [currentChat]);
  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setRecievedMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    recievedMessage && setMessages((prev) => [...prev, recievedMessage]);
  }, [recievedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const formatTime = (time) => {
    if (time) {
      return time.substring(11, 16);
    } else {
      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();
      return `${hours}:${minutes}`;
    }
  };

  return (
    <Container colors={colors}>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatar} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.fromSelf ? "sent" : "recieved"}`}>
                <div className="content">
                  <p>{message.message}</p>
                  <span>{formatTime(message.time)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput colors={colors} handleSendMessage={handleSendMessage} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        min-width: 84px;
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem 1rem 0.5rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #fff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
      span {
        padding-top: 0.5rem;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 300;
        float: right;
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: ${({ colors }) => colors.darkerMainColor};
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: ${({ colors }) => colors.accent};
      }
    }
  }
`;

export default ChatContainer;
