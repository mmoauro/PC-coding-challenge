import { randomUUID } from "crypto";
import { createSupabaseClient } from "../auth/server";

class ImageService {
  async uploadImage(image: File): Promise<string> {
    const uniqueImageName = `${randomUUID()}-${image.name.replace(/ /g, "_")}`;

    const supabase = await createSupabaseClient();
    const { error } = await supabase.storage
      .from("images")
      .upload(uniqueImageName, image);

    if (error) {
      throw error;
    }

    return supabase.storage.from("images").getPublicUrl(uniqueImageName).data
      .publicUrl;
  }
}
const service = new ImageService();
export default service;
