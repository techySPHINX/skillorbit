import styled, { keyframes } from "styled-components";

const spin = keyframes`
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 4px solid #e3e3e3;
  border-top: 4px solid #4f8cff;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default function Loader() {
  return <Spinner aria-label="Loading..." />;
}
