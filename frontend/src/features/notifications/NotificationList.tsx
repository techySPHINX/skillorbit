import { useNotifications } from "../../hooks/useNotifications";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";

const Section = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

const NotificationCard = styled.div<{ read: boolean }>`
  background: ${({ read }) => (read ? "#f0f4c3" : "#fffde7")};
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1.1rem 1rem;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.07);
`;

type Notification = {
  _id: string;
  isRead: boolean;
  message: string;
  createdAt: string;
};

export default function NotificationList() {
  const { notifications, loading } = useNotifications() as {
    notifications: Notification[];
    loading: boolean;
  };

  return (
    <Section>
      <Container>
        <SectionTitle>Notifications</SectionTitle>
        {loading ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <div>No notifications.</div>
        ) : (
          notifications.map((n) => (
            <NotificationCard key={n._id} read={n.isRead}>
              <div>{n.message}</div>
              <div
                style={{
                  fontSize: "0.92rem",
                  color: "#888",
                  marginTop: "0.3rem",
                }}
              >
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </NotificationCard>
          ))
        )}
      </Container>
    </Section>
  );
}
