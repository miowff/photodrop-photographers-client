interface AlertProps {
  message: string;
  isError: boolean;
}

export const Alert: React.FC<AlertProps> = ({ message, isError }) => {
  return (
    <div className={`alert ${isError ? "error" : "success"}`}>{message}</div>
  );
};
