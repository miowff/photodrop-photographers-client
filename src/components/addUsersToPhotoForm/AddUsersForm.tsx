import React, { useState } from "react";
import {
  FormButtonsContainer,
  FormContainer,
  NumbersContainer,
} from "./addUsersFormStyles";
import { AvailableUser } from "@/models/user";

export interface UsersPhoto {
  phoneNumbers: string[];
  photoId: number;
}

interface UsersProps {
  users: AvailableUser[];
  photoKey: string;
  existingUsersPhoto: Map<string, AvailableUser[]>;
  onClose: () => void;
  onSelectedPhoneNumbers: (usersPhoto: Map<string, AvailableUser[]>) => void;
}

const AddUsersForm: React.FC<UsersProps> = ({
  users,
  photoKey,
  existingUsersPhoto,
  onClose,
  onSelectedPhoneNumbers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<AvailableUser[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (user: AvailableUser) => {
    setSelectedUsers((prevUsers) => {
      if (prevUsers.includes(user)) {
        return prevUsers.filter((existsUser) => existsUser !== user);
      } else {
        return [...prevUsers, user];
      }
    });
  };

  const handleAddButtonClick = () => {
    existingUsersPhoto.delete(photoKey);
    existingUsersPhoto.set(photoKey, selectedUsers);
    onSelectedPhoneNumbers(existingUsersPhoto);
    onClose();
  };

  const filteredUsers = users.filter(({ number }) =>
    number.includes(searchTerm)
  );

  return (
    <FormContainer>
      <input
        type="text"
        placeholder="Phone number"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <NumbersContainer>
          <ul>
            {filteredUsers.map((user, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(user)}
                />
                <span>{user.number}</span>
              </li>
            ))}
          </ul>
        </NumbersContainer>
      </div>
      <FormButtonsContainer>
        <button onClick={handleAddButtonClick}>Add</button>
        <button onClick={onClose}>Close</button>
      </FormButtonsContainer>
    </FormContainer>
  );
};

export default AddUsersForm;
