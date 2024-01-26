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
  } = useSWR<{data:Desk[]}>([url], createFetcher('fake-building-123.55d6908f-843f-48ed-aa37-bdb5983fe612'));

  const desks = responseData ? responseData.data : [];
  return {
    desks,
    isLoading: !responseData && !error,
    isError: error,
  };
};

export { useDesks };
