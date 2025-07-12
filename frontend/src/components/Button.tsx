import styled from "styled-components";
import type { ButtonHTMLAttributes } from "react";

const StyledButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ variant }) =>
    variant === "secondary" ? "#fff" : "#4f8cff"};
  color: ${({ variant }) => (variant === "secondary" ? "#4f8cff" : "#fff")};
  border: ${({ variant }) =>
    variant === "secondary" ? "2px solid #4f8cff" : "none"};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ variant }) =>
      variant === "secondary" ? "#f2f6ff" : "#2456c8"};
    color: ${({ variant }) => (variant === "secondary" ? "#2456c8" : "#fff")};
  }
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return <StyledButton variant={variant} {...props} />;
}
