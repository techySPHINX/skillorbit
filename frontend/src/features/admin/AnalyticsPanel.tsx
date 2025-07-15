import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../api/admin";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import ErrorAlert from "../../components/ErrorAlert";
import { motion } from "framer-motion";
import { FaUsers, FaExchangeAlt, FaCheckCircle, FaHourglassHalf, FaStar } from "react-icons/fa";

const AnalyticsPanelContainer = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AnalyticsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const AnalyticItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lightPink};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  strong {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.large};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export default function AnalyticsPanel() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res.data))
      .catch((err) => {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <AnalyticsPanelContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle>Analytics</SectionTitle>
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <Loader />
      ) : analytics ? (
        <AnalyticsGrid
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnalyticItem variants={itemVariants}>
            <strong><FaUsers /> {analytics.userCount || 0}</strong>
            <span>Total Users</span>
          </AnalyticItem>
          <AnalyticItem variants={itemVariants}>
            <strong><FaExchangeAlt /> {analytics.swapStats?.total || 0}</strong>
            <span>Total Swaps</span>
          </AnalyticItem>
          <AnalyticItem variants={itemVariants}>
            <strong><FaCheckCircle /> {analytics.swapStats?.completed || 0}</strong>
            <span>Completed Swaps</span>
          </AnalyticItem>
          <AnalyticItem variants={itemVariants}>
            <strong><FaHourglassHalf /> {analytics.swapStats?.pending || 0}</strong>
            <span>Pending Swaps</span>
          </AnalyticItem>
          <AnalyticItem variants={itemVariants}>
            <strong><FaStar /> {analytics.popularSkills?.length || 0}</strong>
            <span>Popular Skills</span>
            {analytics.popularSkills && analytics.popularSkills.length > 0 && (
              <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
                {analytics.popularSkills.join(", ")}
              </p>
            )}
          </AnalyticItem>
        </AnalyticsGrid>
      ) : (
        <p>No analytics data available.</p>
      )}
    </AnalyticsPanelContainer>
  );
}
