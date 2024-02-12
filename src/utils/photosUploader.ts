import { requestUploadUrls } from "@/api";
import { AttachPhotoInfo, PhotoData } from "@/models/photo";
import { PresignedUrl } from "@/models/url";


export const uploadPhotos = async (
  selectedImages: File[],
  albumId: string
): Promise<AttachPhotoInfo[]> => {
  const photosData: PhotoData[] = selectedImages.map((photo) => {
    const { type } = photo;
    return { type, albumId };
  });
  const attachPhotosData: AttachPhotoInfo[] = [];
  const responseUrls = (await requestUploadUrls({
    images: photosData,
  })) as PresignedUrl[];
  await Promise.all(
    responseUrls.map(async (responseUrl, index) => {
      const { fields } = responseUrl;
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
        if (key === "key") {
          const splittedKey = value.split("/") as string[];
          attachPhotosData.push({
            id: splittedKey[splittedKey.length - 1],
            albumId,
          });
        }
      }
      formData.append("file", selectedImages[index]);
      /*await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });*/
    })
  );
  return attachPhotosData;
};
