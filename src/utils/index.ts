/* eslint-disable @typescript-eslint/no-explicit-any */
import { sub } from "date-fns";

export const showTransactionsInTheLast7Days = (
  transactions: {
    [key: string]: string;
  }[]
) => {
  const currentDate = new Date();
  const sevenDaysAgo = sub(currentDate, { days: 7 });
  const sevenDaysAgoAsTimestamp = sevenDaysAgo.getTime();

  return transactions?.filter((transaction) => {
    const transactionDateInTimeStamp = new Date(transaction?.date).getTime();
    if (transactionDateInTimeStamp >= sevenDaysAgoAsTimestamp) {
      return transaction;
    }
  });
};

export const convertToMilliseconds = (stringDate: string) => {
  return new Date(stringDate).getTime();
};

export const threeMonthsBeforeNow = () => {
  const currentDate = new Date();
  const threeMonthsAgo = sub(currentDate, { months: 3 });

  return threeMonthsAgo;
};

export const showTransactionsBetweenTimeRange = (
  from: string,
  to: string,
  transactions: {
    [key: string]: string;
  }[]
) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const fromDateAsTimestamp = fromDate.getTime();
  const toDateAsTimestamp = toDate.getTime();

  return transactions?.filter((transaction) => {
    const transactionDateInTimeStamp = new Date(transaction?.date).getTime();
    if (
      transactionDateInTimeStamp >= fromDateAsTimestamp &&
      transactionDateInTimeStamp <= toDateAsTimestamp
    ) {
      return transaction;
    }
  });
};

export const formatDate = (date: string) => {
  const inputDate = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${monthNames[inputDate.getMonth()]} ${inputDate
    .getDate()
    .toString()
    .padStart(2, "0")}, ${inputDate.getFullYear()}`;

  return formattedDate;
};

export const filterFunctions = () => {
  return {
    filteredData: [] as { [key: string]: string | any }[],
    filterByDate: function (
      query: { [key: string]: any },
      data: {
        [key: string]: string;
      }[]
    ) {
      if (query?.timeRange) {
        const transactions: { [key: string]: string | any }[] =
          showTransactionsBetweenTimeRange(
            query?.timeRange?.from,
            query?.timeRange?.to,
            data
          );
        this.filteredData = transactions;
      }
      return this;
    },
    filterByTransactionType: function (query: { [key: string]: any }) {
      if (query?.transactionTypes?.length) {
        const newData = query?.transactionTypes?.map((types: string) => {
          return this.filteredData.flat().filter((datum: any) => {
            return datum?.type === types;
          });
        });

        this.filteredData = newData;
      }
      return this;
    },
    filterByTransactionStatus: function (query: { [key: string]: any }) {
      if (this.filteredData?.length) {
        const newData = query?.transactionStatus?.map(
          (transactionStatus: string) => {
            return this.filteredData?.flat().filter((datum: any) => {
              return (
                datum?.status?.toLowerCase() === transactionStatus.toLowerCase()
              );
            });
          }
        );

        this.filteredData = newData;
      }
      return this;
    },
  };
};
