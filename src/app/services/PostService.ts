import { createSupabaseClient } from "../auth/server";

export const POST_SELECT_QUERY =
  "external_id, created_at, text, image_src, post_comments(text, created_at, image_src, user:users(username, avatar_url)), user:users(username, avatar_url)";

class PostService {
  async getPosts() {
    const client = await createSupabaseClient();
    return client
      .from("posts")
      .select(POST_SELECT_QUERY)
      .order("created_at", { ascending: false });
  }

  async createPost(post: { text: string; image_src: string | null }) {
    const client = await createSupabaseClient();
    return client.from("posts").insert(post).select(POST_SELECT_QUERY);
  }
}

export default new PostService();
