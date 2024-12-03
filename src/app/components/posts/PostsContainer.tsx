"use client";
import { Comment, Post as PostModel } from "@/app/models/Post";
import { useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

interface Props {
  initialPosts: PostModel[];
}

export default function PostsContainer({ initialPosts }: Readonly<Props>) {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPostCreated = (newPost: PostModel) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleNewCommentCreated = (postId: string, newComment: Comment) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.external_id === postId) {
          return {
            ...post,
            post_comments: [...post.post_comments, newComment],
          };
        }
        return post;
      })
    );
  };

  return (
    <>
      <CreatePost onPostCreated={handleNewPostCreated} />
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          onCommentCreated={(comment) =>
            handleNewCommentCreated(post.external_id, comment)
          }
        />
      ))}
    </>
  );
}
