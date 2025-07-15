import { useState } from "react";
import { sendPlatformMessage } from "../../api/admin";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const PlatformMessageContainer = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(${({ theme }) => theme.colors.primary}, 0.2);
  }
`;

const StyledFileInput = styled.input`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::file-selector-button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    cursor: pointer;
    margin-right: ${({ theme }) => theme.spacing.md};
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #c2185b; /* A slightly darker pink for hover */
    }
  }
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.green};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  text-align: center;
`;

export default function PlatformMessage() {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
    asset: undefined as File | undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    sendPlatformMessage(form)
      .then(() => {
        setSuccess("Message sent!");
        setForm({ to: "", subject: "", message: "", asset: undefined }); // Clear form on success
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to send.")
      )
      .finally(() => setLoading(false));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }, // use framer-motion keyword
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.2 } }, // use framer-motion keyword
  };

  return (
    <PlatformMessageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle>Platform Message</SectionTitle>
      {error && <ErrorAlert message={error} />}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <StyledForm onSubmit={handleSubmit} variants={formVariants}>
        <Input
          type="email"
          placeholder="Recipient Email (e.g., all@platform.com)"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <StyledTextArea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <StyledFileInput
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, asset: e.target.files?.[0] })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : <>Send Message <FaPaperPlane /></>}
        </Button>
      </StyledForm>
    </PlatformMessageContainer>
  );
}
