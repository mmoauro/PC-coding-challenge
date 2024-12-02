import { createSupabaseClient } from "../auth/server";

class PostService {
  async getPosts() {
    const client = await createSupabaseClient();
    return client
      .from("posts")
      .select(
        "external_id, created_at, text, image_src, post_comments(text, created_at, image_src, user:users(username, avatar_url)), user:users(username, avatar_url)"
      )
      .order("created_at", { ascending: false });
  }
}

export default new PostService();
