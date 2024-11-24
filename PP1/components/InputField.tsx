import { getEyeIcon, getEyeSlashIcon } from "@/utils/svg";
import { get } from "http";
import { annotateDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";
import React, { useState, useEffect } from "react";

interface ButtonAction {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  buttonActions?: ButtonAction[];
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  hasError = false,
  errorMessage = "",
  secureTextEntry = false,
  buttonActions = [],
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  useEffect(() => {
    setIsSecure(secureTextEntry);
  }, [secureTextEntry]);

  const renderEyes = () => {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsSecure(!isSecure);
        }}
      >
        {isSecure ? getEyeIcon() : getEyeSlashIcon()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className=" h-full flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-999 p-3">
        {secureTextEntry && renderEyes()}
        {buttonActions.map((action, index) => (
          <div
            key={index}
            title={action.label}
            className="w-12 h-full flex items-center justify-center p-1 cursor-pointer"
            onClick={action.onClick}
          >
            {action.icon}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-row justify-between w-full relative h-10 md:h-12">
      <p
        className={`${
          hasError && errorMessage ? "" : "hidden"
        } absolute text-error-light dark:text-error-dark bg-background-light dark:bg-background-dark px-2 z-50 rounded-full -top-3 left-2`}
      >
        {errorMessage}
      </p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        type={isSecure ? "password" : "text"}
        className={`border-2 w-full h-full pl-4 ${
          hasError
            ? "border-error-light dark:border-error-dark"
            : "border-text-light dark:border-text-dark"
        } rounded-full text-text-light dark:text-text-dark bg-transparent focus:border-hot_pink-normal dark:focus:border-hot_pink-normal outline-none`}
      />
      {renderButtons()}
    </div>
  );
};

export default InputField;
