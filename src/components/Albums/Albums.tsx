import { AlbumModel } from "@/models/album";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseError } from "@/models/error";
import { getAlbums } from "@/api";
import { CreateAlbum } from "../createAlbum/CreateAlbum";
import { Album } from "./album/Album";
import { GallerySvg } from "../../../public/svg/GallerySvg";
export const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [isCreateAlbumActive, setIsCreateAlbumActive] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const albums = await getAlbums();
        setAlbums(albums);
      } catch (err) {
        const { response } = err as BaseError;
        const { status } = response;
        if (status == 403 || status == 401) {
          navigate("/login");
        } else {
          console.error("Error fetching data:", err);
        }
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      {isCreateAlbumActive && (
        <CreateAlbum setFormOpen={setIsCreateAlbumActive} albums={albums} />
      )}
      <section className="albums">
        <div className="container">
          <div className="albums__inner">
            <div className="albums__header">
              <GallerySvg />
              <h1 className="albums__title">Albums</h1>
            </div>
            <div className="albums__controls">
              <button
                className="albums__add-button albums__control-button"
                onClick={() => {
                  setIsCreateAlbumActive(!isCreateAlbumActive);
                }}
              >
                Add
              </button>
              <button
                className="albums__sort-button albums__control-button"
                onClick={() => {
                  const sortedAlbums = [...albums];
                  sortedAlbums.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                  setAlbums(sortedAlbums);
                }}
              >
                Newest
              </button>
              <button
                className="albums__sort-button albums__control-button"
                onClick={() => {
                  const sortedAlbums = [...albums];
                  sortedAlbums.sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  );
                  setAlbums(sortedAlbums);
                }}
              >
                Oldest
              </button>
            </div>
            <div className="albums__albums-list">
              {albums.map((album, key) => {
                return <Album album={album} key={key} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
