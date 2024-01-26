import ZonePage from './pages/ZonePage.tsx';
// import useWebSocket from './websockets/useWebSocket.ts';
import { ReactElement, useEffect, useState } from 'react';
import useWebSocket from './websockets/useWebSocket.ts';
import { CustomNotification } from './components/Nofication.tsx';
import { CreateZonePage } from './pages/CreateZonePage.tsx';

enum Page {
  ApiKeyPage,
  ZonePage,
  CreateZonePage,
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
  const [currentPage, setCurrentPage] = useState<Page>(Page.ZonePage);
  const PageMap: Partial<Record<Page, ReactElement>> = {
    // [Page.ApiKeyPage]: <ApiKeyPage />,
    [Page.ZonePage]: <ZonePage />,
    [Page.CreateZonePage]: <CreateZonePage />,
  };
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
          <button
            onClick={() => handlePageChange(Page.CreateZonePage)}
            className='bg-white text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded'
          >
            Create New Zone
          </button>
        </nav>
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
