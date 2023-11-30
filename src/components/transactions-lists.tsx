/* eslint-disable @typescript-eslint/no-explicit-any */
import depositIcon from "../assets/icons/call_received.svg";
import withdrawalIcon from "../assets/icons/call_made.svg";
import { formatDate } from "../utils";

type TransactionDataRowProps = {
  data: { [key: string]: any };
};
type TransactionListProps = {
  transactionData: { [key: string]: any }[];
};
const TransactionDataRow = ({ data }: TransactionDataRowProps) => {
  return (
    <div className="flex justify-between h-[49px] my-[24px]">
      <div className="flex">
        <div>
          {data?.type === "deposit" ? (
            <div className="w-[45px] mr-2 h-[45px] bg-[#E3FCF2] flex items-center justify-center rounded-[50%]">
              <img src={depositIcon} alt="" />
            </div>
          ) : (
            <div className="w-[45px] mr-2  h-[45px] bg-[#F9E3E0] flex items-center justify-center rounded-[50%]">
              <img src={withdrawalIcon} alt="" />
            </div>
          )}
        </div>
        <div className="">
          {data?.type === "deposit" && (
            <>
              <h4 className="text-sm text-[#131316] font-[500] pb-[8px]">
                {data?.metadata?.product_name || "NILL"}
              </h4>
              <p className="text-xs text-[#56616B]">{data?.metadata?.name}</p>
            </>
          )}
          {data?.type === "withdrawal" && (
            <>
              <h4 className="text-sm text-[#131316] font-[500] pb-[8px]">
                Cash Withdrawal
              </h4>
              {data?.status === "successful" && (
                <p className="text-xs text-[#0EA163]">
                  {data?.status[0].toUpperCase() + data?.status.slice(1)}
                </p>
              )}
              {data?.status === "pending" && (
                <p className="text-xs text-[#961100]">
                  {data?.status[0].toUpperCase() + data?.status.slice(1)}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-[#131316] text-right text-sm font-[700] pb-[8px]">
          USD {data?.amount}
        </h4>
        <p className="text-xs text-right text-[#56616B]">
          {formatDate(data?.date)}
        </p>
      </div>
    </div>
  );
};

const TransactionList = ({ transactionData }: TransactionListProps) => {
  return (
    <div>
      {transactionData?.length
        ? transactionData.map((data: { [key: string]: any }) => (
            <TransactionDataRow data={data} />
          ))
        : null}
    </div>
  );
};

export default TransactionList;
