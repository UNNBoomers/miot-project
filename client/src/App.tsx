import ZonePage from './pages/ZonePage.tsx';
import { ReactElement, useEffect, useState } from 'react';
import useWebSocket from './websockets/useWebSocket.ts';
import { CustomNotification } from './components/Nofication.tsx';
import { CreateDeskPage } from './pages/CreateDeskPage.tsx';
import { getCookie } from './utils/cookie.ts';
import { ApiKeyPage } from './pages/ApiKeyPage.tsx';
import { mutate } from 'swr';
import { baseUrl } from './api/fetcher.ts';
import { Zone } from './types.ts';

enum Page {
  ApiKeyPage,
  ZonePage,
  CreateDeskPage,
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
};

const App = () => {
  const { lastMessage } = useWebSocket();
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (lastMessage) {
      setShowNotification(true);
    }
  }, [lastMessage]);
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const [currentZone, setCurrentZone] = useState<Zone | null>(null);


  const apiKeyInCookie = getCookie('apiStatus'); // Assuming 'apiStatus' is the name of your cookie

  const [currentPage, setCurrentPage] = useState<Page>(
    apiKeyInCookie ? Page.ZonePage : Page.ApiKeyPage,
  );
  const [apiKey, setApiKey] = useState(getCookie('apiStatus'));

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey); // Update the state when the API key is set in the cookie
    setCurrentPage(Page.ZonePage); // Navigate to the ZonePage
  };

  const refreshData = () => {
    if (currentZone) {
      const url = `${baseUrl}/desks?zoneId=${encodeURIComponent(currentZone.id)}`;
      mutate(url);
    }
    mutate(`${baseUrl}/zones`);

  };


  const PageMap: Partial<Record<Page, ReactElement>> = {
    [Page.ApiKeyPage]: <ApiKeyPage onApiKeyChange={handleApiKeyChange} />,
    [Page.ZonePage]: <ZonePage currentZone={currentZone} setCurrentZone={setCurrentZone} />,
    [Page.CreateDeskPage]: <CreateDeskPage apiKey={apiKey} onSuccessfulCreation={refreshData} />,
  };
  useEffect(() => {
    // React to changes in apiKey state
    setCurrentPage(apiKey ? Page.ZonePage : Page.ApiKeyPage);
  }, [apiKey]);
  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };
  const renderPage = () => {
    return PageMap[currentPage];
  };
  return (
    <>
      {showNotification && (
        <CustomNotification
          message={lastMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className='min-h-screen bg-gray-100'>
        <nav className='bg-blue-500 text-white p-4 w-full flex justify-between items-center'>
          <h1 className='text-center'>IoT - Current</h1>
          {apiKey && currentPage === Page.ZonePage &&
            <button
              onClick={() => handlePageChange(Page.CreateDeskPage)}
              className='bg-white text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded'
            >
              Create New Desk
            </button>
          }
        </nav>

        {currentPage === Page.CreateDeskPage && (
          <button
            onClick={() => handlePageChange(Page.ZonePage)}
            className='ml-4 mt-4 bg-white text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded'
          >
            Back
          </button>
        )}

        <div className='flex justify-center px-4 py-2'>
          <div className='max-w-5xl w-full'>
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
