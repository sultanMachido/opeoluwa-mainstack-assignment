import { ReactNode, useState } from "react";
import dropdownIcon from "../assets/icons/expand_more.svg";
import showLessIcon from "../assets/icons/expand_less.svg";

type DropdownInputProps = {
  children: ReactNode;
  selectedValues: string[];
};

const DropdownInput = ({ children, selectedValues }: DropdownInputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div
        className={`cursor-pointer h-[52px] relative w-full bg-[${
          showDropdown
            ? "#FFFFFF border-solid border-2  border-black"
            : "#EFF1F6"
        }] px-[16px] py-[14px] rounded-[12px] flex justify-between w-5/12`}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        <p className="truncate w-[93%] overflow-hidden text-sm">
          {selectedValues.join(",")}
        </p>
        {showDropdown ? <img src={showLessIcon} /> : <img src={dropdownIcon} />}
      </div>
      {showDropdown && (
        <div className="absolute w-full bg-white rounded-md shadow-md p-[20px] z-[30] top-[58px] left-[0px]">
          {children}
        </div>
      )}
    </>
  );
};

export default DropdownInput;
