import { signIn } from "@/api";
import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import {
  INCORRECT_PASSWORD,
  UNEXPECTED_ERROR,
  USER_NOT_FOUND,
} from "@/enums/errorMessages";
import { BaseError } from "@/models/error";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../alert/Alert";
import { useHandleEnterPush } from "@/hooks/handleEnterPush";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDataSending, setIsDataSending] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsDataSending(true);
      const token = await signIn({ password, login });
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem("username", login);
      setIsDataSending(false);
      navigate("/");
    } catch (error) {
      handleLoginError(error);
      setIsDataSending(false);
    }
  };
  useHandleEnterPush(async () => {
    try {
      setIsDataSending(true);
      const token = await signIn({ password, login });
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem("username", login);
      setIsDataSending(false);
      navigate("/");
    } catch (error) {
      handleLoginError(error);
      setIsDataSending(false);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginError = (error: any) => {
    const { response } = error as BaseError;
    const { status } = response;
    switch (status) {
      case 401: {
        setAlertMessage(INCORRECT_PASSWORD);
        break;
      }
      case 404: {
        setAlertMessage(USER_NOT_FOUND);
        break;
      }
      default: {
        setAlertMessage(UNEXPECTED_ERROR);
        break;
      }
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1800);
  };
  useEffect(() => {
    console.log("xzc")
    inputRef.current?.focus();
  }, []);
  return (
    <div className="login-form">
      <div className="container">
        {showAlert && <Alert message={alertMessage} isError={true} />}
        <div className="login-form__inner-content">
          <div className="login-form__title-container">
            <h4 className="login-form__title">Sign in </h4>
          </div>
          <form className="login-form__inputs" onSubmit={handleLogin}>
            <p className="login-form__text">Username:</p>
            <input
              ref={inputRef}
              className="login-form__input-login login-form__input"
              placeholder="username"
              required
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            ></input>
            <p className="login-form__text">Password:</p>
            <input
              className="login-form__input-password login-form__input"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <div className="login-form__button-container">
              <button
                className="login-form__button"
                disabled={
                  password.length === 0 || login.length === 0 || isDataSending
                }
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
