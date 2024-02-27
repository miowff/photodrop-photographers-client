import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import PhotoDropLogo from "/photoDropLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username") as string;
  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("username");
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
          {location.pathname !== "/login" && (
            <div className="header__user">
              <p className="header__user-name">({username}) </p>
              <p className="header__user-exit" onClick={handleLogOut}>
                Exit
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
