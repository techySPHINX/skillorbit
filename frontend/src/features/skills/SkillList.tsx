import { useSkills } from "../../hooks/useSkills";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";

const Section = styled.section`
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.09);
  padding: 2rem 2.5rem;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
`;

const SkillCard = styled.div`
  background: #f6f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  padding: 1.5rem 1rem;
  text-align: center;
`;

export default function SkillList() {
  const { skills, loading } = useSkills();

  return (
    <Section>
      <Container>
        <SectionTitle>Available Skills</SectionTitle>
        {loading ? (
          <Loader />
        ) : (
          <SkillGrid>
            {skills.map((skill: any) => (
              <SkillCard key={skill._id}>
                <h4>{skill.name}</h4>
                <div style={{ color: "#607d8b", marginTop: "0.5rem" }}>
                  {skill.category}
                </div>
                <p
                  style={{
                    marginTop: "0.7rem",
                    color: "#333",
                    fontSize: "0.97rem",
                  }}
                >
                  {skill.description}
                </p>
              </SkillCard>
            ))}
          </SkillGrid>
        )}
      </Container>
    </Section>
  );
}
