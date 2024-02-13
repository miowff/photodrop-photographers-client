import { useRef, useState } from "react";
import close from "/close.svg";
import { AlbumModel, CreateAlbumModel } from "@/models/album";
import { format } from "date-fns";
import { addAlbum } from "@/api";
import { useHandleEnterPush } from "@/hooks/handleEnterPush";
import { useHandleOutsideClick } from "@/hooks/handleOutsideClick";
interface Props {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  albums: AlbumModel[];
}
export const CreateAlbum = ({ setFormOpen, albums }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const handleUploadAlbum = async () => {
    setIsDataLoading(true);
    const newAlbum: CreateAlbumModel = {
      name: title,
      location,
      date: format(new Date(), "yyyy-MM-dd"),
    };
    const createdAlbum = await addAlbum(newAlbum);
    albums.push(createdAlbum);
    setIsDataLoading(false);
    setFormOpen(false);
  };
  const handleAddAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleUploadAlbum();
    } catch (err) {
      setIsDataLoading(false);
      console.log(err);
    }
  };
  useHandleEnterPush(async () => {
    await handleUploadAlbum();
  });
  useHandleOutsideClick(ref, () => {
    setFormOpen(false);
  });
  return (
    <div className="create-album form-container">
      <div className="container">
        <div className="create-album__inner" ref={ref}>
          <form className="create-album__form" onSubmit={handleAddAlbum}>
            <div className="create-album__form-title">
              <h1 className="create-album__form-header">Add album</h1>
              <span className="create-album__close">
                <img
                  className="create-album__close-svg"
                  src={close}
                  onClick={() => {
                    setFormOpen(false);
                  }}
                />
              </span>
            </div>
            <input
              className="create-album__input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
            <input
              className="create-album__input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>
            <button
              className="create-album__button"
              disabled={
                title.length === 0 || location.length === 0 || isDataLoading
              }
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
