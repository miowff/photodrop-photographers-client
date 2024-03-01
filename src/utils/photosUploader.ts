import { requestUploadUrls } from "@/api";
import { AttachPhotoInfo, PhotoData } from "@/models/photo";
import { PresignedUrl } from "@/models/url";
import axios from "axios";

export const uploadPhotos = async (
  selectedImages: File[],
  albumId: string
): Promise<AttachPhotoInfo[]> => {
  const photosData: PhotoData[] = selectedImages.map((photo) => {
    const { type, name } = photo;
    return { type, albumId, name };
  });
  const attachPhotosData: AttachPhotoInfo[] = [];
  const responseUrls = (await requestUploadUrls({
    images: photosData,
  })) as PresignedUrl[];
  await Promise.all(
    responseUrls.map(async (url, index) => {
      const { fields, url: uploadUrl } = url.post;
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
        if (key === "key") {
          const splittedKey = value.split("/") as string[];
          attachPhotosData.push({
            id: splittedKey[splittedKey.length - 1],
            albumId: parseInt(albumId),
            realName: url.realName,
          });
        }
      }
      formData.append("file", selectedImages[index]);
      await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    })
  );
  return attachPhotosData;
};
