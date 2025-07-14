import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications()
      .then((res) => {
        const data = res.data as { notifications: unknown[] };
        setNotifications(data.notifications);
      })
      .finally(() => setLoading(false));
  }, []);

  return { notifications, loading };
}
