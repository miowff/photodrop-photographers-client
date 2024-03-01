import { AlbumModel } from "@/models/album";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseError } from "@/models/error";
import { getAlbums } from "@/api";
import { CreateAlbum } from "../createAlbum/CreateAlbum";
import { AlbumCard } from "../albums/albumCard/AlbumCard";

export const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [isAlbumsFetching, setIsAlbumsFetching] = useState<boolean>(false);
  const [newestActive, setNewestActive] = useState<boolean>(false);
  const [oldestActive, setOldestActive] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateAlbumActive, setIsCreateAlbumActive] =
    useState<boolean>(false);
  const filteredAlbums = albums.filter(({ name }) => name.includes(searchTerm));
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsAlbumsFetching(true);
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
      setIsAlbumsFetching(false);
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
              <h1 className="albums__title">Albums</h1>
              <div className="albums__search-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  className="albums__search"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearchChange}
                ></input>
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
                  className={`albums__sort-button albums__control-button ${
                    newestActive ? "albums__control-button-active" : ""
                  }`}
                  onClick={() => {
                    const sortedAlbums = [...albums];
                    sortedAlbums.sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    setAlbums(sortedAlbums);
                    setNewestActive(true);
                    setOldestActive(false);
                  }}
                >
                  Newest
                </button>
                <button
                  className={`albums__sort-button albums__control-button ${
                    oldestActive ? "albums__control-button-active" : ""
                  }`}
                  onClick={() => {
                    const sortedAlbums = [...albums];
                    sortedAlbums.sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                    setAlbums(sortedAlbums);
                    setOldestActive(true);
                    setNewestActive(false);
                  }}
                >
                  Oldest
                </button>
              </div>
            </div>
            <ul className="albums__albums-list">
              <div className="albums__columns">
                <div className="albums__column-box">
                  <p className="albums__column-name">Name</p>
                </div>
                <div className="albums__column-box">
                  <p className="albums__column-location">Location</p>
                </div>
                <div className="albums__column-box">
                  <p className="albums__column-date">Created at</p>
                </div>
              </div>
              {filteredAlbums.length === 0 ? (
                <>
                  {!isAlbumsFetching && (
                    <p className="albums__no-albums">No albums were found</p>
                  )}
                </>
              ) : (
                <>
                  {filteredAlbums.map((album, key) => {
                    return <AlbumCard album={album} key={key} />;
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
