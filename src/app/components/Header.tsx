"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "../auth/client";
import useUser from "../hooks/useUser";
import Button from "./Button";

const client = createSupabaseBrowserClient();

export default function Header() {
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "github",
    });
    //setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await client.auth.signOut();
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
