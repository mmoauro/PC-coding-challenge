"use client";

interface Props {
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}
export default function Button({
  onClick,
  text,
  className,
  disabled,
  loading,
}: Readonly<Props>) {
  return (
    <button
      className={`bg-blue-300 rounded-md p-2 ${
        disabled && "opacity-25 bg-red-300"
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <p className="text-black text-md">{text}</p>
    </button>
  );
}
