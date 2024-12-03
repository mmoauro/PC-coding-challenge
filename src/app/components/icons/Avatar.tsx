import { useState } from "react";
import Img from "../Image";

interface Props {
  className?: string;
  url?: string | null;
  username?: string;
}

export default function Avatar({ className, url, username }: Readonly<Props>) {
  const [hasError, setHasError] = useState(false);

  if ((!url || hasError) && username) {
    return (
      <div
        className={`w-8 h-8 rounded-full bg-gray-600 flex justify-center items-center ${className}`}
      >
        <p className="text-white text-lg">
          {username?.charAt(0).toUpperCase()}
        </p>
      </div>
    );
  } else if (hasError || !url) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    );
  }

  return (
    <Img
      src={url}
      alt="avatar"
      className={`w-6 h-6 rounded-full ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
