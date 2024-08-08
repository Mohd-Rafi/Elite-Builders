import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewsAndEventsCreate from '../NewsAndEventsCreate';
import NewsAndEventsTable from '../../components/NewsAndEventsTable';
const NewsAndEvents = () => {
  const { pathname } = useLocation();
  const [openAddNewsAndEvents, setopenAddNewsAndEvents] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRefreshTable = useCallback(() => {
    setRefreshTable(prev => !prev);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{pathname}</h1>
        <button
          className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md"
          onClick={() => {
            setopenAddNewsAndEvents(!openAddNewsAndEvents);
          }}
        >
          Create News
        </button>
      </div>
      <div
        className={`${
          openAddNewsAndEvents ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <NewsAndEventsCreate
          openAddNewsAndEvents={openAddNewsAndEvents}
          setopenAddNewsAndEvents={setopenAddNewsAndEvents}
          onNewsAndEventsCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <NewsAndEventsTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default NewsAndEvents;
