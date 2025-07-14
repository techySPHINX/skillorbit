import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxLarge};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default function NotFound() {
  return (
    <PageContainer>
      <Container>
        <Title>404 - Page Not Found</Title>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button style={{ marginTop: "1.5rem" }}>
            Go Home
          </Button>
        </Link>
      </Container>
    </PageContainer>
  );
}

