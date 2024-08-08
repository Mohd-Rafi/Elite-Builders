import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewsAndEventsCreate from '../NewsAndEventsCreate';
import NewsAndEventsTable from '../../components/NewsAndEventsTable';
import PopupCreate from '../PopupCreate';
import PopupTable from '../../components/PopupTable';
const Popup = () => {
  const { pathname } = useLocation();
  const [openAddPopup, setOpenAddPopup] = useState(false);
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
            setOpenAddPopup(!openAddPopup);
          }}
        >
          Create Popup
        </button>
      </div>
      <div
        className={`${
          openAddPopup ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <PopupCreate
          openAddPopup={openAddPopup}
          setOpenAddPopup={setOpenAddPopup}
          onAddPopupCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <PopupTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default Popup;
