export interface AlbumModel {
  id: number;
  name: string;
  location: string;
  date: string;
  photographerId: number;
}
export interface CreateAlbumModel {
  name: string;
  location: string;
  date: string;
}
