import notificationIcon from "../assets/icons/notifications.svg";
import messageIcon from "../assets/icons/chat.svg";
import menuIcon from "../assets/icons/menu.svg";
import { useState } from "react";

const dropdownItems = [
  "Settings",
  "Purchase History",
  "Refer and Earn",
  "Integrations",
  "Report Bug",
  "Switch Account",
  "Sign Out",
];

type NavUserProps = {
  userData: { [key: string]: string };
};

const NavUser = ({ userData }: NavUserProps) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const showDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const hideDropdown = () => {
    setDisplayDropdown(false);
  };
  const userAbbreviation: string = userData
    ? userData?.first_name[0] + userData?.last_name[0]
    : "";
  return (
    <div className="relative flex w-[15%] justify-around items-center z-1">
      <div>
        <img src={notificationIcon} alt="" />
      </div>
      <div>
        <img src={messageIcon} alt="" />
      </div>
      <div
        className="cursor-pointer bg-[#EFF1F6] w-[85px] rounded-[100px] p-[5px] flex items-center justify-around"
        onClick={showDropdown}
        onBlur={hideDropdown}
      >
        <div className="p-[8px] flex items-center justify-center w-[32px] h-[32px] bg-black rounded-[100%] text-white">
          <p>{userAbbreviation?.toUpperCase() || ""}</p>
        </div>
        <div>
          <img src={menuIcon} alt="" />
        </div>
      </div>
      {displayDropdown && (
        <div className="z-10 bg-white absolute top-[60px] w-[400px] shadow-md right-[12px] p-5 rounded-md">
          <div className="flex ">
            <div className="p-[8px] flex items-center justify-center w-[52px] h-[52px] bg-black rounded-[100%]  text-white">
              <p>{userAbbreviation?.toUpperCase() || ""}</p>
            </div>
            <div className="pl-2">
              <h4 className="font-bold text-lg">
                {userData?.first_name + " " + userData?.last_name}
              </h4>
              <p className="text-[#56616B] text-[14px]">{userData?.email}</p>
            </div>
          </div>
          <div className="mt-5">
            <ul>
              {dropdownItems.map((item) => (
                <li className="p-3 text-[14px] font-bold">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavUser;
