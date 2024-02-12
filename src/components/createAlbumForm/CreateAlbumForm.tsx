import { AlbumModel, CreateAlbumModel } from "@/models/album";
import { format } from "date-fns";
import {
  BlurContainer,
  CreateAlbum,
  FormContainer,
  FormHeader,
  SubmitButton,
} from "./createAlbumFormStyles";
import { useState } from "react";
import { addAlbum } from "@/api";
type CreateAlbumProps = {
  onAlbumCreated: (albums: AlbumModel[]) => void;
  setOpenCreateAlbumForm: React.Dispatch<React.SetStateAction<boolean>>;
  isFormUpOpen: boolean;
  albums: AlbumModel[];
};
const CreateAlbumForm: React.FC<CreateAlbumProps> = ({
  onAlbumCreated,
  setOpenCreateAlbumForm,
  isFormUpOpen,
  albums,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const handleAddAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newAlbum: CreateAlbumModel = {
        name,
        location,
        date: format(new Date(), "yyyy-MM-dd"),
      };
      const createdAlbum = await addAlbum(newAlbum);
      albums.push(createdAlbum);
      onAlbumCreated(albums);
      setOpenCreateAlbumForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BlurContainer isBlurred={isFormUpOpen}>
      <FormContainer>
        <FormHeader>
          <div>
            <button
              className="close-button"
              onClick={() => setOpenCreateAlbumForm(false)}
            >
              X
            </button>
          </div>
        </FormHeader>
        <CreateAlbum onSubmit={handleAddAlbum}>
          <div className="form-element">
            <input
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-element">
            <input
              className="input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <SubmitButton>
            <p className="submit-button-text">Save</p>
          </SubmitButton>
        </CreateAlbum>
      </FormContainer>
    </BlurContainer>
  );
};
export default CreateAlbumForm;
