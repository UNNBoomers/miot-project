import useSWR from 'swr';
import { Zone } from '../types.ts';
import { baseUrl, createFetcher } from './fetcher.ts';

const useZones = () => {
  const {
    data: responseData,
    error: zonesError,
  } = useSWR<{
    data: Zone[]
  }>(`${baseUrl}/zones`, createFetcher('fake-building-123.55d6908f-843f-48ed-aa37-bdb5983fe612'));


  return {
    zones: responseData?.data ?? [],
    isLoading: (!responseData && !zonesError),
    isError: zonesError,
  };
};

export { useZones };
