import { convertToMilliseconds, formatDate } from "../utils";
import LineChart from "./line-chart";

type ChartProps = {
  transactions: { [key: string]: string }[];
  availableBalance: string;
};

const Chart = ({ transactions, availableBalance }: ChartProps) => {
  const copyOfTransaction = [...[transactions]];
  const transactionsSortedByDate = copyOfTransaction?.flat().sort((a, b) => {
    return convertToMilliseconds(a?.date) - convertToMilliseconds(b?.date);
  });
  const chartData = transactionsSortedByDate?.map((transaction) =>
    Number(transaction?.amount)
  );

  const firstDate = formatDate(transactionsSortedByDate?.[0]?.date);
  const currentDate = formatDate(new Date().toDateString());

  return (
    <div className="w-[60%]">
      <div className="flex items-center">
        <div className="mr-5 w-[231px]">
          <p className="text-sm">Available Balance</p>
          <h3 className="text-[24px] font-[700]">
            USD {availableBalance || 0.0}
          </h3>
        </div>
        <div>
          <button className="bg-[#131316] text-sm text-white px-[28px] py-[14px] rounded-[100px]">
            Withdraw
          </button>
        </div>
      </div>
      <div className="w-full">
        {chartData?.length && (
          <>
            <LineChart data={chartData} />
            <hr className="border-[#DBDEE5]" />
            <span className="flex justify-between pt-2">
              <p className="text-xs">{firstDate}</p>
              <p className="text-xs">{currentDate}</p>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Chart;
