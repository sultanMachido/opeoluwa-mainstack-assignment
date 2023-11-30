import { httpRequest } from ".";

const WALLET_ENDPOINT = "/wallet";

export const getWalletDetails = () => {
  return httpRequest.get(WALLET_ENDPOINT);
};
