import { useEffect, useState } from "react";
import { fetchMe } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((res) => {
        const data = res.data as { user: unknown };
        setUser(data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
