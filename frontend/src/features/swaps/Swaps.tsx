import { useEffect, useState } from "react";
import {
  createSwap,
  fetchSwaps,
  updateSwapStatus,
  sendSwapMessage,
  addSwapFeedback,
} from "../../api/swap";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaUser,
  FaCodeBranch,
  FaLightbulb,
  FaCommentDots,
  FaStar,
} from "react-icons/fa";
import ErrorAlert from "../../components/ErrorAlert";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { useAuth } from "../../hooks/useAuth";

const SwapsContent = styled.div`
  max-width: 900px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.lg} auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const IntroSection = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.lightPink}
  );

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SwapListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const SwapCard = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.white} 0%,
    ${({ theme }) => theme.colors.lightPink} 100%
  );

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: linear-gradient(
      145deg,
      ${({ theme }) => theme.colors.lightPink} 0%,
      ${({ theme }) => theme.colors.white} 100%
    );
  }
`;

const SwapDetail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  strong {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ theme, status }) =>
    status === "pending"
      ? theme.colors.gray
      : status === "accepted"
      ? theme.colors.green
      : status === "rejected"
      ? theme.colors.red
      : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const MessageContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  max-height: 150px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Swaps() {
  const { user } = useAuth() as { user: { _id: string } | null };
  const [swaps, setSwaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentSwap, setCurrentSwap] = useState<any>(null);
  const [messageContent, setMessageContent] = useState("");
  const [feedbackData, setFeedbackData] = useState({ rating: 5, comment: "" });
  const [formData, setFormData] = useState({
    responder: "",
    skillOffered: "",
    skillWanted: "",
  });

  useEffect(() => {
    fetchSwaps()
      .then((res) => setSwaps(res.swaps))
      .catch((err) => {
        console.error("Error fetching swaps:", err);
        setError("Failed to load swaps. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSwap = async () => {
    try {
      const newSwap = await createSwap(formData);
      setSwaps((prev) => [...prev, newSwap.swap]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create swap", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: any) => {
    try {
      const updatedSwap = await updateSwapStatus(id, status);
      setSwaps((prev) =>
        prev.map((swap) => (swap._id === id ? updatedSwap.swap : swap))
      );
    } catch (error) {
      console.error("Failed to update swap status", error);
    }
  };

  const handleSendMessage = async () => {
    if (!currentSwap || !messageContent.trim()) return;
    try {
      const updatedSwap = await sendSwapMessage(currentSwap._id, messageContent);
      setSwaps((prev) =>
        prev.map((swap) => (swap._id === currentSwap._id ? updatedSwap.swap : swap))
      );
      setMessageContent("");
      setIsMessageModalOpen(false);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleAddFeedback = async () => {
    if (!currentSwap) return;
    try {
      const updatedSwap = await addSwapFeedback(currentSwap._id, feedbackData.rating, feedbackData.comment);
      setSwaps((prev) =>
        prev.map((swap) => (swap._id === currentSwap._id ? updatedSwap.swap : swap))
      );
      setFeedbackData({ rating: 5, comment: "" });
      setIsFeedbackModalOpen(false);
    } catch (error) {
      console.error("Failed to add feedback", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" as const },
    },
  };

  return (
    <PageContainer>
      <SwapsContent>
        <IntroSection
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <SectionTitle>How Skill Swapping Works</SectionTitle>
          <p>
            Skill swapping is a fantastic way to learn new abilities and share
            your expertise with others. Simply offer a skill you possess and
            request a skill you wish to learn. When a match is found, you can
            connect and arrange a swap session. It's a collaborative and
            engaging way to grow your knowledge base!
          </p>
          <Button onClick={() => setCreateModalOpen(true)}>
            Start a New Swap <FaArrowRight />
          </Button>
        </IntroSection>

        <SectionTitle>Your Current Swaps</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : swaps.length === 0 ? (
          <p>You don't have any active swaps yet. Start by exploring skills!</p>
        ) : (
          <SwapListGrid>
            {swaps.map((swap, index) => (
              <SwapCard
                key={swap._id}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <SwapDetail>
                  <strong>Status:</strong>
                  <StatusBadge status={swap.status}>
                    {swap.status === "accepted" && <FaCheckCircle />}
                    {swap.status === "pending" && <FaHourglassHalf />}
                    {swap.status === "rejected" && <FaTimesCircle />}
                    {swap.status}
                  </StatusBadge>
                </SwapDetail>
                <SwapDetail>
                  <FaCodeBranch /> <strong>Offered Skill:</strong>{" "}
                  {swap.skillOffered?.name || "N/A"}
                </SwapDetail>
                <SwapDetail>
                  <FaLightbulb /> <strong>Wanted Skill:</strong>{" "}
                  {swap.skillWanted?.name || "N/A"}
                </SwapDetail>
                <SwapDetail>
                  <FaUser /> <strong>Responder:</strong>{" "}
                  {swap.responder?.username || "N/A"}
                </SwapDetail>
                {swap.messages && swap.messages.length > 0 && (
                  <MessageContainer>
                    <strong>Messages:</strong>
                    {swap.messages.map((msg: any, msgIdx: number) => (
                      <MessageItem key={msgIdx}>
                        <strong>{msg.sender}:</strong> {msg.content}
                        <span> ({new Date(msg.timestamp).toLocaleString()})</span>
                      </MessageItem>
                    ))}
                  </MessageContainer>
                )}
                <div>
                  {user?._id === swap.responder && swap.status === "pending" && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleUpdateStatus(swap._id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateStatus(swap._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCurrentSwap(swap);
                      setIsMessageModalOpen(true);
                    }}
                  >
                    <FaCommentDots /> Message
                  </Button>
                  {swap.status === "completed" && !swap.feedback && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        setCurrentSwap(swap);
                        setIsFeedbackModalOpen(true);
                      }}
                    >
                      <FaStar /> Leave Feedback
                    </Button>
                  )}
                </div>
              </SwapCard>
            ))}
          </SwapListGrid>
        )}
      </SwapsContent>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create a New Swap"
      >
        <label>
          Responder's User ID
          <Input
            name="responder"
            value={formData.responder}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Skill Offered ID
          <Input
            name="skillOffered"
            value={formData.skillOffered}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Skill Wanted ID
          <Input
            name="skillWanted"
            value={formData.skillWanted}
            onChange={handleInputChange}
          />
        </label>
        <Button onClick={handleCreateSwap}>Create Swap</Button>
      </Modal>

      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={`Message Swap with ${currentSwap?.responder?.username || ""}`}
      >
        <Textarea
      placeholder="Type your message here..."
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)} label={""}        />
        <Button onClick={handleSendMessage} disabled={!messageContent.trim()}>
          Send Message
        </Button>
      </Modal>

      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        title={`Leave Feedback for ${currentSwap?.responder?.username || ""}`}
      >
        <label>
          Rating (1-5)
          <Input
            type="number"
            min={1}
            max={5}
            value={feedbackData.rating}
            onChange={(e) => setFeedbackData({ ...feedbackData, rating: parseInt(e.target.value) })}
          />
        </label>
        <Textarea
          label="Comment"
          placeholder="Leave a comment..."
          value={feedbackData.comment}
          onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
        />
        <Button onClick={handleAddFeedback}>
          Submit Feedback
        </Button>
      </Modal>
    </PageContainer>
  );
}
