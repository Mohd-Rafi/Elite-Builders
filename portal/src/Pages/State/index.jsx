import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StateCreate from '../BuilderCardCreate';
import StateTable from '../../components/StateTable';
const State = () => {
  const { pathname } = useLocation();
  const [openAddState, setOpenAddState] = useState(false);
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
            setOpenAddState(!openAddState);
          }}
        >
          Add State
        </button>
      </div>
      <div
        className={`${
          openAddState ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <StateCreate
          openAddState={openAddState}
          setOpenAddState={setOpenAddState}
          onStateCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <StateTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default State;
