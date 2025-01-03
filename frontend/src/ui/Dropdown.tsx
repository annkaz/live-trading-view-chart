import React, { useEffect, useRef, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (value: DropdownOption) => void;
  label?: string;
  unstyled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  label,
  unstyled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: DropdownOption) => {
    onSelect(value);
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
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {label && <p className="text-gray-400 text-sm mb-1">{label}</p>}
      <div
        className={
          unstyled
            ? "relative text-white w-8 cursor-pointer"
            : "relative bg-gray-800 p-2 rounded-md text-white w-36 cursor-pointer flex justify-between items-center"
        }
        onClick={toggleDropdown}
      >
        <span>{selected.label}</span>
        {!unstyled && (isOpen ? <FiChevronUp /> : <FiChevronDown />)}
      </div>

      {isOpen && (
        <ul
          className="
          absolute left-0 mt-1 bg-gray-900 rounded-sm shadow-lg 
          text-white w-32 z-50 overflow-y-auto max-h-48 scrollbar-hide"
        >
          {options.map((option) => (
            <li
              key={option.label}
              className="p-2 hover:bg-gray-700 cursor-pointer text-sm"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
