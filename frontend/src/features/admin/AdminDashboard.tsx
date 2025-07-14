import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import UserManagement from "./UserManagement";
import AnalyticsPanel from "./AnalyticsPanel";
import PlatformMessage from "./PlatformMessage";
import AdminLogs from "./AdminLogs";
import PageContainer from "../../components/PageContainer";

const AdminDashboardContent = styled.div`
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export default function AdminDashboard() {
  return (
    <PageContainer>
      <AdminDashboardContent>
        <SectionTitle>Admin Dashboard</SectionTitle>
        <AdminGrid>
          <UserManagement />
          <AnalyticsPanel />
          <PlatformMessage />
          <AdminLogs />
        </AdminGrid>
      </AdminDashboardContent>
    </PageContainer>
  );
}