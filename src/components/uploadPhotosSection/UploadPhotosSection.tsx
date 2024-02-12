import React, { useState, useRef, useEffect } from "react";
import { Container } from "@/globalStyle";
import xMarkSvg from "./assets/x-mark.svg";
import addMemberSvg from "./assets/members-add-users.svg";
import {
  UploadPhotos,
  BackToMenu,
  ButtonsContainer,
  InputPhotos,
  InputWrapper,
  RemoveAllPhotos,
  UploadPhotosSectionContainer,
  PhotosGrid,
  PhotoControls,
} from "./uploadPhotosSectionStyles";
import AddUsersForm from "../addUsersToPhotoForm/AddUsersForm";
import { useParams } from "react-router-dom";
import AttachNumbersAlert from "./AttachNumbersAlert";
import { getAvailableNumbers } from "@/api";
import { uploadPhotos } from "@/utils/photosUploader";
import { AvailableUser } from "@/models/user";

const UploadPhotosSection = () => {
  const { id } = useParams();
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [isUserSelectionVisible, setIsSectionVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [selectedUsers, setSelectedUsers] = useState<
    Map<string, AvailableUser[]>
  >(new Map());
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
    /*await attachUsersToPhoto({
      albumId: id as string,
      userPhotoMap: selectedNumbersMapToJSON(selectedPhoneNumbers),
    });*/
    console.log(selectedUsers);
    const a = await uploadPhotos(selectedImages, id as string);
    console.log(a);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSelectedImages: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isDuplicate = selectedImages.some(
          (selectedFile) => selectedFile.name === file.name
        );
        if (!isDuplicate) {
          newSelectedImages.push(file);
        } else {
          console.log(`File with name ${file.name} already exists.`);
        }
      }
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...newSelectedImages,
      ]);
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
  return (
    <Container>
      {alertMessage && (
        <AttachNumbersAlert
          message={alertMessage}
          duration={1000}
          onClose={() => setAlertMessage("")}
        />
      )}
      <UploadPhotosSectionContainer>
        {selectedImages.length > 0 && (
          <PhotosGrid>
            {selectedImages.map((image, index) => (
              <div key={index}>
                <PhotoControls>
                  <button onClick={() => handleImageRemove(index)}>
                    <img src={xMarkSvg} alt="Remove" />
                  </button>
                  <button onClick={() => handleAddMembersButtonClick(index)}>
                    <img src={addMemberSvg} alt="Add Members" />
                  </button>
                </PhotoControls>
                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                {isUserSelectionVisible && selectedImageIndex === index && (
                  <AddUsersForm
                    users={users}
                    onClose={handleCloseForm}
                    photoKey={image.name}
                    existingUsersPhoto={selectedUsers}
                    onSelectedPhoneNumbers={handleSelectedPhoneNumbersFromChild}
                  ></AddUsersForm>
                )}
              </div>
            ))}
          </PhotosGrid>
        )}
        <ButtonsContainer>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {selectedImages.length > 0 && (
                <RemoveAllPhotos onClick={handleClearPhotos}>
                  Clear
                </RemoveAllPhotos>
              )}
              <InputWrapper>
                <span className="label">
                  <a>Choose photos</a>
                </span>
                <InputPhotos
                  type="file"
                  placeholder="Upload photos"
                  multiple
                  onChange={handleImageChange}
                  ref={fileInputRef}
                ></InputPhotos>
              </InputWrapper>
              {selectedImages.length > 0 && (
                <UploadPhotos onClick={handleUploadClick}>Upload</UploadPhotos>
              )}
              <BackToMenu onClick={() => (window.location.href = "/")}>
                Back
              </BackToMenu>
            </>
          )}
        </ButtonsContainer>
      </UploadPhotosSectionContainer>
    </Container>
  );
};

export default UploadPhotosSection;
