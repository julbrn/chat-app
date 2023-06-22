import React from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  return (
    <Container>
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
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
  padding-inline: 14px;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #b3d87d;
  }
`;

export default Welcome;
