import { ReactNode } from "react";
import { createPortal } from "react-dom";

type FilterModalProp = {
  children: ReactNode;
  closeModal: () => void;
};
const FilterModal = ({ children, closeModal }: FilterModalProp) => {
  return createPortal(
    <div>
      <div
        className="top-[0] opacity-[0.5] fixed bg-black h-screen w-screen z-[20]"
        onClick={closeModal}
      ></div>

      <div>{children}</div>
    </div>,
    document.body
  );
};

export default FilterModal;
