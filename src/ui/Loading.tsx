import styled, { keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

const LoaderDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ff4d4d;
  border-radius: 50%;
  margin: 0 5px;
  animation: ${bounceAnimation} 0.5s ease-in-out infinite alternate;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loading = () => {
  return (
    <LoaderContainer>
      <LoaderDot />
      <LoaderDot />
      <LoaderDot />
    </LoaderContainer>
  );
};

export default Loading;
