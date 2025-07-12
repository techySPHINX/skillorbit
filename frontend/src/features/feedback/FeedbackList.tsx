import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";

const Section = styled.section`
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(60, 72, 88, 0.1);
  padding: 2rem 2.5rem;
`;

const FeedbackCard = styled.div`
  background: #fff3e0;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1.1rem 1rem;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.07);
`;

export default function FeedbackList({ userId }: { userId: string }) {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/feedback/user/${userId}`)
      .then((res) => setFeedbacks(res.data.feedbacks))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <Section>
      <Container>
        <SectionTitle>User Feedback</SectionTitle>
        {loading ? (
          <Loader />
        ) : feedbacks.length === 0 ? (
          <div>No feedback yet.</div>
        ) : (
          feedbacks.map((fb) => (
            <FeedbackCard key={fb._id}>
              <div>
                <strong>From:</strong> {fb.fromUser?.username}
              </div>
              <div>
                <strong>Rating:</strong> {fb.rating} / 5
              </div>
              <div style={{ marginTop: "0.5rem" }}>{fb.comment}</div>
            </FeedbackCard>
          ))
        )}
      </Container>
    </Section>
  );
}
