import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewsAndEventsCreate from '../NewsAndEventsCreate';
import NewsAndEventsTable from '../../components/NewsAndEventsTable';
import PopupCreate from '../PopupCreate';
import PopupTable from '../../components/PopupTable';
import CareerTable from '../../components/CareerTable';
import CareerCreate from '../CareerCreate';
const Careers = () => {
  const { pathname } = useLocation();
  const [openAddCareer, setOpenAddCareer] = useState(false);
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
            setOpenAddCareer(!openAddCareer);
          }}
        >
          Create Career
        </button>
      </div>
      <div
        className={`${
          openAddCareer ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <CareerCreate
          openAddCareer={openAddCareer}
          setOpenAddCareer={setOpenAddCareer}
          onAddCareerCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <CareerTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default Careers;
