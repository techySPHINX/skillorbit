import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";

const Section = styled.section`
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
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

const SwapList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SwapItem = styled.li`
  background: #e0f2f1;
  border-radius: 12px;
  margin-bottom: 1.1rem;
  padding: 1.2rem 1rem;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.07);
`;

export default function Swaps() {
  const [swaps, setSwaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/swaps")
      .then((res) => setSwaps(res.data.swaps))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section>
      <Container>
        <SectionTitle>Your Swaps</SectionTitle>
        {loading ? (
          <Loader />
        ) : swaps.length === 0 ? (
          <div>No swaps found.</div>
        ) : (
          <SwapList>
            {swaps.map((swap) => (
              <SwapItem key={swap._id}>
                <strong>Status:</strong> {swap.status} <br />
                <strong>Offered:</strong> {swap.skillOffered?.name} <br />
                <strong>Wanted:</strong> {swap.skillWanted?.name} <br />
                <strong>Responder:</strong> {swap.responder?.username}
              </SwapItem>
            ))}
          </SwapList>
        )}
      </Container>
    </Section>
  );
}
