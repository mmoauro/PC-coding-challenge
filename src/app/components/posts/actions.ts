"use server";
import { createSupabaseClient, getUser } from "@/app/auth/server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const user = await getUser();
  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  const post = {
    text: formData.get("text") as string,
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
