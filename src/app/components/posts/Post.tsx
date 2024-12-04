"use client";

import { createComment } from "@/app/actions/comment-actions";
import { Comment as CommentModel, Post as PostModel } from "@/app/models/Post";
import { timeAgo } from "@/app/utils/TimeUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "../icons/Avatar";
import ChatIcon from "../icons/ChatIcon";
import Img from "../Image";
import { useUser } from "../UserContext";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

interface Props {
  post: PostModel;
  onCommentCreated: (comment: CommentModel) => void;
}

export default function Post({ post, onCommentCreated }: Readonly<Props>) {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const user = useUser();

  const onCreateComment = async (comment: {
    text: string | null;
    image: File | null;
  }) => {
    const formData = new FormData();
    formData.set("text", comment.text ?? "");
    formData.set("image", comment.image || "");
    try {
      const newComment = await createComment(post.external_id, formData);
      onCommentCreated(newComment);
    } catch (error) {
      let message = "An unexpected error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col bg-transparent p-4 border-t border-gray-600">
        <div className="flex items-center">
          <Avatar
            url={post.user?.avatar_url}
            username={post.user?.username}
            className="h-8 w-8"
          />
          <p className="text-primary-text ml-2 font-semibold">
            {post.user?.username}
          </p>
          <p className="text-gray-600 ml-2">{timeAgo(post.created_at)}</p>
        </div>
        <div className="px-10">
          <p className=" mt-2">{post.text}</p>
          {post.image_src && (
            <Img
              src={post.image_src}
              alt="post"
              className="w-full object-cover mt-4"
            />
          )}
          <button
            className="cursor-pointer flex items-center mt-4 space-x-2 hover:opacity-70 self-start"
            onClick={() => setCommentsExpanded((prev) => !prev)}
          >
            <ChatIcon />
            <p>{post.post_comments.length}</p>
          </button>
          {commentsExpanded && (
            <>
              {post.post_comments.map((comment) => (
                <Comment comment={comment} key={comment.external_id} />
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
