import { useEffect, useState } from "react";
import { fetchAdminLogs } from "../../api/admin";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import ErrorAlert from "../../components/ErrorAlert";
import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import { easeOut } from "framer-motion";


const AdminLogsContainer = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  max-height: 300px; /* Increased height for more logs */
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.lightPink};
`;

const LogItem = styled(motion.li)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};

  &:last-child {
    border-bottom: none;
  }

  span {
    color: ${({ theme }) => theme.colors.gray};
    font-size: ${({ theme }) => theme.fontSizes.small};
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminLogs()
      .then((res) => setLogs(res))
      .catch((err) => {
        console.error("Error fetching admin logs:", err);
        setError("Failed to load admin logs. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);


  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return (
    <AdminLogsContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle><FaClipboardList /> Admin Logs</SectionTitle>
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <Loader />
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <LogList
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {logs.map((log, idx) => (
            <LogItem key={idx} variants={itemVariants}>
              {log.message}
              <span>({new Date(log.timestamp).toLocaleString()})</span>
            </LogItem>
          ))}
        </LogList>
      )}
    </AdminLogsContainer>
  );
}
