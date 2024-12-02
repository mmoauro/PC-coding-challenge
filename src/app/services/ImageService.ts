import { randomUUID } from "crypto";
import { createSupabaseClient } from "../auth/server";

class ImageService {
  async uploadImage(image: File): Promise<string> {
    const uniqueImageName = `${randomUUID()}-${image.name.replace(/ /g, "_")}`;

    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(uniqueImageName, image);

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    return supabase.storage.from("images").getPublicUrl(uniqueImageName).data
      .publicUrl;
  }
}

export default new ImageService();
