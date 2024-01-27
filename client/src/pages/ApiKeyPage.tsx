import { useState } from 'react';

type ApiKeyPageProps = {
  onApiKeyChange: (newKey: string) => void;

}
const ApiKeyPage = ({ onApiKeyChange }: ApiKeyPageProps) => {
  const [apiKey, setApiKey] = useState('');

  const setCookie = (name: string, value: string, minutes: number) => {
    const now = new Date();
    now.setTime(now.getTime() + minutes * 60 * 1000);
    const expires = 'expires=' + now.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/default', {
        method: 'GET',
        headers: {
          'Api-Key': apiKey,
        },
      });

      if (response.status === 200) {
        setCookie('apiStatus', apiKey, 30);
        onApiKeyChange(apiKey);
        console.log('API Key valid and saved in cookie');
      } else {
        console.log('API Key invalid');
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apiKey'>
            API Key
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='apiKey'
            type='text'
            placeholder='Enter your API Key'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export {ApiKeyPage}
