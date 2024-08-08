import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SitePlanGalleryCreate from '../SitePlanGalleryCreate';
import SitePlanGalleryTable from '../../components/SitePlanGalleryTable';
const SitePlanGallery = () => {
  const { pathname } = useLocation();
  const [openSitePlan, setOpenSitePlan] = useState(false);
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
            setOpenSitePlan(!openSitePlan);
          }}
        >
          Add Site Plan
        </button>
      </div>
      <div
        className={`${
          openSitePlan ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <SitePlanGalleryCreate
          openSitePlan={openSitePlan}
          setOpenSitePlan={setOpenSitePlan}
          onSitePlanCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <SitePlanGalleryTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default SitePlanGallery;
