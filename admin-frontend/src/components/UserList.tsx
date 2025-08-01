
import React, { useEffect, useState } from 'react';
import { listUsers, banUser, unbanUser } from '../api/admin';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await listUsers();
      setUsers(response.users);
    };
    fetchUsers();
  }, []);

  const handleBan = async (id) => {
    await banUser(id);
    setUsers(users.map(user => user._id === id ? { ...user, isBanned: true } : user));
  };

  const handleUnban = async (id) => {
    await unbanUser(id);
    setUsers(users.map(user => user._id === id ? { ...user, isBanned: false } : user));
  };

  return (
    <div className="card">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Points</th>
            <th>Level</th>
            <th>Badges</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isBanned ? 'Banned' : 'Active'}</td>
              <td>{user.ascendPoints}</td>
              <td>{user.ascendLevel}</td>
              <td>
                {user.badges && user.badges.map((badge: any) => (
                  <span key={badge._id} title={badge.description} style={{ marginRight: '5px' }}>
                    <img src={badge.icon} alt={badge.name} style={{ width: '20px', height: '20px' }} />
                  </span>
                ))}
              </td>
              <td>
                {user.isBanned ? (
                  <button onClick={() => handleUnban(user._id)}>Unban</button>
                ) : (
                  <button onClick={() => handleBan(user._id)}>Ban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
