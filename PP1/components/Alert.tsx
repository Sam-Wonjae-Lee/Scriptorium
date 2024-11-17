import React, { useState, useEffect } from "react";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  message: string;
  type: AlertType;
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return (
    <div
      className={`flex justify-between items-center gap-2 fixed p-2 top-2 z-50 left-1/2 -translate-x-1/2 border-2 rounded border-text-light dark:border-text-dark`}
    >
      <div className="w-6 h-6">{getTypeIcon(type)}</div>
      <div>{message}</div>
    </div>
  );
};

const getTypeIcon = (type: AlertType) => {
  switch (type) {
    case "error":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className=" text-text-light dark:text-text-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      );
    case "info":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className=" text-text-light dark:text-text-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      );
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-text-light dark:text-text-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      );
  }
};

export const showAlert = (
  message: string,
  type: "success" | "error" | "info"
) => {
  const event = new CustomEvent("showAlert", { detail: { message, type } });
  window.dispatchEvent(event);
};

export const AlertListener: React.FC = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const handleShowAlert = (event: CustomEvent) => {
      setAlert(event.detail);
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    };

    window.addEventListener("showAlert", handleShowAlert as EventListener);

    return () => {
      window.removeEventListener("showAlert", handleShowAlert as EventListener);
    };
  }, []);

  if (!alert) return null;

  return <Alert message={alert.message} type={alert.type} />;
};
