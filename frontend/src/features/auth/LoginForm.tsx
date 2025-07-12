import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
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
  const { loading, error } = useAppSelector((state: { auth: any; }) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PageContainer>
      <Card>
        <SectionTitle>Sign In</SectionTitle>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginUser({ email, password }));
          }}
        >
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
