import PostService from "@/app/services/PostService";
import PostsContainer from "./PostsContainer";

export default async function PostsPage() {
  const posts = (await PostService.getPosts()).data;

  return (
    <div className="flex justify-center">
      <div className="postsContainer border border-gray-600 rounded-md">
        <PostsContainer initialPosts={posts || []} />
      </div>
    </div>
  );
}
