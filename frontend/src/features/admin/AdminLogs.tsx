import { useEffect, useState } from "react";
import { fetchAdminLogs } from "../../api/admin";
import Loader from "../../components/Loader";

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminLogs()
      .then((res) => setLogs(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>Admin Logs</h3>
      {loading ? (
        <Loader />
      ) : logs.length === 0 ? (
        <div>No logs found.</div>
      ) : (
        <ul
          style={{ maxHeight: "220px", overflowY: "auto", marginTop: "1rem" }}
        >
          {logs.map((log, idx) => (
            <li
              key={idx}
              style={{
                fontSize: "0.97rem",
                color: "#607d8b",
                marginBottom: "0.5rem",
              }}
            >
              {log.message}{" "}
              <span style={{ color: "#aaa" }}>
                ({new Date(log.timestamp).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
