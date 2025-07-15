import { useEffect, useState } from "react";
import {
  fetchUserFeedback,
  leaveFeedback,
  type LeaveFeedbackData,
} from "../../api/feedback";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import ErrorAlert from "../../components/ErrorAlert";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

const FeedbackContent = styled(motion.div)`
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

const FeedbackGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const FeedbackCardBase = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  min-height: 180px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background 0.3s ease-in-out;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.white} 0%,
    ${({ theme }) => theme.colors.lightPink} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    background: linear-gradient(
      145deg,
      ${({ theme }) => theme.colors.lightPink} 0%,
      ${({ theme }) => theme.colors.white} 100%
    );
  }
`;

const FeedbackCardStyled = motion(FeedbackCardBase);

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
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FeedbackRating = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
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
  const [isLeaveFeedbackModalOpen, setLeaveFeedbackModalOpen] = useState(false);
  const [formData, setFormData] = useState<LeaveFeedbackData>({
    swap: "",
    toUser: userId,
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchUserFeedback(userId)
      .then((res) => setFeedbacks(res.feedbacks))
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaveFeedback = async () => {
    try {
      const newFeedback = await leaveFeedback(formData);
      setFeedbacks((prev) => [...prev, newFeedback.feedback]);
      setLeaveFeedbackModalOpen(false);
    } catch (error) {
      console.error("Failed to leave feedback", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <PageContainer>
      <FeedbackContent
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle>User Feedback</SectionTitle>
        <Button onClick={() => setLeaveFeedbackModalOpen(true)}>
          Leave Feedback
        </Button>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : feedbacks.length === 0 ? (
          <p>No feedback yet for this user.</p>
        ) : (
          <FeedbackGrid
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {feedbacks.map((fb, index) => (
              <FeedbackCardStyled
                key={fb._id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <FeedbackHeader>
                  <FeedbackUser>
                    <FaUserCircle /> From: {fb.fromUser?.username || "Anonymous"}
                  </FeedbackUser>
                  <FeedbackRating>
                    {fb.rating} <FaStar />
                  </FeedbackRating>
                </FeedbackHeader>
                <FeedbackComment>
                  {fb.comment || "No comment provided."}
                </FeedbackComment>
              </FeedbackCardStyled>
            ))}
          </FeedbackGrid>
        )}
      </FeedbackContent>
      <Modal
        isOpen={isLeaveFeedbackModalOpen}
        onClose={() => setLeaveFeedbackModalOpen(false)}
        title="Leave Feedback"
      >
        <Input
          name="swap"
          value={formData.swap}
          onChange={handleInputChange}
        />
        <Input
          name="rating"
          type="number"
          min={1}
          max={5}
          value={formData.rating}
          onChange={handleInputChange}
        />
        <Textarea
          label="Comment"
          name="comment"
          value={formData.comment || ""}
          onChange={handleInputChange}
        />
        <Button onClick={handleLeaveFeedback}>Submit Feedback</Button>
      </Modal>
    </PageContainer>
  );
}
