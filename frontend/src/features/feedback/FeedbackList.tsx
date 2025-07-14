import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import ErrorAlert from "../../components/ErrorAlert";

const FeedbackContent = styled.div`
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

const FeedbackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const FeedbackCardStyled = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  min-height: 180px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.white} 0%, ${({ theme }) => theme.colors.lightPink} 100%);
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    background: linear-gradient(145deg, ${({ theme }) => theme.colors.lightPink} 0%, ${({ theme }) => theme.colors.white} 100%);
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeedbackUser = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const FeedbackRating = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const FeedbackComment = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.5;
  flex-grow: 1;
`;

export default function FeedbackList({ userId }: { userId: string }) {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`/feedback/user/${userId}`)
      .then((res) => setFeedbacks(res.data.feedbacks))
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <PageContainer>
      <FeedbackContent>
        <SectionTitle>User Feedback</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : feedbacks.length === 0 ? (
          <p>No feedback yet for this user.</p>
        ) : (
          <FeedbackGrid>
            {feedbacks.map((fb) => (
              <FeedbackCardStyled key={fb._id}>
                <FeedbackHeader>
                  <FeedbackUser>From: {fb.fromUser?.username || "Anonymous"}</FeedbackUser>
                  <FeedbackRating>{fb.rating} / 5</FeedbackRating>
                </FeedbackHeader>
                <FeedbackComment>{fb.comment || "No comment provided."}</FeedbackComment>
              </FeedbackCardStyled>
            ))}
          </FeedbackGrid>
        )}
      </FeedbackContent>
    </PageContainer>
  );
}