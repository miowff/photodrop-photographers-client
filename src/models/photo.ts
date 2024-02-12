export interface AttachUsersToPhoto {
  albumId: string;
  userPhotoMap: string;
}

export interface PhotoData {
  albumId: string;
  type: string;
}

export interface RequestLinks {
  images: PhotoData[];
}
export interface AttachPhotoInfo {
  id: string;
  albumId: string;
}
