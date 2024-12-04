"use server";
import { createSupabaseClient, getUser } from "@/app/auth/server";
import { Post } from "@/app/models/Post";
import ImageService from "@/app/services/ImageService";

const POST_SELECT_QUERY =
  "external_id, created_at, text, image_src, post_comments(external_id, text, created_at, image_src, user:users(username, avatar_url)), user:users(username, avatar_url)";

export async function createPost(formData: FormData): Promise<Post> {
  const user = await getUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const image = formData.get("image") as File | null;
  let imageUrl = null;
  if (image) {
    try {
      imageUrl = await ImageService.uploadImage(image);
    } catch {
      throw new Error("Error uploading image");
    }
  }
  const post = {
    text: formData.get("text") as string,
    image_src: imageUrl,
  };

  const client = await createSupabaseClient();
  const { data, error } = await client
    .from("posts")
    .insert(post)
    .select(POST_SELECT_QUERY);
  if (error) {
    throw new Error("Error creating post");
  }
  return data[0];
}

export async function getPosts({ from, to }: { from: number; to: number }) {
  console.log({ from, to });
  const client = await createSupabaseClient();

  const posts = await client
    .from("posts")
    .select(POST_SELECT_QUERY)
    .range(from, to)
    .order("created_at", { ascending: false });
  return posts;
}
