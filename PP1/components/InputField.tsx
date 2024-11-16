import React, { useState, useEffect } from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  hasError = false,
  errorMessage = "",
  secureTextEntry = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  useEffect(() => {
    setIsSecure(secureTextEntry);
  }, [secureTextEntry]);

  const renderViewSecureTextButton = () => {
    return (
      <div
        className="w-12 h-full flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-999 p-3 cursor-pointer"
        onClick={() => {
          setIsSecure(!isSecure);
        }}
      >
        {isSecure ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-text-light dark:text-text-dark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-text-light dark:text-text-dark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="flex-row justify-between w-full relative mb-4 h-10 md:h-12">
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
      {secureTextEntry && renderViewSecureTextButton()}
    </div>
  );
};

export default InputField;
