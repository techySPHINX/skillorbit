import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSkills, type Skill } from "../api/skill";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { motion } from "framer-motion";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";
import ParallaxContainer from "../components/ParallaxContainer";

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.lightPink} 0%, #f8e8ed 100%);
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGray};
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    animation: pulse 10s infinite alternate;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.1; }
    100% { transform: scale(1.2); opacity: 0.2; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxLarge};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const SkillCard = styled(motion(Card))`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 180px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const SkillImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.lightGray}; /* Placeholder background */
`;

const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SkillDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.gray};
`;

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await fetchSkills();
        setSkills(response.skills);
      } catch (err) {
        setError("Failed to fetch skills. Please try again later.");
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    getSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <>
      <ParallaxContainer imageUrl="https://via.placeholder.com/1920x1080.png/fdf6f9/2d3748?text=SkillOrbit+Background">
        <HeroSection>
          <HeroContent
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <HeroTitle>Unlock Your Potential with SkillOrbit</HeroTitle>
            <HeroSubtitle>
              Connect with a vibrant community to exchange knowledge, learn new skills, and grow together. Your journey to mastery starts here.
            </HeroSubtitle>
            <ButtonGroup>
              <Link to="/skills" style={{ textDecoration: "none" }}>
                <Button>
                  Explore Skills <FaArrowRight />
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="secondary">
                  Join Now <FaUserPlus />
                </Button>
              </Link>
            </ButtonGroup>
          </HeroContent>
        </HeroSection>
      </ParallaxContainer>

      <SkillsSection>
        <SectionTitle>Discover Popular Skills</SectionTitle>
        {loading && <Loader />}
        {error && <ErrorAlert message={error} />}
        {!loading && !error && skills.length === 0 && (
          <p>No skills found. Be the first to add one!</p>
        )}
        {!loading && !error && skills.length > 0 && (
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCard
                key={skill._id}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <SkillImage src={`https://via.placeholder.com/80?text=${skill.name.charAt(0)}`} alt={skill.name} />
                <SkillName>{skill.name}</SkillName>
                <SkillDescription>{skill.description || "No description available."}</SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
        )}
      </SkillsSection>
    </>
  );
}
