/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

type ApiResource = {
  url: string;
  config: { [key: string]: string | any };
  body?: { [key: string]: string };
};

const URL = "https://fe-task-api.mainstack.io";
const apiDependency = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});
const api = (apiService: any) => {
  return {
    post: (requestInfo: ApiResource) => {
      const { url, config, body } = requestInfo;
      return apiService.post(url, body, config);
    },
    get: (url: string) => {
      return apiService.get(url);
    },
  };
};

export const httpRequest = api(apiDependency);

export const useMakeRequestOnMount = (
  apiRequest: () => Promise<{ [key: string]: unknown }>
) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<unknown | null | any>(null);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    makeApiRequest();
  }, []);

  useEffect(() => {}, [data]);

  const makeApiRequest = async () => {
    try {
      const response = await apiRequest();

      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setData(response);
      }
    } catch (error) {
      setIsError(true);
      setError(error as any);
      setIsLoading(false);
    }
  };

  return {
    data,
    isError,
    error,
    isSuccess,
    isLoading,
  };
};
