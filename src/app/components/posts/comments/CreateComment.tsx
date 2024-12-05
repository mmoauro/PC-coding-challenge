"use client";
import { useState } from "react";
import Button from "../../Button";
import Avatar from "../../icons/Avatar";
import CloseIcon from "../../icons/CloseIcon";
import Img from "../../Image";
import ImageInput from "../../ImageInput";
import { useUser } from "../../UserContext";

interface Props {
  onCreate: (comment: { text: string | null; image: File | null }) => void;
}

export default function CreateComment({ onCreate }: Readonly<Props>) {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!comment && !image) {
      return;
    }
    onCreate({ text: comment, image });
    setComment("");
    setImage(null);
  };

  return (
    <div className="flex items-start space-x-2 mt-2">
      <Avatar
        url={user?.user_metadata.avatar_url}
        className="w-6 h-6"
        username={user?.user_metadata.user_name}
      />
      <div className="w-full">
        <textarea
          id="text"
          rows={4}
          className="bg-transparent w-full px-0 text-sm outline-none"
          placeholder="Write a comment"
          name="text"
          required
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
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
        <ImageInput onPickImage={setImage} />
      </div>
      <Button
        onClick={handleSubmit}
        text="Submit"
        className="p-1"
        disabled={!comment.length && !image}
      />
    </div>
  );
}
