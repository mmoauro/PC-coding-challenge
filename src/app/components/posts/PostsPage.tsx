import { getPosts } from "../../actions/post-actions";
import PostsContainer from "./PostsContainer";

export default async function PostsPage() {
  const posts = (await getPosts({ from: 0, to: 1 })).data; // First it loads the last two posts

  return (
    <div className="flex justify-center">
      <div className="postsContainer border border-gray-600 rounded-md">
        <PostsContainer initialPosts={posts || []} />
      </div>
    </div>
  );
}
