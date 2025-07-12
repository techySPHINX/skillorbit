import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.09);
  text-align: center;
`;

const Title = styled.h2`
  color: #e75480;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export default function NotFound() {
  return (
    <Bg>
      <Container>
        <Title>404 - Page Not Found</Title>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button style={{ marginTop: "1.5rem" }}>
            Go Home
          </Button>
        </Link>
      </Container>
    </Bg>
  );
}
