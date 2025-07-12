import styled from "styled-components";
import type { ReactNode } from "react";

const Title = styled.h2`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return <Title>{children}</Title>;
}
