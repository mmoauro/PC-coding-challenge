"use client";

import Loader from "./Loader";

interface Props {
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}
export default function Button({
  onClick,
  text,
  className,
  disabled,
  loading,
  type,
}: Readonly<Props>) {
  return (
    <button
      className={`flex justify-center items-center bg-blue-300 rounded-md p-2 ${
        disabled && "opacity-25"
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <Loader className="absolute" />}
      <p className={`text-black text-md ${loading && "text-transparent"}`}>
        {text}
      </p>
    </button>
  );
}
