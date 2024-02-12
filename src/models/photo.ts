
export interface PhotoData {
  albumId: number;
  name: string;
  type: string;
}

export interface RequestLinks {
  images: PhotoData[];
}
export interface AttachPhotoInfo {
  id: string;
  albumId: number;
  realName: string;
}
export interface AttachUsersToPhoto {
  image: Image;
  clientsId: number[];
}
interface Image {
  id: string;
  albumId: number;
}
