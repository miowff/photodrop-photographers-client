import { AlbumModel } from "@/models/album";
import AlbumIcon from "/album.svg";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
interface Props {
  album: AlbumModel;
}
export const AlbumCard = ({ album }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="album"
      onClick={() => {
        navigate(`/album/${album.id}`);
      }}
    >
      <div className="album__inner">
        <div className="album__content">
          <img className="album__icon" src={AlbumIcon} />
          <div className="album__info">
            <h1 className="album__title">{album.name}</h1>
            <p className="album__location">{album.location}</p>
            <p className="album__date">{format(album.date, "yyyy-MM-dd")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
