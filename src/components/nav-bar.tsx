import { ReactNode } from "react";

type NavigationBarProps = {
  children: ReactNode;
};

const NavigationBar = ({ children }: NavigationBarProps) => {
  return (
    <section className="rounded-[100px] w-[95%] h-[64px] bg-white mx-auto shadow-md flex items-center px-[24px] mt-[16px] justify-between">
      {children}
    </section>
  );
};

export default NavigationBar;
