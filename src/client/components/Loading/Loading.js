import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #ededed;
  margin-top: -10px;
`;

const LoadingAnimation = styled.span`
  width: 35px;
  height: 35px;
  display: inline-block;
  border: 5px solid rgba(101, 131, 97, 0.25);
  border-left-color: rgba(101, 131, 97, 1);
  border-top-color: rgba(101, 131, 979, 1);
  border-radius: 50%;
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
  animation: rotate 1000ms infinite linear;
`;

const Loading = () => (
  <LoadingWrapper>
    <LoadingAnimation />
  </LoadingWrapper>
);

export default Loading;
