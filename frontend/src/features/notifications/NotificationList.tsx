import { useNotifications } from "../../hooks/useNotifications";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import ErrorAlert from "../../components/ErrorAlert";

const NotificationsContent = styled.div`
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

const NotificationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const NotificationCardStyled = styled(Card)<{ read: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  min-height: 100px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
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
  const { notifications, loading, error } = useNotifications() as {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
  };

  return (
    <PageContainer>
      <NotificationsContent>
        <SectionTitle>Notifications</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <NotificationGrid>
            {notifications.map((n) => (
              <NotificationCardStyled key={n._id} read={n.isRead}>
                <NotificationMessage>{n.message}</NotificationMessage>
                <NotificationTimestamp>
                  {new Date(n.createdAt).toLocaleString()}
                </NotificationTimestamp>
              </NotificationCardStyled>
            ))}
          </NotificationGrid>
        )}
      </NotificationsContent>
    </PageContainer>
  );
}
