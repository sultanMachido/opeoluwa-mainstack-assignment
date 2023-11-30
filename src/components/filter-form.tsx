/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import cancelIcon from "../assets/icons/cancel.svg";
import DateInput from "./date-input";
import DropdownInput from "./dropdown-input";
import { transactionStatus, transactionTypes } from "../constants";
import CheckboxInput from "./checkbox-input";
import { AnimatePresence, motion } from "framer-motion";

type FilterFormProps = {
  isVisible: boolean;
  closeModal: () => void;
  addCategoryQueries: (value: string[], type: string) => void;
  dates: { [key: string]: any };
  addTimeQueries: (value: string, type: string, option: string) => void;
  filterTransactions: (event: { preventDefault: () => void }) => void;
};

const FilterForm = ({
  isVisible,
  closeModal,
  addCategoryQueries,
  dates,
  addTimeQueries,
  filterTransactions,
}: FilterFormProps) => {
  const calendarDiv = useRef(null);
  const [selectedTransactionTypes, setSelectedTransactionType] = useState<
    string[]
  >([...transactionTypes.map((type) => type?.value)]);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<
    string[]
  >([...transactionStatus.map((type) => type?.value)]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (selectedTransactionStatus.length) {
      addCategoryQueries(selectedTransactionStatus, "transactionStatus");
    }
  }, [selectedTransactionStatus]);

  useEffect(() => {
    if (selectedTransactionTypes.length) {
      addCategoryQueries(selectedTransactionTypes, "transactionTypes");
    }
  }, [selectedTransactionTypes]);

  const toggleTransactionTypeSelect = (
    event: { target: { checked: boolean } },
    value: string
  ) => {
    if (event.target.checked) {
      const newValue: string[] = [...selectedTransactionTypes];
      newValue.push(value);
      setSelectedTransactionType(newValue);
    } else {
      const newValue: string[] = [...selectedTransactionTypes];
      const filteredValue = newValue.filter(
        (transactionType) => transactionType !== value
      );
      setSelectedTransactionType(filteredValue);
    }
  };

  const toggleTransactionStatusSelect = (
    event: { target: { checked: boolean } },
    value: string
  ) => {
    if (event.target.checked) {
      const newValue: string[] = [...selectedTransactionStatus];
      newValue.push(value);
      setSelectedTransactionStatus(newValue);
    } else {
      const newValue: string[] = [...selectedTransactionStatus];
      const filteredValue = newValue.filter(
        (transactionType) => transactionType !== value
      );
      setSelectedTransactionStatus(filteredValue);
    }
  };

  const clearInputs = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSelectedTransactionStatus([]);
    setSelectedTransactionType([]);
  };

  useEffect(() => {
    if (selectedTransactionTypes?.length > 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedTransactionTypes]);
  const handleToggleVisibility = () => {
    closeModal();
  };
  return (
    <>
      <AnimatePresence onExitComplete={handleToggleVisibility}>
        {isVisible && (
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ x: 700 }}
            className={` w-[480px] bg-white h-[760px] z-[30] top-[10px] rounded-md  right-[0] fixed slide-in-out`}
          >
            <div className="w-[90%] mx-auto">
              <div className="flex  justify-between mt-[20px]">
                <h3 className="text-[28px] font-[700]">Filter</h3>

                <span
                  className="cursor-pointer hover:bg-[#EFF1F6] rounded-[50%] flex items-center justify-center"
                  onClick={closeModal}
                >
                  <img src={cancelIcon} />
                </span>
              </div>
              <div className="flex justify-between mb-[28px] mt-[20px]">
                <div className="rounded-[100px] hover:bg-[#EFF1F6] font-[600] text-[#131316] border border-solid border-[#EFF1F6]">
                  <p className="text-sm p-2">Today</p>
                </div>
                <div className="rounded-[100px] hover:bg-[#EFF1F6] font-[600] text-[#131316] border border-solid border-[#EFF1F6]">
                  <p className="text-sm p-2">Last 7 days</p>
                </div>
                <div className="rounded-[100px] hover:bg-[#EFF1F6] font-[600] text-[#131316] border border-solid border-[#EFF1F6]">
                  <p className="text-sm p-2">This month</p>
                </div>
                <div className="rounded-[100px] hover:bg-[#EFF1F6] font-[600] text-[#131316] border border-solid border-[#EFF1F6]">
                  <p className="text-sm p-2">Last 3 months</p>
                </div>
              </div>
              <form>
                <div className="mb-[24px] h-[80px]">
                  <p className="text-sm font-[600] pb-[12px]">Date Range</p>
                  <div className="relative flex justify-between">
                    <div>
                      <DateInput
                        calendarSectionId={calendarDiv}
                        addTimeRangeToQuery={addTimeQueries}
                        option="from"
                        startDate={dates?.timeRange?.from}
                      />
                    </div>
                    <div>
                      <DateInput
                        calendarSectionId={calendarDiv}
                        addTimeRangeToQuery={addTimeQueries}
                        option="to"
                        startDate={dates?.timeRange?.to}
                      />
                    </div>
                    <div ref={calendarDiv}></div>
                  </div>
                </div>
                <div className="mb-[24px] h-[86px]">
                  <p className="text-sm font-[600] pb-[12px]">
                    Transaction Type
                  </p>
                  <div className="relative">
                    <DropdownInput selectedValues={selectedTransactionTypes}>
                      {transactionTypes.map((type) => (
                        <CheckboxInput
                          label={type?.label}
                          toggleSelect={toggleTransactionTypeSelect}
                          value={type?.value}
                          selectedValues={selectedTransactionTypes}
                        />
                      ))}
                    </DropdownInput>
                  </div>
                  {selectedTransactionTypes?.length > 1 ? (
                    <p className="text-xs text-red-500 pl-2 h-[2px]">
                      Select one Transaction type to proceed
                    </p>
                  ) : null}
                </div>

                <div>
                  <p className="text-sm font-[600] pb-[12px]">
                    Transaction Status
                  </p>
                  <div className="relative">
                    <DropdownInput selectedValues={selectedTransactionStatus}>
                      {transactionStatus.map((status) => (
                        <CheckboxInput
                          label={status?.label}
                          toggleSelect={toggleTransactionStatusSelect}
                          value={status?.value}
                          selectedValues={selectedTransactionStatus}
                        />
                      ))}
                    </DropdownInput>
                  </div>
                </div>

                <div className="flex justify-between mt-[258px]">
                  <div>
                    <button
                      className="border border-solid bg-white rounded-[100px] h-[48px] w-[198px] border-[#EFF1F6] text-sm"
                      onClick={clearInputs}
                    >
                      Clear
                    </button>
                  </div>
                  <div>
                    <button
                      disabled={disabled}
                      className={`border border-solid ${
                        disabled ? "bg-grey" : "bg-[#131316]"
                      } text-white rounded-[100px] h-[48px] w-[198px] border-[#EFF1F6] text-sm`}
                      onClick={(event) => {
                        event.preventDefault();
                        filterTransactions(event);
                        closeModal();
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterForm;
