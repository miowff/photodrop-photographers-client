import { useHandleOutsideClick } from "@/hooks/handleOutsideClick";
import { AvailableUser } from "@/models/user";
import { useRef, useState } from "react";

interface UsersProps {
  users: AvailableUser[];
  photoKey: string;
  existingUsersPhoto: Map<string, AvailableUser[]>;
  onClose: () => void;
  onSelectedPhoneNumbers: (usersPhoto: Map<string, AvailableUser[]>) => void;
}

export const AddUsers = ({
  users,
  photoKey,
  existingUsersPhoto,
  onClose,
  onSelectedPhoneNumbers,
}: UsersProps) => {
  const ref = useRef(null);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<AvailableUser[]>(
    existingUsersPhoto.get(photoKey) || []
  );
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
  useHandleOutsideClick(ref, () => {
    onClose();
  });

  return (
    <div className="add-users" ref={ref}>
      <input
        className="add-users__search-input"
        type="text"
        placeholder="Phone number"
        value={searchTerm}
        onChange={handleSearchChange}
      ></input>
      <div className="add-users__numbers-container">
        <ul className="add-users__numbers-list">
          {filteredUsers.map((user, index) => (
            <label key={index}>
              <li>
                <input
                  ref={checkBoxRef}
                  type="checkbox"
                  checked={selectedUsers.includes(user)}
                  onChange={() => handleCheckboxChange(user)}
                />
                <span className="add-users__number">{user.number}</span>
              </li>
            </label>
          ))}
        </ul>
      </div>
      <div className="add-users__buttons">
        <button
          className="add-users__button add-users__add"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
        <button
          className="add-users__button add-users__close"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
