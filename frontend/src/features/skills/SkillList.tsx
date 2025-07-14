import { useSkills } from "../../hooks/useSkills";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";

const SkillsContent = styled.div`
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white}; /* Solid background for the content area */
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.lg}; /* Add padding to the grid itself */

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
  min-height: 250px; /* Increased min-height for more content space */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.white} 0%, ${({ theme }) => theme.colors.lightPink} 100%);
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-8px); /* More pronounced lift effect */
    box-shadow: ${({ theme }) => theme.shadows.lg}; /* Stronger shadow on hover */
    background: linear-gradient(145deg, ${({ theme }) => theme.colors.lightPink} 0%, ${({ theme }) => theme.colors.white} 100%); /* Inverted gradient on hover */
  }
`;

const SkillImage = styled.img`
  width: 100px; /* Slightly larger image */
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full}; /* Circular image */
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 3px solid ${({ theme }) => theme.colors.primary}; /* Primary color border */
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
  font-weight: 600; /* Make category slightly bolder */
`;

const SkillDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.5;
  flex-grow: 1; /* Allow description to take available space */
`;

export default function SkillList() {
  const { skills, loading } = useSkills();

  return (
    <PageContainer>
      <SkillsContent>
        <SectionTitle>Available Skills</SectionTitle>
        {loading ? (
          <Loader />
        ) : skills.length === 0 ? (
          <p>No skills found. Be the first to add one!</p>
        ) : (
          <SkillGrid>
            {skills.map((skill: any) => (
              <SkillCardStyled key={skill._id}>
                <SkillImage src={`https://via.placeholder.com/100/e75480/ffffff?text=${skill.name.charAt(0)}`} alt={skill.name} />
                <SkillName>{skill.name}</SkillName>
                <SkillCategory>{skill.category || "Uncategorized"}</SkillCategory>
                <SkillDescription>{skill.description || "No description available."}</SkillDescription>
              </SkillCardStyled>
            ))}
          </SkillGrid>
        )}
      </SkillsContent>
    </PageContainer>
  );
}
