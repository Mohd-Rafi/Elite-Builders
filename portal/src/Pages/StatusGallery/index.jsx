import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusGalleryCreate from '../StatusGalleryCreate';
import StatusGalleryTable from '../../components/StatusGalleryTable';
const StatusGallery = () => {
  const { pathname } = useLocation();
  const [openAddStatus, setOpenAddStatus] = useState(false);
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
            setOpenAddStatus(!openAddStatus);
          }}
        >
          Add Status Image
        </button>
      </div>
      <div
        className={`${
          openAddStatus ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <StatusGalleryCreate
          openAddStatus={openAddStatus}
          setOpenAddStatus={setOpenAddStatus}
          onStatusGalleryCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <StatusGalleryTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default StatusGallery;
