import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: { id: number; name: string; color?: string }[];
  selectedOptions: { id: number; name: string; color?: string }[];
  setSelectedOptions: (
    options: { id: number; name: string; color?: string }[]
  ) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: { id: number; name: string }) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    console.log(selectedOptions);
  };

  const handleRemoveClick = (option: { id: number; name: string }) => {
    console.log(selectedOptions);
  };

  const getOptionColor = (option: {
    id: number;
    name: string;
    color?: string;
  }) => {
    return option.color ? option.color : "transparent";
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
      className={`relative border-2  border-text-light dark:border-text-dark text-text-light dark:text-text-dark p-2 w-full`}
      ref={dropdownRef}
      // Keep consistent border radius when many tags are added
      style={{ borderRadius: "22px" }}
    >
      <div
        className="flex items-center gap-2 container flex-wrap w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option.id}
              className={`flex justify-between items-center gap-1 px-1 rounded-full`}
              style={{ backgroundColor: getOptionColor(option) }}
            >
              <span>{option.name} </span>
              <div className="w-5 h-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="text-text-light dark:text-text-dark"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <span>Select options</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute bottom-0 left-0 translate-y-full z-50 border-2 border-text-light dark:border-text-dark">
          {options.map((option) => (
            <div
              key={option.id}
              // className={`dropdown-option ${
              //   selectedOptions.includes(option) ? "selected" : ""
              // }`}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
