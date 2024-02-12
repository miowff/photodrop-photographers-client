import { AlbumModel } from "@/models/album";
import AlbumIcon from "../../../public/album.svg";
import { useNavigate } from "react-router-dom";
interface Props {
  album: AlbumModel;
}
export const Album = ({ album }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="album"
      onClick={() => {
        navigate(`/album/${album.id}`);
      }}
    >
      <div className="album__inner">
        <img className="album__icon" src={AlbumIcon} />
        <div className="album__info">
          <h1 className="album__title">{album.name}</h1>
          <p className="album__location">{album.location}</p>
          <p className="album__date">{album.date}</p>
        </div>
      </div>
    </div>
  );
};
