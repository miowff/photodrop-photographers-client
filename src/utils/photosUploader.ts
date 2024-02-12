import { requestUploadUrls } from "@/api";
import { PhotoData } from "@/models/photo";
import { PresignedUrl } from "@/models/url";
import axios from "axios";

export const uploadPhotos = async (selectedImages: File[], albumId: string) => {
  const photosData: PhotoData[] = selectedImages.map((photo) => {
    const { type } = photo;
    return { type, albumId };
  });

  const responseUrls = (await requestUploadUrls({
    images: photosData,
  })) as PresignedUrl[];
  await Promise.all(
    responseUrls.map(async (responseUrl, index) => {
      const { fields, url } = responseUrl;
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }
      formData.append("file", selectedImages[index]);
      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    })
  );
};
