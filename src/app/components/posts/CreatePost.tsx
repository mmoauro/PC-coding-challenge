"use client";
import { Post } from "@/app/models/Post";
import { FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";
import Avatar from "../icons/Avatar";
import CloseIcon from "../icons/CloseIcon";
import Img from "../Image";
import ImageInput from "../ImageInput";
import { useUser } from "../UserContext";
import { createPost } from "./actions";

interface Props {
  onPostCreated: (post: Post) => void;
}

export default function CreatePost({ onPostCreated }: Readonly<Props>) {
  const user = useUser();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = useCallback(() => {
    return !!text || !!image;
  }, [text, image]);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.set("text", text);
    if (image) {
      formData.set("image", image);
    }
    try {
      const newPost = await createPost(formData);
      setText("");
      setImage(null);
      onPostCreated(newPost);
    } catch (error) {
      let message = "An unexpected error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full justify-center flex p-4">
      <Avatar
        className="h-9 w-9"
        url={user?.user_metadata.avatar_url}
        username={user?.user_metadata.username}
      />
      <div className=" mb-4 w-full">
        <div className="px-4 py-2  ">
          <textarea
            id="text"
            rows={2}
            className="bg-transparent w-full px-0 text-lg outline-none "
            placeholder="Write your thoughts..."
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
        </div>
        {image && (
          <div>
            <CloseIcon onClick={() => setImage(null)} />
            <Img
              src={URL.createObjectURL(image)}
              alt="post image"
              className="object-cover mt-4 rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
          <ImageInput onPickImage={setImage} />

          <Button
            onClick={() => {}}
            text={user ? "Post" : "Sign in to post"}
            disabled={!user || loading || !isFormValid()}
            loading={loading}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
