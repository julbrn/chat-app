import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import Smile from "../assets/emoji.svg";
import SendIcon from "../assets/send.png";

function ChatInput({ handleSendMessage, colors }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const emojiContainer = document.querySelector(".emoji");

  if (showEmojiPicker === true) {
    document.addEventListener("click", handleCloseEmoji);
  }

  function handleCloseEmoji(e) {
    if (!emojiContainer.contains(e.target)) {
      setShowEmojiPicker(false);
      document.removeEventListener("click", handleCloseEmoji);
    }
  }

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <Container colors={colors}>
      <div className="button-container">
        <div className="emoji">
          <button className="emoji-button" onClick={handleEmojiPickerhideShow}>
            <img className="emoji-button-image" src={Smile} alt="Choose an emoji" />
          </button>
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emojiObject) => setMsg((prevMsg) => prevMsg + emojiObject.emoji)}
              searchDisabled={true}
              lazyLoadEmojis={false}
              theme="dark"
              skinTonesDisabled="true"
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input type="text" placeholder="type your message here" onChange={(e) => setMsg(e.target.value)} value={msg} />
        <button type="submit" className="send-button">
          {" "}
          <img className="send-button-image" src={SendIcon} alt="Send a message" />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #ffffff34;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      .emoji-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        object-fit: contain;
        width: 20px;
        height: 20px;
        .emoji-button-image {
          filter: invert(80%);
          width: 30px;
          height: 30px;
          transition: all 0.4s ease-in-out;
          &:hover {
            filter: invert(100%);
          }
        }
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 0;
        left: 40px;
        background-color: #080420;
        border-color: ${({ colors }) => colors.darkerMainColor};
        ::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: ${({ colors }) => colors.lighterMainColor};
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 70%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      line-height: 2;
      padding-bottom: 5px;

      &::selection {
        background-color: ${({ colors }) => colors.darkerMainColor};
      }
      &:focus {
        outline: none;
      }
    }
    .send-button-image {
      height: 24px;
      width: 24px;
    }
    button {
      cursor: pointer;
      padding: 8px 30px;
      object-fit: contain;
      object-position: center;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ colors }) => colors.darkerMainColor};
      border: none;
      transition: all 0.5s ease-in-out;
      &:hover {
        background-color: ${({ colors }) => colors.lighterMainColor};
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
