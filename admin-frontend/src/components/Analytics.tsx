
import React, { useEffect, useState } from 'react';
import { getAnalyticsReport } from '../api/admin';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await getAnalyticsReport();
      setAnalytics(response.report);
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h2>Analytics</h2>
      <div>
        <p>Total Users: {analytics.totalUsers}</p>
        <p>Total Swaps: {analytics.totalSwaps}</p>
        <p>Active Swaps: {analytics.activeSwaps}</p>
        <p>Completed Swaps: {analytics.completedSwaps}</p>
      </div>
    </div>
  );
};

export default Analytics;
