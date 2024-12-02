"use client";
import useUser from "@/app/hooks/useUser";
import Form from "next/form";
import { createPost } from "./actions";

export default function CreatePost() {
  const user = useUser();

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
            rows={4}
            className="bg-transparent w-full px-0 text-lg  border-0 focus:ring-0 "
            placeholder="Write your thoughts..."
            name="text"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button
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
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post
          </button>
        </div>
      </div>
    </Form>
  );
}
