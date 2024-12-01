import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "../auth/client";
import { getUser } from "../auth/server";

const client = createSupabaseBrowserClient();
export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    client.auth.onAuthStateChange(async () => {
      const user = await getUser();
      setUser(user);
    });
  }, []);

  return user;
}
