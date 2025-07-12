import styled from "styled-components";
import type { InputHTMLAttributes } from "react";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: #fafbfc;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f8cff;
    outline: none;
    background: #fff;
  }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
