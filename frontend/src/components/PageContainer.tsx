import styled from "styled-components";
import type { ReactNode } from "react";

const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.lightPink} 0%, #f8e8ed 100%);
  color: ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <Bg>{children}</Bg>;
}
