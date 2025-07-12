import styled from "styled-components";
import type { ReactNode } from "react";

const StyledCard = styled.div`
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(60, 72, 88, 0.1);
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

type CardProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

export default function Card({ children, style }: CardProps) {
  return <StyledCard style={style}>{children}</StyledCard>;
}
