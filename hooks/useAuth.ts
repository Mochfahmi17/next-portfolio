import { useEffect, useState } from "react";
import { apiBaseUrl } from "@/lib/api";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/auth/is-auth`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setIsLoggedIn(false);
          setUserId(null);
        } else {
          setIsLoggedIn(true);
          setUserId(data.user);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    fetchAuth();
  }, []);

  return { isLoggedIn, userId };
};
