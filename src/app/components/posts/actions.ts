"use server";
import { createSupabaseClient, getUser } from "@/app/auth/server";
import { Comment, Post } from "@/app/models/Post";
import ImageService from "@/app/services/ImageService";
import PostService from "@/app/services/PostService";

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

  const { data, error } = await PostService.createPost(post);
  if (error) {
    throw new Error("Error creating post");
  }
  return data[0];
}

export async function createComment(
  postId: string,
  formData: FormData
): Promise<Comment> {
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
  const comment = {
    text: formData.get("text") as string,
    image_src: imageUrl,
    post_id: postId,
  };

  const client = await createSupabaseClient();
  const { data, error } = await client
    .from("post_comments")
    .insert(comment)
    .select("text, created_at, image_src, user:users(username, avatar_url)");
  if (error) {
    throw new Error("Error creating comment");
  }
  return data[0];
}
