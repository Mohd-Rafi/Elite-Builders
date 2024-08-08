import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoCreate from '../LogoCreate';
import LogoTable from '../../components/LogoTable';
const Logo = () => {
  const { pathname } = useLocation();
  const [openAddLogo, setOpenAddLogo] = useState(false);
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
            setOpenAddLogo(!openAddLogo);
          }}
        >
          Add Logo
        </button>
      </div>
      <div
        className={`${
          openAddLogo ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <LogoCreate
          openAddLogo={openAddLogo}
          setOpenAddLogo={setOpenAddLogo}
          onLogoCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <LogoTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default Logo;
