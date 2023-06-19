import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import Smile from "../assets/emoji.svg";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = message;
    message += emojiObject.emoji;
    setMessage(message);
  };

  const sendChat = () => {};
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <button className="emoji-button" onClick={handleEmojiPickerhideShow}>
            <img className="emoji-button-image" src={Smile} alt="Choose an emoji" />
          </button>
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              searchDisabled={true}
              emojiStyle="apple"
              lazyLoadEmojis={false}
              theme="dark"
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">SEND</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
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
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
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
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        ::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
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
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
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
