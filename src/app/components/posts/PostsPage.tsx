import { createSupabaseClient } from "@/app/auth/server";
import CreatePost from "./CreatePost";

export default async function PostsPage() {
  const client = await createSupabaseClient();
  const posts = await client.from("posts").select("*");
  // TODO: Display posts

  return (
    <div>
      <h1>Posts</h1>

      <CreatePost />
    </div>
  );
}
