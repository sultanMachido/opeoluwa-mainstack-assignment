import "./App.css";
import { useMakeRequestOnMount } from "./api";
import { getTransactions } from "./api/transactions";
import { getUserInfo } from "./api/user";
import { getWalletDetails } from "./api/wallet";
import Chart from "./components/chart";
import Fab from "./components/fab";
import NavigationBar from "./components/nav-bar";
import NavItems from "./components/nav-items";
import NavLogo from "./components/nav-logo";
import NavUser from "./components/nav-user";
import TransactionArea from "./components/transactions-area";
import TransactionStats from "./components/transactions-stat";

function App() {
  const { data: userInfo } = useMakeRequestOnMount(() => getUserInfo());
  const { data: walletDetails } = useMakeRequestOnMount(() =>
    getWalletDetails()
  );
  const { data: transactions } = useMakeRequestOnMount(() => getTransactions());

  return (
    <div>
      <Fab />
      <div id="filterModal"></div>
      <NavigationBar>
        <NavLogo />
        <NavItems />
        <NavUser userData={userInfo?.data} />
      </NavigationBar>
      <section className="w-[74%] mx-auto flex justify-between mt-10">
        <Chart
          transactions={transactions?.data}
          availableBalance={walletDetails?.data?.balance}
        />
        <TransactionStats walletData={walletDetails?.data} />
      </section>
      <TransactionArea transactionsData={transactions?.data} />
    </div>
  );
}

export default App;
