import { useEffect, useRef, useState } from "react";
import { AvailableUser } from "@/models/user";
import { attachUsersToPhoto, getAvailableNumbers } from "@/api";
import { uploadPhotos } from "@/utils/photosUploader";
import { AttachUsersToPhoto } from "@/models/photo";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert } from "../alert/Alert";
import { AddUsers } from "../photosInput/addUsers/AddUsers";

export const PhotosInput = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserSelectionVisible, setIsSectionVisible] = useState(false);
  const [isPhotosSent, setIsPhotosSent] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<
    Map<string, AvailableUser[]>
  >(new Map());
  const inputRef = useRef<HTMLInputElement>(null);
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
      console.log(attachUsersRequest);
      console.log("Attached users to photo");
    }, 10000);
    setSelectedImages([]);
    setIsLoading(false);
    setIsPhotosSent(true);
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
  const handleImageRemove = (index: number, itemName: string) => {
    selectedUsers.delete(selectedImages[index].name);
    const updatedImages = selectedImages.filter(
      (item) => item.name !== itemName
    );
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
      {alertMessage && <Alert message={alertMessage} isError={true} />}
      {isPhotosSent && (
        <Alert message="Photos sent successfully" isError={false} />
      )}
      <div className="container">
        <div className="photos-input__inner">
          <div className="photos-input__header">
            <h1 className="photos-input__title">{name}</h1>
            <div className="photos-input__controls">
              <div className="photos-input__input-wrapper">
                <span
                  className="input-label"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <a>Select</a>
                </span>
                <input
                  className="photos-input__input-photos"
                  type="file"
                  placeholder="Upload photos"
                  multiple
                  onChange={handleImageChange}
                  disabled={isLoading}
                  ref={inputRef}
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
          </div>

          {selectedImages.length > 0 && (
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
                        className="photos-input__remove-control photos-input__photo-control-button"
                        onClick={() => handleImageRemove(index, image.name)}
                      >
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
                          className="lucide lucide-x"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                      <button
                        className="photos-input__add-user-control photos-input__photo-control-button"
                        onClick={() => handleAddMembersButtonClick(index)}
                      >
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
                          className="lucide lucide-user-round-plus"
                        >
                          <path d="M2 21a8 8 0 0 1 13.292-6" />
                          <circle cx="10" cy="8" r="5" />
                          <path d="M19 16v6" />
                          <path d="M22 19h-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
