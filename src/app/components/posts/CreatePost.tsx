"use client";
import useUser from "@/app/hooks/useUser";
import Form from "next/form";
import { useRef, useState } from "react";
import { createPost } from "./actions";

export default function CreatePost() {
  const user = useUser();
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const pickImage = () => {
    fileInput.current?.click();
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      setImage(file);
    }
  };

  return (
    <Form action={createPost} className="w-full justify-center flex p-4">
      <img
        src={user?.user_metadata.avatar_url}
        className="rounded-full h-10 w-10"
      />
      <div className=" mb-4   w-full">
        <div className="px-4 py-2  ">
          <textarea
            id="text"
            rows={2}
            className="bg-transparent w-full px-0 text-lg outline-none "
            placeholder="Write your thoughts..."
            name="text"
            required
          ></textarea>
        </div>
        {image && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 absolute cursor-pointer"
              onClick={() => setImage(null)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <img
              src={URL.createObjectURL(image)}
              alt="post image"
              className="object-cover mt-4 rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <input
              type="file"
              name="image"
              className="hidden"
              ref={fileInput}
              accept=".jpeg,.jpg,.png"
              onChange={onPickImage}
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
          <button
            type="submit"
            className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${
              !user && "opacity-25"
            }`}
            disabled={!user}
          >
            Post
          </button>
        </div>
      </div>
    </Form>
  );
}
