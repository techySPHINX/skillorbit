import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications()
      .then((res) => setNotifications(res.data.notifications))
      .finally(() => setLoading(false));
  }, []);

  return { notifications, loading };
}
