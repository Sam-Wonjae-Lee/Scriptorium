import React, { useState, useRef, useEffect } from "react";
import { Option } from "@/utils/types";

interface MultiSelectDropdownProps {
  placeholder: string;
  searchPlaceholder: string;
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  placeholder,
  searchPlaceholder,
  options,
  selectedOptions,
  setSelectedOptions,
  query,
  onQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveClick = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
  };

  const getOptionColor = (option: {
    id: number;
    name: string;
    color?: string;
  }) => {
    return option.color ? option.color : "";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative border-2 ${
        selectedOptions.length == 0 ? "px-4" : "px-2"
      } ${
        isOpen
          ? "rounded-t-22 border-hot_pink-normal dark:border-hot_pink-normal"
          : "rounded-22 border-text-light dark:border-text-dark"
      }  text-text-light dark:text-text-dark p-2 w-full select-none cursor-pointer`}
      ref={dropdownRef}
    >
      <div
        className="flex items-center gap-2 container flex-wrap w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option.id}
              className={`flex justify-between items-center gap-1 px-2 rounded-full ${
                option.color
                  ? ""
                  : "bg-element_background-light dark:bg-element_background-dark"
              }`}
              style={{ backgroundColor: getOptionColor(option) }}
            >
              <span>{option.name} </span>
              <div
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveClick(option);
                }}
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div
          style={{ left: "-1px" }}
          className={`absolute w-full sm:w-80 md:w-96 rounded-b-22 lg:rounded-tr-22 md:rounded-tr-22 p-2 bottom-0 translate-y-full z-50 border-2 ${
            isOpen
              ? "border-hot_pink-normal dark:border-hot_pink-normal"
              : "border-text-light dark:border-text-dark"
          } bg-background-light dark:bg-background-dark flex items-center gap-2 container flex-wrap`}
        >
          {/* Search */}
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full px-2 py-1 mb-2 outline-none bg-transparent border-b-2 border-text-light dark:border-text-dark text-text-light dark:text-text-dark"
          />
          {/* TAGS */}
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-2 rounded-full cursor-pointer select-none ${
                option.color
                  ? ""
                  : "bg-element_background-light dark:bg-element_background-dark"
              }`}
              onClick={() => handleOptionClick(option)}
              style={{ backgroundColor: getOptionColor(option) }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
