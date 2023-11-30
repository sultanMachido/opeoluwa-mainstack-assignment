/* eslint-disable @typescript-eslint/no-explicit-any */
import dropdownIcon from "../assets/icons/expand_more.svg";
import downloadIcon from "../assets/icons/download.svg";
import FilterModal from "./filter-modal";
import FilterForm from "./filter-form";
import { useState } from "react";
import { filterFunctions, threeMonthsBeforeNow } from "../utils";
import TransactionList from "./transactions-lists";
import { AnimatePresence } from "framer-motion";
import EmptyState from "./empty-state";

type TransactionAreaProps = {
  transactionsData: { [key: string]: any }[];
};

const TransactionArea = ({ transactionsData }: TransactionAreaProps) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredData, setShowFilteredData] = useState<
    { [key: string]: any }[]
  >([]);
  const [timeBasedfilterQuery, setTimeBasedFilterQuery] = useState({
    timeRange: {
      from: threeMonthsBeforeNow().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      to: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
  });
  const [queries, setQueries] = useState({});
  const [filteredResult, setFilteredResult] = useState(true);

  const addDateToTimeBasedQuery = (
    value: string,
    type: string,
    option: string
  ) => {
    let queryObject;
    if (type === "timeRange") {
      queryObject = {
        ...timeBasedfilterQuery,
        [type]: {
          ...timeBasedfilterQuery[type],
          [option]: value,
        },
      };
    }

    if (queryObject) {
      setTimeBasedFilterQuery(queryObject);
    }
  };

  const addContentToCategoryBasedQuery = (value: string[], type: string) => {
    const newQuery = {
      ...queries,
      [type]: value,
    };
    setQueries(newQuery);
  };

  const filterTransactions = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { filteredData } = filterFunctions()
      .filterByDate(timeBasedfilterQuery, transactionsData)
      .filterByTransactionType(queries)
      .filterByTransactionStatus(queries);
    setShowFilteredData(filteredData?.flat());

   

    if (!filteredData.flat()?.length) {
      setFilteredResult(false);
    }
  };

  let transactionCount = 0;
  if (filteredResult && filteredData?.length) {
    transactionCount = filteredData?.length;
  } else if (!filteredResult && !filteredData?.length) {
    transactionCount = 0;
  } else {
    transactionCount = transactionsData?.length;
  }

  return (
    <section className="w-[74%] mx-auto mt-[72px]">
      <AnimatePresence onExitComplete={() => setShowFilterModal(false)}>
        {showFilterModal && (
          <FilterModal closeModal={() => setShowFilterModal(false)}>
            <FilterForm
              isVisible={showFilterModal}
              closeModal={() => setShowFilterModal(false)}
              dates={timeBasedfilterQuery}
              addCategoryQueries={addContentToCategoryBasedQuery}
              addTimeQueries={addDateToTimeBasedQuery}
              filterTransactions={filterTransactions}
            />
          </FilterModal>
        )}
      </AnimatePresence>
      <div id="close"></div>

      <div className="flex justify-between border-b-solid border-b  border-b-[#EFF1F6] pb-[24px]">
        <div>
          <h3 className="text-[24px] font-[700]">
            {transactionCount} Transactions
          </h3>
          <p className="text-xs">Your transactions for the last 7 days</p>
        </div>
        <div className="w-[24%] flex justify-between">
          <button
            className="p-[2px] rounded-[100px] w-[107px] flex justify-center items-center bg-[#EFF1F6]"
            onClick={() => {
              setShowFilterModal(true);
            }}
          >
            <p className="text-sm font-[600]">Filter</p>
            {filteredData?.length ? (
              <span className="p-2 m-[1px] bg-black w-[20px] h-[20px] text-white text-xs flex justify-center items-center rounded-[50%]">
                {filteredData?.length}
              </span>
            ) : null}
            <img src={dropdownIcon} alt="" />
          </button>
          <button className="p-[2px] rounded-[100px] w-[139px] flex justify-center items-center bg-[#EFF1F6]">
            <p className="text-sm font-[600]">Export</p>
            <img src={downloadIcon} alt="" />
          </button>
        </div>
      </div>

      <div>
        {!filteredResult ? (
          <EmptyState setFilteredResult={() => setFilteredResult(true)} />
        ) : filteredResult && filteredData?.length ? (
          <TransactionList transactionData={filteredData} />
        ) : (
          <TransactionList transactionData={transactionsData} />
        )}
      </div>
    </section>
  );
};

export default TransactionArea;
