import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BuilderCardCreate from '../BuilderCardCreate';
import BuilderCardTable from '../../components/BuilderCardTable';
const BuilderCard = () => {
  const { pathname } = useLocation();
  const [openAddBuilderCard, setopenAddBuilderCard] = useState(false);
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
            setopenAddBuilderCard(!openAddBuilderCard);
          }}
        >
          Add Buildercard
        </button>
      </div>
      <div
        className={`${
          openAddBuilderCard ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <BuilderCardCreate
          openAddBuilderCard={openAddBuilderCard}
          setopenAddBuilderCard={setopenAddBuilderCard}
          onBuilderCardCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <BuilderCardTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default BuilderCard;
