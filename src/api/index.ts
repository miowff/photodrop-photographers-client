import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { BASE_URL } from "@/enums/baseUrl";
import { AccessTokenResponse } from "@/models/accessTokenResponse";
import { AlbumModel, CreateAlbumModel } from "@/models/album";
import { AttachUsersToPhoto, RequestLinks } from "@/models/photo";
import { AvailableUser, LoginModel } from "@/models/user";
import axios from "axios";

const httpClient = axios.create({
  baseURL: BASE_URL,
});
export const getAlbums = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const albums = await httpClient.get<AlbumModel[]>(`/albums`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return albums.data;
};
export const addAlbum = async (
  album: CreateAlbumModel
): Promise<AlbumModel> => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await httpClient.post<CreateAlbumModel, AlbumModel>(
    "/uploadAlbum",
    album,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  console.log(response);
  return response;
};
export const signIn = async (loginRequest: LoginModel) => {
  const response = await httpClient.post<LoginModel, AccessTokenResponse>(
    "/auth",
    loginRequest
  );
  const token = response.data;
  return token;
};
export const requestUploadUrls = async (requestLinks: RequestLinks) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await httpClient.post("/imagesPresignedPost", requestLinks, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response);
  return response.data;
};
export const attachUsersToPhoto = async (
  attachUsersToPhoto: AttachUsersToPhoto
) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  await httpClient.post<AttachUsersToPhoto>(
    "/attach-users-to-photo",
    attachUsersToPhoto,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};
export const getAvailableNumbers = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await httpClient.get<AvailableUser[]>("/getClients", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
