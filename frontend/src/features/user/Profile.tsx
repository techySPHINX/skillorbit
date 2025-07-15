import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button";
import { motion, easeOut } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import ErrorAlert from "../../components/ErrorAlert";

const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  width: 100%;
`;

const ProfileAvatarWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 4px;
  display: inline-block;
`;

const ProfileInfoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const InfoItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lightPink};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  strong {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  span {
    color: ${({ theme }) => theme.colors.gray};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const EditButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  if (loading)
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  if (error)
    return (
      <PageContainer>
        <ErrorAlert message={error} />
      </PageContainer>
    );
  if (!user) return <PageContainer>User not found.</PageContainer>;

  return (
    <PageContainer>
      <ProfileContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ProfileHeader>
          <ProfileAvatarWrapper>
            <Avatar src={user.profilePhoto || `https://via.placeholder.com/96/e75480/ffffff?text=${user.username.charAt(0)}`} alt={user.username} size={96} />
          </ProfileAvatarWrapper>
          <SectionTitle>{user.username}</SectionTitle>
        </ProfileHeader>

        <ProfileInfoGrid
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <InfoItem variants={itemVariants}>
            <strong>Email</strong>
            <span>{user.email}</span>
          </InfoItem>
          <InfoItem variants={itemVariants}>
            <strong>Location</strong>
            <span>{user.location || "N/A"}</span>
          </InfoItem>
          <InfoItem variants={itemVariants}>
            <strong>Skills Offered</strong>
            <span>{user.skillsOffered?.join(", ") || "N/A"}</span>
          </InfoItem>
          <InfoItem variants={itemVariants}>
            <strong>Skills Wanted</strong>
            <span>{user.skillsWanted?.join(", ") || "N/A"}</span>
          </InfoItem>
          <InfoItem variants={itemVariants}>
            <strong>Availability</strong>
            <span>{user.availability || "N/A"}</span>
          </InfoItem>
        </ProfileInfoGrid>

        <EditButtonContainer>
          <Button variant="primary" onClick={() => alert("Edit Profile functionality coming soon!")}>
            <FaEdit /> Edit Profile
          </Button>
        </EditButtonContainer>
      </ProfileContainer>
    </PageContainer>
  );
}
