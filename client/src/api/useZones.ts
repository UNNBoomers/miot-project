import useSWR from 'swr';
import { Zone } from '../types.ts';
import { baseUrl, createFetcher } from './fetcher.ts';

const mockZones: Zone[] = [
  {
    id: 'zone1',
    name: 'Zone 1',
  },
  {
    id: 'zone2',
    name: 'Zone 2',
  },
  {
    id: 'zone3',
    name: 'Zone 3',
  },
];
const useZones = () => {
  const { data, error: zonesError } = useSWR<Zone[]>(`${baseUrl}/zones`, createFetcher("fake-building-123.79cce515-5cbe-4d03-9c1d-5a011760beb4"));


  return {
    zones: data ?? mockZones,
    isLoading: false ?? (!data && !zonesError),
    isError: false ?? zonesError,
  };
};

export { useZones };
