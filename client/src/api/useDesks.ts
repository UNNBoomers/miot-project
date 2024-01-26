import useSWR from 'swr';
import { Desk } from '../types.ts';
import { baseUrl, createFetcher } from './fetcher.ts';


const useDesks = (zoneIds: string[]) => {
  const idsParam = zoneIds.join(',');
  console.log(idsParam);
  const url = `${baseUrl}/desks?zoneId=${encodeURIComponent(idsParam)}`;

  const {
    data:responseData,
    error,
  } = useSWR<{data:Desk[]}>([url], createFetcher('fake-building-123.e8299464-1e24-4b11-95aa-f7c6a4baa9be\n'));

  const desks = responseData ? responseData.data : [];
  return {
    desks,
    isLoading: !responseData && !error,
    isError: error,
  };
};

export { useDesks };
