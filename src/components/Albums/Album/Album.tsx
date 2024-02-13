import { AlbumModel } from "@/models/album";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AlbumSvg } from "../../../../public/svg/AlbumSvg";
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
        <div className="album__content">
          <AlbumSvg />
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
