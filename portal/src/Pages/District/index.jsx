import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DistrictCreate from '../DistrictCreate';
import DistrictTable from '../../components/DistrictTable';
const District = () => {
  const { pathname } = useLocation();
  const [openAddDistrict, setOpenAddDistrict] = useState(false);
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
            setOpenAddDistrict(!openAddDistrict);
          }}
        >
          Add District
        </button>
      </div>
      <div
        className={`${
          openAddDistrict ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <DistrictCreate
          openAddDistrict={openAddDistrict}
          setOpenAddDistrict={setOpenAddDistrict}
          onDistictCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <DistrictTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default District;
