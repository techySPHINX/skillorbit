import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../api/admin";
import Loader from "../../components/Loader";

export default function AnalyticsPanel() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>Analytics</h3>
      {loading ? (
        <Loader />
      ) : analytics ? (
        <ul style={{ marginTop: "1rem" }}>
          <li>
            <strong>Total Users:</strong> {analytics.userCount}
          </li>
          <li>
            <strong>Total Swaps:</strong> {analytics.swapStats?.total}
          </li>
          <li>
            <strong>Popular Skills:</strong>{" "}
            {analytics.popularSkills?.join(", ")}
          </li>
        </ul>
      ) : (
        <div>No analytics data.</div>
      )}
    </div>
  );
}
