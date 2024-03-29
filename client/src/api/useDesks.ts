import useSWR from 'swr';
import { Desk } from '../types.ts';
import { baseUrl, createFetcher } from './fetcher.ts';
import { getCookie } from '../utils/cookie.ts';


const useDesks = (zoneIds: string[], count: number, unit: 'week' | 'day') => {
  const idsParam = zoneIds.join(',');
  console.log(idsParam);
  const url = `${baseUrl}/desks?zoneId=${encodeURIComponent(idsParam)}${count ? `&count=${count}` : ''}${unit ? `&unit=${unit}` : ''}`;
  const apiKeyInCookie = getCookie('apiStatus'); // Assuming 'apiStatus' is the name of your cookie

  const {
    data: responseData,
    error,
  } = useSWR<{ data: Desk[] }>([url], createFetcher(apiKeyInCookie ?? ''));

  const desks = responseData ? responseData.data : [];
  return {
    desks,
    isLoading: !responseData && !error,
    isError: error,
  };
};

export { useDesks };
