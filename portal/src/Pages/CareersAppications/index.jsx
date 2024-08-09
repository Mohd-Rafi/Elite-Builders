import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import CareerTable from '../../components/CareerTable';
import CareerApplicationTable from '../../components/CareerApplicationTable';

const CareersApplication = () => {
  const { pathname } = useLocation();
  const [openAddCareerApplications, setOpenAddCareerApplications] =
    useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRefreshTable = useCallback(() => {
    setRefreshTable(prev => !prev);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{pathname}</h1>
        <button
          className=" text-white flex items-center px-3 py-2 rounded-md"
          // onClick={() => {
          //   setOpenAddCareerApplications(!openAddCareerApplications);
          // }}
          disabled={true}
        >
          Create Career
        </button>
      </div>
      <div
        className={`${
          openAddCareerApplications ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        {/* <CareerCreate
          openAddCareerApplications={openAddCareerApplications}
          setOpenAddCareerApplications={setOpenAddCareerApplications}
          onAddCareerCreated={handleRefreshTable}
        /> */}
      </div>
      <div className="mt-10">
        <CareerApplicationTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default CareersApplication;
