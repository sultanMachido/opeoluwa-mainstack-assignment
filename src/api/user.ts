import { httpRequest } from ".";

const USER_ENDPOINT = "/user";

export const getUserInfo = async () => {
  return await httpRequest.get(USER_ENDPOINT);
};
