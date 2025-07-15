import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { motion, easeOut } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { registerUser } from "../../store/authSlice";
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

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: any) => state.auth);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (registered) {
      navigate("/login");
    }
  }, [registered, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(resultAction)) {
      setRegistered(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <PageContainer>
      <AuthContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AuthImage style={{ backgroundImage: `url('https://via.placeholder.com/450x500/e75480/ffffff?text=Join+Us')` }} />
        <AuthFormWrapper>
          <SectionTitle>Create Account</SectionTitle>
          {error && <ErrorAlert message={error} />}
          <form onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : <>Register <FaUserPlus /></>}
            </Button>
          </form>
          <StyledLink to="/login">Already have an account? Sign in here.</StyledLink>
        </AuthFormWrapper>
      </AuthContainer>
    </PageContainer>
  );
}
