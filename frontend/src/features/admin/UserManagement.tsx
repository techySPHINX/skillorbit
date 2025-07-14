import { useEffect, useState } from "react";
import { fetchUsers, banUser, unbanUser } from "../../api/admin";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((users) => setUsers(users))
      .finally(() => setLoading(false));
  }, []);

  const handleBan = (id: string) => {
    banUser(id).then(() =>
      setUsers((users) =>
        users.map((u) => (u._id === id ? { ...u, banned: true } : u))
      )
    );
  };

  const handleUnban = (id: string) => {
    unbanUser(id).then(() =>
      setUsers((users) =>
        users.map((u) => (u._id === id ? { ...u, banned: false } : u))
      )
    );
  };

  return (
    <div>
      <h3>User Management</h3>
      {loading ? (
        <Loader />
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ background: "#f2f6ff" }}>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ban/Unban</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.banned ? "Banned" : "Active"}</td>
                <td>
                  {user.banned ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleUnban(user._id)}
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button onClick={() => handleBan(user._id)}>Ban</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
