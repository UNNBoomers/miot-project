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
  } = useSWR<{data:Desk[]}>([url], createFetcher('fake-building-123.833ec0da-7ceb-4031-9fb4-f9755ebe0625'));

  const desks = responseData ? responseData.data : [];
  return {
    desks,
    isLoading: !responseData && !error,
    isError: error,
  };
};

export { useDesks };
