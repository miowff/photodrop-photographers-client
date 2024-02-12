import { useEffect, useState } from "react";
import PlusIcon from "../../public/plus.svg";
import Close from "../../public/close.svg";
import AddMembers from "../../public/members-add-users.svg";
import { AvailableUser } from "@/models/user";
import { attachUsersToPhoto, getAvailableNumbers } from "@/api";
import { Alert } from "../Alert/Alert";
import { uploadPhotos } from "@/utils/photosUploader";
import { AttachUsersToPhoto } from "@/models/photo";
import { useParams } from "react-router-dom";
import { AddUsers } from "./AddUsers/AddUsers";
export const PhotosInput = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserSelectionVisible, setIsSectionVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<
    Map<string, AvailableUser[]>
  >(new Map());
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSelectedImages: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newSelectedImages.push(file);
      }

      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...newSelectedImages,
      ]);
    }
  };
  const handleUploadClick = async () => {
    if (selectedImages.length !== selectedUsers.size) {
      setAlertMessage(
        "Please select phone numbers for all images before uploading."
      );
      setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return;
    }
    setIsLoading(true);
    const photoInfo = await uploadPhotos(selectedImages, id as string);
    const attachUsersRequest: AttachUsersToPhoto[] = [];
    photoInfo.forEach(({ realName, albumId, id }) => {
      const users = selectedUsers.get(realName);
      if (users) {
        const clientsIds = users?.map(({ id }) => id);
        const a = {
          image: {
            id,
            albumId,
          },
          clientsId: clientsIds,
        };
        attachUsersRequest.push(a);
      }
    });
    setTimeout(async () => {
      await attachUsersToPhoto(attachUsersRequest);
      console.log("Attached users to photo");
    }, 5000);
    setSelectedImages([]);
    setIsLoading(false);
  };
  const handleSelectedPhoneNumbersFromChild = (
    users: Map<string, AvailableUser[]>
  ) => {
    setSelectedUsers(users);
  };
  const handleClearPhotos = () => {
    setSelectedImages([]);
    setSelectedImageIndex(null);
  };
  const handleImageRemove = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    selectedUsers.delete(selectedImages[index].name);
    setSelectedImages(updatedImages);
    if (index === selectedImageIndex) {
      setSelectedImageIndex(null);
    }
  };
  const handleAddMembersButtonClick = (index: number) => {
    if (selectedImageIndex === index && isUserSelectionVisible) {
      setIsSectionVisible(false);
      setSelectedImageIndex(null);
    } else {
      setIsSectionVisible(true);
      setSelectedImageIndex(index);
    }
  };
  const handleCloseForm = () => {
    setIsSectionVisible(false);
    setSelectedImageIndex(null);
  };
  useEffect(() => {
    const fetchUsersNumbers = async () => {
      try {
        const data = await getAvailableNumbers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching usersNumbers:", error);
      }
    };
    fetchUsersNumbers();
  }, []);
  return (
    <section className="photos-input">
      {alertMessage && <Alert message={alertMessage} />}
      <div className="container">
        <div className="photos-input__inner">
          <div className="photos-input__header">
            <img className="photos-input__header-icon" src={PlusIcon} />
            <h1 className="photos-input__title">Add Photos</h1>
          </div>
          <div className="photos-input__controls">
            <div className="photos-input__input-wrapper">
              <span className="label">
                <a>Select</a>
              </span>
              <input
                className="photos-input__input-photos"
                type="file"
                placeholder="Upload photos"
                multiple
                onChange={handleImageChange}
                disabled={isLoading}
              ></input>
            </div>
            <button
              className="photos-input__clear photos-input__control-button"
              disabled={selectedImages.length == 0 || isLoading}
              onClick={handleClearPhotos}
            >
              Clear
            </button>
            <button
              className="photos-input__clear photos-input__control-button"
              disabled={selectedImages.length == 0 || isLoading}
              onClick={handleUploadClick}
            >
              Upload
            </button>
          </div>
          <div className="photos-input__photos-grid">
            {selectedImages.map((image, index) => {
              return (
                <div className="photos-input__photo-container" key={index}>
                  {isUserSelectionVisible && selectedImageIndex === index && (
                    <div className="photos-input__user-selection">
                      <AddUsers
                        users={users}
                        onClose={handleCloseForm}
                        photoKey={image.name}
                        existingUsersPhoto={selectedUsers}
                        onSelectedPhoneNumbers={
                          handleSelectedPhoneNumbersFromChild
                        }
                      />
                    </div>
                  )}
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                  />

                  <div className="photos-input__photo-controls">
                    <button
                      className="photos-input__remove-control"
                      onClick={() => handleImageRemove(index)}
                    >
                      <img src={Close} alt="Remove" />
                    </button>
                    <button
                      className="photos-input__add-user-control"
                      onClick={() => handleAddMembersButtonClick(index)}
                    >
                      <img
                        className="photos-input__add-user-control-icon"
                        src={AddMembers}
                        alt="Add Members"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
