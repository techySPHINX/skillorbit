
import React from 'react';
import UserList from '../components/UserList';
import Analytics from '../components/Analytics';
import MessageForm from '../components/MessageForm';
import AdminLogViewer from '../components/AdminLogViewer';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Analytics />
      <MessageForm />
      <AdminLogViewer />
      <UserList />
    </div>
  );
};

export default AdminDashboard;
