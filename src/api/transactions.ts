import { httpRequest } from ".";

const TRANSACTIONS_ENDPOINT = "/transactions";

export const getTransactions = () => {
  return httpRequest.get(TRANSACTIONS_ENDPOINT);
};
