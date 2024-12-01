import { useEffect, useState } from "react";

export default function Loader({ className }: { className?: string }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className={`text-2xl text-black ${className}`}>{".".repeat(dots)}</p>
  );
}
