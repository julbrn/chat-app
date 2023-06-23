import React from "react";
import styled from "styled-components";

function Welcome({ currentUser, colors }) {
  return (
    <Container colors={colors}>
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
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
  h3 {
    padding-top: 0.5rem;
  }

  span {
    color: ${({ colors }) => colors.lighterMainColor};
  }
`;

export default Welcome;
