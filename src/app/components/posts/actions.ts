"use server";
import { createSupabaseClient, getUser } from "@/app/auth/server";
import ImageService from "@/app/services/ImageService";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const user = await getUser();
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const image = formData.get("image") as File | null;
  let imageUrl = null;
  if (image) {
    try {
      imageUrl = await ImageService.uploadImage(image);
    } catch {
      console.log("Error uploading image");
      return;
    }
  }
  const post = {
    text: formData.get("text") as string,
    image_src: imageUrl,
  };

  const client = await createSupabaseClient();
  const { error } = await client.from("posts").insert(post);
  if (error) {
    console.error("Error creating post:", error);
    return;
  }
  // Redirect to the new post
  redirect(`/`);
}

export async function createComment(postId: string, formData: FormData) {
  const user = await getUser();
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const image = formData.get("image") as File | null;
  let imageUrl = null;
  if (image) {
    try {
      imageUrl = await ImageService.uploadImage(image);
    } catch {
      console.log("Error uploading image");
      return;
    }
  }
  const comment = {
    text: formData.get("text") as string,
    image_src: imageUrl,
    post_id: postId,
  };

  const client = await createSupabaseClient();
  const { error } = await client.from("post_comments").insert(comment);
  if (error) {
    console.error("Error creating comment:", error);
    return;
  }
  // Redirect to the new comment
  redirect(`/`);
}
