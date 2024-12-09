"use client";
import { Comment, Post as PostModel } from "@/app/models/Post";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPosts } from "../../actions/post-actions";
import Loader from "../Loader";
import CreatePost from "./CreatePost";
import Post from "./Post";

interface Props {
  initialPosts: PostModel[];
}

const LOAD_SIZE = 2;

export default function PostsContainer({ initialPosts }: Readonly<Props>) {
  const [posts, setPosts] = useState<PostModel[]>(initialPosts);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);

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

  const fetchMore = useCallback(async () => {
    try {
      setLoading(true);
      const newPosts = await getPosts({
        from: offset,
        to: offset + LOAD_SIZE,
      });
      if (newPosts.error) {
        toast.error("Failed to load more posts");
        return;
      }
      setPosts((prev) => [...prev, ...newPosts.data]);
      if (newPosts.data.length < LOAD_SIZE) {
        setNoMorePosts(true);
      }
    } catch {
      toast.error("Failed to load more posts");
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    if (offset === 0) {
      return;
    } else {
      fetchMore();
    }
  }, [fetchMore, offset]);

  const handleScroll = useCallback(() => {
    if (loading || noMorePosts) {
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setOffset((prev) => prev + LOAD_SIZE + 1);
    }
  }, [loading, noMorePosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, handleScroll]);

  return (
    <>
      <CreatePost onPostCreated={handleNewPostCreated} />
      {posts.map((post) => (
        <Post
          key={post.external_id}
          post={post}
          onCommentCreated={(comment) =>
            handleNewCommentCreated(post.external_id, comment)
          }
        />
      ))}
      <div className="flex justify-center mb-4">
        {loading && <Loader />}
        {noMorePosts && (
          <p className="text-gray-600">
            You&apos;ve seen it all! Come back soon for more updates.
          </p>
        )}
      </div>
    </>
  );
}
