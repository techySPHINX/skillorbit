import styled from "styled-components";
import type { ReactNode } from "react";

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
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
