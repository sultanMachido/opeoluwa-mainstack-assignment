import infoIcon from "../assets/icons/info.svg";

type TransactionStatsProps = {
  walletData: { [key: string]: string };
};

const TransactionStats = ({ walletData }: TransactionStatsProps) => {
  return (
    <div className="w-[30%] relative">
      <div className="mb-[32px]">
        <div className="flex justify-between">
          <p className="text-[#56616B] text-sm">Ledger Balance</p>
          <img src={infoIcon} alt="" />
        </div>
        <h3 className="text-[28px] font-[700]">
          USD {walletData?.ledger_balance || 0.0}
        </h3>
      </div>
      <div className="mb-[32px]">
        <div className="flex justify-between">
          <p className="text-[#56616B] text-sm">Total Payout</p>
          <img src={infoIcon} alt="" />
        </div>
        <h3 className="text-[28px] font-[700]">
          USD {walletData?.total_payout || 0.0}
        </h3>
      </div>
      <div className="mb-[32px]">
        <div className="flex justify-between">
          <p className="text-[#56616B] text-sm">Total Revenue</p>
          <img src={infoIcon} alt="" />
        </div>
        <h3 className="text-[28px] font-[700]">
          USD {walletData?.total_revenue || 0.0}
        </h3>
      </div>
      <div>
        <div className="flex justify-between">
          <p className="text-[#56616B] text-sm">Pending Payout</p>
          <img src={infoIcon} alt="" />
        </div>
        <h3 className="text-[28px] font-[700]">
          USD {walletData?.pending_payout || 0.0}
        </h3>
      </div>
    </div>
  );
};

export default TransactionStats;
