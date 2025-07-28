import { useNotifications } from "../../hooks/useNotifications";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import ErrorAlert from "../../components/ErrorAlert";
import { motion, easeOut } from "framer-motion";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import Button from "../../components/Button";
import { markNotificationRead } from "../../api/notification";

const NotificationsContent = styled(motion.div)`
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

const NotificationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const MotionCard = motion(Card);

const NotificationCardStyled = styled(MotionCard)<{ read: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  min-height: 100px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background 0.3s ease-in-out;
  background: ${({ theme, read }) =>
    read
      ? `linear-gradient(145deg, ${theme.colors.white} 0%, ${theme.colors.lightGray} 100%)`
      : `linear-gradient(145deg, ${theme.colors.white} 0%, ${theme.colors.lightPink} 100%)`};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    background: ${({ theme, read }) =>
      read
        ? `linear-gradient(145deg, ${theme.colors.lightGray} 0%, ${theme.colors.white} 100%)`
        : `linear-gradient(145deg, ${theme.colors.lightPink} 0%, ${theme.colors.white} 100%)`};
  }
`;

const NotificationMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.5;
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const NotificationTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.gray};
  text-align: right;
`;

type Notification = {
  _id: string;
  isRead: boolean;
  message: string;
  createdAt: string;
};

export default function NotificationList() {
  const { notifications, setNotifications, loading, error } = useNotifications() as {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    loading: boolean;
    error?: string;
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const { notification } = await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? notification : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return (
    <PageContainer>
      <NotificationsContent
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle>Notifications</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error as string} />
        ) : notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <NotificationGrid
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {notifications.map((n: Notification, index: number) => (
              <NotificationCardStyled
                key={n._id}
                read={n.isRead}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <NotificationMessage>
                  {n.isRead ? (
                    <FaCheckCircle color="green" />
                  ) : (
                    <FaBell color="#e75480" />
                  )}
                  {n.message}
                </NotificationMessage>
                <NotificationTimestamp>
                  {new Date(n.createdAt).toLocaleString()}
                </NotificationTimestamp>
                {!n.isRead && (
                  <Button onClick={() => handleMarkAsRead(n._id)}>
                    Mark as Read
                  </Button>
                )}
              </NotificationCardStyled>
            ))}
          </NotificationGrid>
        )}
      </NotificationsContent>
    </PageContainer>
  );
}
