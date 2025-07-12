import styled from "styled-components";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hero = styled.div`
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.1);
  text-align: center;
  max-width: 480px;
`;

const Title = styled.h1`
  color: #4f8cff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #2d3748;
  font-size: 1.15rem;
  margin-bottom: 2rem;
`;

export default function Home() {
  return (
    <Bg>
      <Hero>
        <Title>SkillOrbit</Title>
        <Subtitle>
          Exchange skills, grow your network, and learn together.
          <br />
          Join the skill barter revolution today!
        </Subtitle>
        <Link to="/register" style={{ marginRight: "1rem", textDecoration: "none" }}>
          <Button>
            Get Started
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="secondary">
            Sign In
          </Button>
        </Link>
      </Hero>
    </Bg>
  );
}
