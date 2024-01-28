import React, { useState } from 'react';
import { useZones } from '../api/useZones.ts';
import { baseUrl } from '../api/fetcher.ts';

type CreateZone = {
  zoneId: string;
  deskId: string;
  deskName: string;
  zoneName: string;
};


const defaultZone: CreateZone = {
  zoneId: '',
  deskId: '',
  zoneName: '',
  deskName: '',

};

type CreateDeskPageProps = {
  apiKey: string | null | undefined,
  onSuccessfulCreation: () => void; // Callback to update zones and desks

};
export const CreateDeskPage = ({ apiKey, onSuccessfulCreation }: CreateDeskPageProps) => {
  const [zone, setZone] = useState<CreateZone>(defaultZone);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [isCreatingNewZone, setIsCreatingNewZone] = useState(true);

  const { zones: existingZones } = useZones();
  const displayMessage = (text: string, color: string) => {
    setMessage(text);
    setMessageColor(color);
    setTimeout(() => setMessage(''), 1500);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessage('');
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/desks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': apiKey ?? '',
        },
        body: JSON.stringify(zone),
      });

      if (response.ok) {
        displayMessage('Desk created successfully', 'text-green-600');
        setZone(defaultZone);
        onSuccessfulCreation();

      } else {
        displayMessage('Failed to create desk', 'text-red-600');

      }
    } catch (error) {
      displayMessage('Error during API call', 'text-red-600');


      console.error('Error during API call', error);
    }
  };
  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZoneId = e.target.value;

    if (selectedZoneId === '') {
      setIsCreatingNewZone(true);
      setZone(old => ({ ...old, zoneId: '' }));
    } else {
      setIsCreatingNewZone(false);
      const selectedZone = existingZones.find(z => z.id === selectedZoneId);
      setZone(old => ({
        ...old,
        zoneId: selectedZoneId,
        zoneName: selectedZone ? selectedZone.name : '',
      }));
    }
  };

  return (
    <div className='relative max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>

      <h1 className='text-xl font-semibold mb-6'>Create New Desk</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='zoneId' className='block text-sm font-medium text-gray-700'>
            Zone ID:
          </label>
          <select
            id='zoneId'
            value={zone.zoneId}
            onChange={handleZoneChange}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select Existing Zone or Create New</option>
            {existingZones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.id}
              </option>
            ))}
          </select>
        </div>
        {isCreatingNewZone && (
          <div>
            <label htmlFor='newZoneId' className='block text-sm font-medium text-gray-700'>
              New Zone ID:
            </label>
            <input
              id='prevent-auto-fill'
              type='text'
              value={zone.zoneId}
              onChange={(e) => setZone((old) => ({ ...old, zoneId: e.target.value }))}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        )}
        <div>
          <label htmlFor='zoneName' className='block text-sm font-medium text-gray-700'>
            Zone Name:
          </label>
          <input
            id='zoneName'
            type='text'
            value={zone.zoneName}
            onChange={(e) => setZone((old) => ({ ...old, zoneName: e.target.value }))}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>


        <div>
          <label htmlFor='deskIdInput' className='block text-sm font-medium text-gray-700'>
            Desk ID:
          </label>
          <input
            id='prevent-autofill'
            type='text'
            value={zone.deskId}
            onChange={(e) => setZone((old) => ({ ...old, deskId: e.target.value }))}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <div>
          <label htmlFor='zoneName' className='block text-sm font-medium text-gray-700'>
            Desk Name:
          </label>
          <input
            id='deskName'
            type='text'
            value={zone.deskName}
            onChange={(e) => setZone((old) => ({ ...old, deskName: e.target.value }))}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Create Desk
        </button>
        {message && <div className={`mt-4 text-center font-medium text-sm ${messageColor}`}>{message}</div>}

      </form>
    </div>
  );
};
