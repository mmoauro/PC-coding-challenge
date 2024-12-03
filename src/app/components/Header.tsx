"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createSupabaseBrowserClient } from "../auth/client";
import Button from "./Button";
import { useUser } from "./UserContext";
import Avatar from "./icons/Avatar";

const client = createSupabaseBrowserClient();

export default function Header() {
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const handleLogin = async () => {
    setLoading(true);
    await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000",
      },
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
      <div className="flex justify-between m-2">
        {user ? (
          <div className="flex items-center space-x-2">
            <p>
              Logged in as{" "}
              <span className="font-semibold">
                {user.user_metadata.user_name}
              </span>
            </p>
            <Avatar url={user.user_metadata.avatar_url} />
          </div>
        ) : (
          <p>Not logged in</p>
        )}
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
