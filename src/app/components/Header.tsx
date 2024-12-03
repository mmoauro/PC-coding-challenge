"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createSupabaseBrowserClient } from "../auth/client";
import Button from "./Button";
import { useUser } from "./UserContext";

const client = createSupabaseBrowserClient();

export default function Header() {
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const handleLogin = async () => {
    setLoading(true);
    await client.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await client.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    }
    setLoading(false);
  };
  return (
    <>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
      <div className="flex justify-end m-2">
        {user ? (
          <Button
            onClick={handleSignOut}
            text="Sign out"
            className="bg-red-300"
            disabled={loading}
            loading={loading}
          />
        ) : (
          <Button
            onClick={handleLogin}
            text="Sign in with Github"
            disabled={loading}
            loading={loading}
          />
        )}
      </div>
    </>
  );
}
