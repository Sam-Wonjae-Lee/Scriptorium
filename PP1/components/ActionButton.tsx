import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  outlineButton?: boolean;
  secondaryButton?: boolean;
  size?: "small" | "medium" | "large";
}

const ActionButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  outlineButton = false,
  secondaryButton = false,
  size = "medium",
}) => {
  const getColorStyles = () => {
    if (!secondaryButton && !outlineButton) {
      return "bg-hot_pink-normal hover:bg-hot_pink-darken";
    } else if (!secondaryButton && outlineButton) {
      return "bg-transparent border-2 border-hot_pink-normal hover:border-hot_pink-darken hover:bg-hot_pink-darken";
    } else if (secondaryButton && !outlineButton) {
      return "bg-background_secondary-light dark:bg-background_secondary-dark hover:bg-background_tertiary-light dark:hover:bg-background_tertiary-dark";
    } else {
      return "bg-bagrounnd-light dark:bg-background-dark border-2 border-background_secondary-light dark:border-background_secondary-dark hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark";
    }
  };

  const getSizeStyles = () => {
    if (size === "small") {
      return "w-20 h-8";
    } else if (size === "medium") {
      return "w-28 h-12";
    } else {
      return "w-36 h-16";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer ${getSizeStyles()} rounded-full ${getColorStyles()} transition-colors duration-300`}
    >
      <p className="text-text-light dark:text-text-dark select-none">{text}</p>
    </button>
  );
};

export default ActionButton;
