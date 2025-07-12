import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { registerUser } from "../../store/authSlice";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import SectionTitle from "../../components/SectionTitle";

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

  return (
    <PageContainer>
      <Card>
        <SectionTitle>Create Account</SectionTitle>
        {error && <ErrorAlert>{error}</ErrorAlert>}
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
            {loading ? <Loader /> : "Register"}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
