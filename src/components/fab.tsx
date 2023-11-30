import fabIcon1 from "../assets/icons/app-bar-list.svg";
import fabIcon2 from "../assets/icons/app-bar-list (1).svg";
import fabIcon3 from "../assets/icons/app-bar-list (2).svg";
import fabIcon4 from "../assets/icons/app-bar-list (3).svg";

const Fab = () => {
  return (
    <div className="fixed top-[40%] left-[3%] flex flex-col w-[48px] h-[192px] rounded-[100px] shadow-md">
      <img src={fabIcon1} />
      <img src={fabIcon2} />
      <img src={fabIcon3} />
      <img src={fabIcon4} />
    </div>
  );
};

export default Fab;
