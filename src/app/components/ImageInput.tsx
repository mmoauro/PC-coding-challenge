"use client";

import { useRef } from "react";

interface Props {
  onPickImage: (image: File) => void;
}

export default function ImageInput({ onPickImage }: Readonly<Props>) {
  const fileInput = useRef<HTMLInputElement>(null);

  const pickImage = () => {
    fileInput.current?.click();
  };

  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      onPickImage(file);
    }
  };

  return (
    <div className="flex">
      <input
        type="file"
        name="image"
        className="hidden"
        ref={fileInput}
        accept=".jpeg,.jpg,.png"
        onChange={onImageSelected}
      />
      <button
        onClick={pickImage}
        type="button"
        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
        <span className="sr-only">Upload image</span>
      </button>
    </div>
  );
}
