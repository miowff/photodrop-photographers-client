import { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  isError: boolean;
}

export const Alert: React.FC<AlertProps> = ({ message, isError }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`alert ${isError ? "error" : "success"}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      {message}
    </div>
  );
};
