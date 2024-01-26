import useSWR from 'swr';
import { baseUrl } from './fetcher.ts';
import { createStatusFetcher } from './statusFetcher.ts';
import { setCookie } from '../utils/cookie.ts';

const useApiKey = (apiKey: string) => {
  const url = `${baseUrl}/}`;

  const {
    data: responseStatus,
    error,
  } = useSWR<number>([url], createStatusFetcher(apiKey));

  if (responseStatus === 200) {
    setCookie('apiStatus', 'success', 30); // Set cookie for 30 minutes
  }

  return {
    isSuccess: responseStatus === 200,
    isLoading: !responseStatus && !error,
    isError: error,
  };
};

export { useApiKey };
