"use client";
import Form from "next/form";
import { useState } from "react";
import Avatar from "../icons/Avatar";
import CloseIcon from "../icons/CloseIcon";
import ImageInput from "../ImageInput";
import { useUser } from "../UserContext";
import { createPost } from "./actions";

export default function CreatePost() {
  const user = useUser();
  const [image, setImage] = useState<File | null>(null);
  return (
    <Form action={createPost} className="w-full justify-center flex p-4">
      <Avatar
        className="h-10 w-10"
        url={user?.user_metadata.avatar_url}
        username={user?.user_metadata.username}
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
            <CloseIcon onClick={() => setImage(null)} />
            <img
              src={URL.createObjectURL(image)}
              alt="post image"
              className="object-cover mt-4 rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
          <ImageInput onPickImage={setImage} />
          <button
            type="submit"
            className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${
              !user && "opacity-25"
            }`}
            disabled={!user}
          >
            {user ? "Post" : "Sign in to post"}
          </button>
        </div>
      </div>
    </Form>
  );
}
