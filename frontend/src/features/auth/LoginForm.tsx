import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { loginUser } from "../../store/authSlice";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import SectionTitle from "../../components/SectionTitle";

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

  return (
    <PageContainer>
      <Card>
        <SectionTitle>Sign In</SectionTitle>
        {error && <ErrorAlert>{error}</ErrorAlert>}
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
            {loading ? <Loader /> : "Sign In"}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
