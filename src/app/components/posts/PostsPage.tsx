import PostService from "@/app/services/PostService";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default async function PostsPage() {
  const posts = (await PostService.getPosts()).data;
  // TODO: Display posts

  return (
    <div className="flex justify-center">
      <div className="w-[50%] border border-gray-600 rounded-md">
        <CreatePost />
        {posts?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
