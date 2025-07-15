import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getSkills, deleteSkill } from "../../store/skillSlice";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import { Button } from "../../components/Button";
import { AddSkillForm } from "./AddSkillForm";
import ErrorAlert from "../../components/ErrorAlert";

const SkillsContent = styled.div`
  max-width: 1200px;
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

const SkillGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const SkillCardStyled = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 250px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.white} 0%, ${({ theme }) => theme.colors.lightPink} 100%);
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    background: linear-gradient(145deg, ${({ theme }) => theme.colors.lightPink} 0%, ${({ theme }) => theme.colors.white} 100%);
  }
`;

const SkillImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 700;
`;

const SkillCategory = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

const SkillDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.5;
  flex-grow: 1;
`;

const AddSkillButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export default function SkillList() {
  const dispatch = useAppDispatch();
  const { skills, loading, error } = useAppSelector((state) => state.skills);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      dispatch(deleteSkill(id));
    }
  };

  return (
    <PageContainer>
      <AddSkillForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SkillsContent>
        <SectionTitle>Available Skills</SectionTitle>
        <AddSkillButton variant="primary" onClick={() => setIsModalOpen(true)}>
          Add New Skill
        </AddSkillButton>
        {error && <ErrorAlert message={error} />}
        {loading ? (
          <Loader />
        ) : (
          <AnimatePresence>
            <SkillGrid
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkillCardStyled>
                    <SkillImage
                      src={skill.image || `https://via.placeholder.com/100/e75480/ffffff?text=${skill.name.charAt(0)}`}
                      alt={skill.name}
                    />
                    <SkillName>{skill.name}</SkillName>
                    <SkillCategory>{skill.category || "Uncategorized"}</SkillCategory>
                    <SkillDescription>{skill.description || "No description available."}</SkillDescription>
                    <Button variant="danger" onClick={() => handleDelete(skill._id)}>
                      Delete
                    </Button>
                  </SkillCardStyled>
                </motion.div>
              ))}
            </SkillGrid>
          </AnimatePresence>
        )}
      </SkillsContent>
    </PageContainer>
  );
}
