import receiptLogo from "../assets/icons/receipt_long.svg";

type EmptyStateProps = {
  setFilteredResult: (val: boolean) => void;
};
const EmptyState = ({ setFilteredResult }: EmptyStateProps) => {
  const clearFilter = () => {
    setFilteredResult(true);
  };
  return (
    <div className="w-[369px] mx-auto mt-[65px]">
      <div className="rounded-[16px] mb-[20px] flex justify-center items-center w-[48px] h-[48px] bg-[#DBDEE5]">
        <img src={receiptLogo} />
      </div>
      <div>
        <h3 className="text-[28px] font-[700]">
          No matching transaction found for the selected filter
        </h3>
      </div>
      <div className="my-[32px]">
        <button
          className="p-[2px] rounded-[100px] w-[177px] h-[48px] flex justify-center items-center bg-[#EFF1F6]"
          onClick={clearFilter}
        >
          <p className="text-sm font-[600]">Clear Filter</p>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
