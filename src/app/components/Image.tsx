import Image from "next/image";
import { useState } from "react";
import Loader from "./Loader";

interface Props {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
}

export default function Img({ src, alt, className, onError }: Readonly<Props>) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      <Image
        width={1000}
        height={1000}
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={onError}
      />
    </>
  );
}
