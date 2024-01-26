 import { useState }  from 'react';

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle the API key submission logic here
    console.log('API Key submitted:', apiKey);
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

export default ApiKeyPage;
