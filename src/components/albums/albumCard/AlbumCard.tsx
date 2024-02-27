import { AlbumModel } from "@/models/album";
import { useNavigate} from "react-router-dom";
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
        navigate(`/album/${album.id}?name=${album.name}`);
      }}
    >
      <div className="album__inner">
        <div className="album__content">
          <div className="album__info-box album__info-box-left">
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
              className="lucide lucide-folder-open"
            >
              <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
            </svg>
            <h1 className="album__title">{album.name}</h1>
          </div>
          <div className="album__info-box album__info-box-mid">
            <p className="album__location">{album.location}</p>
          </div>
          <div className="album__info-box album__info-box-right">
            <p className="album__date">{format(album.date, "yyyy-MM-dd")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
