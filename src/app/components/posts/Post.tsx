"use client";

import { timeAgo } from "@/app/utils/TimeUtils";
import { useState } from "react";
import Avatar from "../icons/Avatar";
import ChatIcon from "../icons/ChatIcon";
import { useUser } from "../UserContext";
import { createComment } from "./actions";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

interface Props {
  post: {
    created_at: string;
    text: string | null;
    image_src: string | null;
    external_id: string;
    post_comments: {
      text: string | null;
      created_at: string;
      image_src: string | null;
      user: {
        username: string;
        avatar_url: string | null;
      } | null;
    }[];
    user: {
      username: string;
      avatar_url: string | null;
    } | null;
  };
}

export default function Post({ post }: Readonly<Props>) {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const user = useUser();

  const onCreateComment = async (comment: {
    text: string | null;
    image: File | null;
  }) => {
    const formData = new FormData();
    formData.set("text", comment.text || "");
    formData.set("image", comment.image || "");
    await createComment(post.external_id, formData);
  };

  return (
    <div className="">
      <div className="flex flex-col bg-transparent p-4 border-t border-gray-600">
        <div className="flex items-center">
          <Avatar url={post.user?.avatar_url} username={post.user?.username} />
          <p className="text-primary-text ml-2 font-semibold">
            {post.user?.username}
          </p>
          <p className="text-gray-600 ml-2">{timeAgo(post.created_at)}</p>
        </div>
        <div className="px-10">
          <p className=" mt-2">{post.text}</p>
          {post.image_src && (
            <img
              src={post.image_src}
              alt="post"
              className="w-full object-cover mt-4"
            />
          )}
          <div
            className="cursor-pointer flex items-center mt-4 space-x-2 hover:opacity-70 self-start"
            onClick={() => setCommentsExpanded((prev) => !prev)}
          >
            <ChatIcon />
            <p>{post.post_comments.length}</p>
          </div>
          {commentsExpanded && (
            <>
              {post.post_comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
              {user ? (
                <CreateComment onCreate={onCreateComment} />
              ) : (
                <p className="text-blue-200 text-sm">
                  Sign in to write a comment
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
