import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";

const Section = styled.section`
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.09);
  padding: 2.5rem 2rem;
  text-align: center;
`;

const Info = styled.div`
  color: #607d8b;
  margin-bottom: 0.7rem;
`;

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data.user))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Section>
        <Loader />
      </Section>
    );
  if (!user) return <Section>User not found.</Section>;

  return (
    <Section>
      <Container>
        <Avatar src={user.profilePhoto} alt={user.username} size={96} />
        <SectionTitle>{user.username}</SectionTitle>
        <Info>Email: {user.email}</Info>
        <Info>Location: {user.location || "N/A"}</Info>
        <Info>Skills Offered: {user.skillsOffered?.join(", ") || "N/A"}</Info>
        <Info>Skills Wanted: {user.skillsWanted?.join(", ") || "N/A"}</Info>
        <Info>Availability: {user.availability || "N/A"}</Info>
      </Container>
    </Section>
  );
}
