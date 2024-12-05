"use server";

import { createSupabaseClient, getUser } from "../auth/server";
import { Comment } from "../models/Post";
import ImageService from "../services/ImageService";

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
    .select(
      "external_id, text, created_at, image_src, user:users(username, avatar_url)"
    );
  if (error) {
    throw new Error("Error creating comment");
  }
  return data[0];
}
