import React from "react";

export const getSendIcon = () => {
  return (
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
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
};

export const getForkIcon = () => {
  return (
    <svg
      viewBox="0 -0.5 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-text-light dark:text-text-dark"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 5C5.5 3.89543 6.39543 3 7.5 3C8.60457 3 9.5 3.89543 9.5 5C9.5 6.10457 8.60457 7 7.5 7C6.96957 7 6.46086 6.78929 6.08579 6.41421C5.71071 6.03914 5.5 5.53043 5.5 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 5C15.5 3.89543 16.3954 3 17.5 3C18.6046 3 19.5 3.89543 19.5 5C19.5 6.10457 18.6046 7 17.5 7C16.3954 7 15.5 6.10457 15.5 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 19C10.5 17.8954 11.3954 17 12.5 17C13.6046 17 14.5 17.8954 14.5 19C14.5 20.1046 13.6046 21 12.5 21C11.9696 21 11.4609 20.7893 11.0858 20.4142C10.7107 20.0391 10.5 19.5304 10.5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25002 7C8.25002 6.58579 7.91423 6.25 7.50002 6.25C7.08581 6.25 6.75002 6.58579 6.75002 7H8.25002ZM7.50002 10.03L8.25002 10.0331V10.03H7.50002ZM7.95302 11.479L8.57182 11.0552L8.56771 11.0493L7.95302 11.479ZM9.78602 12.454L9.78043 13.204H9.78602V12.454ZM15.214 12.454V13.204C15.2216 13.204 15.2291 13.2039 15.2366 13.2037L15.214 12.454ZM17.5 10.03H16.75C16.75 10.0371 16.7501 10.0442 16.7503 10.0513L17.5 10.03ZM18.25 7C18.25 6.58579 17.9142 6.25 17.5 6.25C17.0858 6.25 16.75 6.58579 16.75 7H18.25ZM11.75 17C11.75 17.4142 12.0858 17.75 12.5 17.75C12.9142 17.75 13.25 17.4142 13.25 17H11.75ZM13.25 12.455C13.25 12.0408 12.9142 11.705 12.5 11.705C12.0858 11.705 11.75 12.0408 11.75 12.455H13.25ZM6.75002 7V10.03H8.25002V7H6.75002ZM6.75003 10.0269C6.74727 10.6999 6.95276 11.3572 7.33833 11.9087L8.56771 11.0493C8.3595 10.7514 8.24852 10.3965 8.25001 10.0331L6.75003 10.0269ZM7.33425 11.9028C7.8876 12.7107 8.80124 13.1967 9.78043 13.204L9.79161 11.704C9.30333 11.7004 8.84773 11.458 8.57179 11.0552L7.33425 11.9028ZM9.78602 13.204H15.214V11.704H9.78602V13.204ZM15.2366 13.2037C16.9503 13.152 18.2985 11.7224 18.2497 10.0087L16.7503 10.0513C16.7756 10.938 16.078 11.6776 15.1914 11.7043L15.2366 13.2037ZM18.25 10.03V7H16.75V10.03H18.25ZM13.25 17V12.455H11.75V17H13.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const getCancelIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export const getEyeIcon = () => {
  return (
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
  );
};

export const getEyeSlashIcon = () => {
  return (
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

export const getReportIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
      />
    </svg>
  );
};

export const getInfoIcon = () => {
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
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
};

export const getEditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

export const getDeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};
