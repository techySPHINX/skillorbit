import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const SwapsContent = styled.div`
  max-width: 900px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.lg} auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const IntroSection = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.lightPink});

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SwapListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const SwapCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const SwapDetail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};

  strong {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ theme, status }) =>
    status === "pending" ? theme.colors.gray : status === "accepted" ? theme.colors.green : theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
`;

export default function Swaps() {
  const [swaps, setSwaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/swaps")
      .then((res) => setSwaps(res.data.swaps))
      .catch((err) => {
        console.error("Error fetching swaps:", err);
        setError("Failed to load swaps. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer>
      <SwapsContent>
        <IntroSection>
          <SectionTitle>How Skill Swapping Works</SectionTitle>
          <p>
            Skill swapping is a fantastic way to learn new abilities and share your expertise with others. 
            Simply offer a skill you possess and request a skill you wish to learn. 
            When a match is found, you can connect and arrange a swap session. 
            It's a collaborative and engaging way to grow your knowledge base!
          </p>
          <Link to="/skills" style={{ textDecoration: "none" }}>
            <Button>Start a New Swap</Button>
          </Link>
        </IntroSection>

        <SectionTitle>Your Current Swaps</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : swaps.length === 0 ? (
          <p>You don't have any active swaps yet. Start by exploring skills!</p>
        ) : (
          <SwapListGrid>
            {swaps.map((swap) => (
              <SwapCard key={swap._id}>
                <SwapDetail>
                  <strong>Status:</strong> <StatusBadge status={swap.status}>{swap.status}</StatusBadge>
                </SwapDetail>
                <SwapDetail>
                  <strong>Offered Skill:</strong> {swap.skillOffered?.name || "N/A"}
                </SwapDetail>
                <SwapDetail>
                  <strong>Wanted Skill:</strong> {swap.skillWanted?.name || "N/A"}
                </SwapDetail>
                <SwapDetail>
                  <strong>Responder:</strong> {swap.responder?.username || "N/A"}
                </SwapDetail>
                {/* Add more details as needed, e.g., dates, messages */}
              </SwapCard>
            ))}
          </SwapListGrid>
        )}
      </SwapsContent>
    </PageContainer>
  );
}