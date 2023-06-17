import React from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src="" alt="" />
      <h1>
        Welcome, <span>{}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
