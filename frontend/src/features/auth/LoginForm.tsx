import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { loginUser } from "../../store/authSlice";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import SectionTitle from "../../components/SectionTitle";

const AuthContainer = styled(motion.div)`
  display: flex;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  max-width: 900px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    max-width: 420px;
  }
`;

const AuthImage = styled.div`
  flex: 1;
  background-size: cover;
  min-height: 300px; /* Ensure image is visible on small screens */
  background-position: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 500px; /* Adjust height for larger screens */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none; /* Hide image on smaller screens if preferred */
  }
`;

const AuthFormWrapper = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.lg};
  }

  button {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state: any) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <PageContainer>
      <AuthContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AuthImage style={{ backgroundImage: `url('https://via.placeholder.com/450x500/e75480/ffffff?text=Welcome+Back')` }} />
        <AuthFormWrapper>
          <SectionTitle>Sign In</SectionTitle>
          {error && <ErrorAlert message={error} />}
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : <>Sign In <FaSignInAlt /></>}
            </Button>
          </form>
          <StyledLink to="/register">Don't have an account? Register here.</StyledLink>
        </AuthFormWrapper>
      </AuthContainer>
    </PageContainer>
  );
}
