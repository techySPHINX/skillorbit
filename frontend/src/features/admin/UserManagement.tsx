import { useEffect, useState } from "react";
import { fetchUsers, banUser, unbanUser } from "../../api/admin";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import ErrorAlert from "../../components/ErrorAlert";
import { motion } from "framer-motion";
import { FaUser, FaBan, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserManagementContainer = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyledTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  th,
  td {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  th {
    background-color: ${({ theme }) => theme.colors.lightPink};
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
    width: 100%;
    overflow-x: auto; /* Enable horizontal scrolling for small screens */
    white-space: nowrap;

    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid ${({ theme }) => theme.colors.lightGray};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }

    td {
      border: none;
      position: relative;
      padding-left: 50%;
      text-align: right;

      &:before {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.darkGray};
      }
    }

    td:nth-of-type(1):before { content: "Username:"; }
    td:nth-of-type(2):before { content: "Email:"; }
    td:nth-of-type(3):before { content: "Status:"; }
    td:nth-of-type(4):before { content: "Action:"; }
  }
`;

const StatusBadge = styled.span<{ banned: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, banned }) =>
    banned ? theme.colors.red : theme.colors.green};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBan = (id: string) => {
    banUser(id)
      .then(() =>
        setUsers((users) =>
          users.map((u) => (u._id === id ? { ...u, banned: true } : u))
        )
      )
      .catch((err) => {
        console.error("Error banning user:", err);
        setError("Failed to ban user.");
      });
  };

  const handleUnban = (id: string) => {
    unbanUser(id)
      .then(() =>
        setUsers((users) =>
          users.map((u) => (u._id === id ? { ...u, banned: false } : u))
        )
      )
      .catch((err) => {
        console.error("Error unbanning user:", err);
        setError("Failed to unban user.");
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <UserManagementContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle>User Management</SectionTitle>
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <StyledTable
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <thead>
            <tr>
              <th><FaUser /> Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr key={user._id} variants={itemVariants}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <StatusBadge banned={user.banned}>
                    {user.banned ? <FaTimesCircle /> : <FaCheckCircle />}
                    {user.banned ? "Banned" : "Active"}
                  </StatusBadge>
                </td>
                <td>
                  {user.banned ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleUnban(user._id)}
                    >
                      <FaCheckCircle /> Unban
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleBan(user._id)}
                    >
                      <FaBan /> Ban
                    </Button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </UserManagementContainer>
  );
}
