import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import UserManagement from "./UserManagement";
import AnalyticsPanel from "./AnalyticsPanel";
import PlatformMessage from "./PlatformMessage";
import AdminLogs from "./AdminLogs";

const Section = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.09);
  padding: 2rem 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: 2rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export default function AdminDashboard() {
  return (
    <Section>
      <Container>
        <SectionTitle>Admin Dashboard</SectionTitle>
        <Grid>
          <UserManagement />
          <AnalyticsPanel />
        </Grid>
        <Grid>
          <PlatformMessage />
          <AdminLogs />
        </Grid>
      </Container>
    </Section>
  );
}
