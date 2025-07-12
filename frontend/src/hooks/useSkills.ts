import { useEffect, useState } from "react";
import { fetchSkills } from "../api/skill";

export function useSkills() {
  const [skills, setSkills] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then((res) => setSkills(res.data.skills))
      .finally(() => setLoading(false));
  }, []);

  return { skills, loading };
}
