import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
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
      className={`relative border-2 "px-4"
       ${
         isOpen
           ? "rounded-t-22 border-hot_pink-normal dark:border-hot_pink-normal"
           : "rounded-22 border-text-light dark:border-text-dark cursor-pointer"
       }  text-text-light dark:text-text-dark p-2 w-44 select-none`}
      ref={dropdownRef}
    >
      <div
        className="flex items-center gap-2 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{`Sort by ${selectedOption}`}</span>
      </div>
      {isOpen && (
        <div
          // FIXME: I legit couldnt get this to work with tailwind, so I had to use inline styles
          style={{ left: "-1px" }}
          className={`absolute w-44 rounded-b-22  bottom-0 translate-y-full z-50 border-2 ${
            isOpen
              ? "border-hot_pink-normal dark:border-hot_pink-normal"
              : "border-text-light dark:border-text-dark"
          } bg-background-light dark:bg-background-dark flex flex-col gap-2 overflow-hidden`}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-1 cursor-pointer select-none hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
