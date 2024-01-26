import useSWR from 'swr';
import { Zone } from '../types.ts';
import { baseUrl, createFetcher } from './fetcher.ts';
import { getCookie } from '../utils/cookie.ts';

const useZones = () => {
  const apiKeyInCookie = getCookie('apiStatus'); // Assuming 'apiStatus' is the name of your cookie

  const {
    data: responseData,
    error: zonesError,
  } = useSWR<{
    data: Zone[]
  }>(`${baseUrl}/zones`, createFetcher(apiKeyInCookie ?? ''));


  return {
    zones: responseData?.data ?? [],
    isLoading: (!responseData && !zonesError),
    isError: zonesError,
  };
};

export { useZones };
