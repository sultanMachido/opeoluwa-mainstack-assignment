import { ReactNode } from "react";
import homeIcon from "../assets/icons/home.svg";
import analyticsIcon from "../assets/icons/analytics.svg";
import revenueIcon from "../assets/icons/revenue.svg";
import crmIcon from "../assets/icons/crm.svg";
import appIcon from "../assets/icons/apps.svg";

type NavLinkItem = { [key: string]: string | ReactNode };

const navItems: NavLinkItem[] = [
  {
    linkTitle: "Home",
    icon: homeIcon,
    isActive: false,
  },
  {
    linkTitle: "Analytics",
    icon: analyticsIcon,
    isActive: false,
  },
  {
    linkTitle: "Revenue",
    icon: revenueIcon,
    isActive: true,
  },
  {
    linkTitle: "CRM",
    icon: crmIcon,
    isActive: false,
  },
  {
    linkTitle: "Apps",
    icon: appIcon,
    isActive: false,
  },
];

const NavItems = () => {
  return (
    <div className="flex w-[38%] ml-[70px] justify-between">
      {navItems?.map((navLinks: NavLinkItem) => {
        return (
          <div
            className={`flex p-[10px] hover:bg-[#EFF1F6] hover:rounded-[100px] 
            ${navLinks.isActive ? "bg-black rounded-[100px]" : ""}
            `}
          >
            <img src={navLinks?.icon as string} alt="" />
            <a
              href="#"
              className={`text-[14px] font-bold pl-[4px] ${
                navLinks.isActive ? "text-white" : "text-[#56616B]"
              }`}
            >
              {navLinks?.linkTitle}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NavItems;
