import { useState } from "react";
import PhotoDropLogo from "/photoDropLogo.svg";
import UserIcon from "/userIcon.svg";
import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  const [isUserControlsVisible, setIsUserControlsVisible] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img
            className="header__logo"
            src={PhotoDropLogo}
            onClick={() => {
              navigate("/");
            }}
          />
          <div className="header__user">
            <img
              className="header__user-icon"
              src={UserIcon}
              onClick={() => {
                setIsUserControlsVisible(!isUserControlsVisible);
              }}
            />
            {isUserControlsVisible && (
              <div className="header__user-controls">
                <button
                  className="header__user-controls-button"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
