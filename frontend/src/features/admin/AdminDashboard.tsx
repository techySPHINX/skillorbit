import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import UserManagement from "./UserManagement";
import AnalyticsPanel from "./AnalyticsPanel";
import PlatformMessage from "./PlatformMessage";
import AdminLogs from "./AdminLogs";
import PageContainer from "../../components/PageContainer";
import { motion, easeOut } from "framer-motion";
import { FaTachometerAlt } from "react-icons/fa";

const AdminDashboardContent = styled(motion.div)`
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

const AdminGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  return (
    <PageContainer>
      <AdminDashboardContent
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle><FaTachometerAlt /> Admin Dashboard</SectionTitle>
        <AdminGrid
          initial="hidden"
          animate="visible"
          variants={gridVariants}
        >
          <UserManagement />
          <AnalyticsPanel />
          <PlatformMessage />
          <AdminLogs />
        </AdminGrid>
      </AdminDashboardContent>
    </PageContainer>
  );
}
