
import React, { useEffect, useState } from 'react';
import { viewAdminLogs } from '../api/admin';
import { adminSocketService } from '../services/socketService';

const AdminLogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await viewAdminLogs();
      setLogs(response.logs);
    };
    fetchLogs();

    // Listen for real-time admin log updates
    adminSocketService.on('adminLog', (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    });

    return () => {
      adminSocketService.off('adminLog');
    };
  }, []);

  return (
    <div className="card">
      <h2>Admin Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.admin.username}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogViewer;
