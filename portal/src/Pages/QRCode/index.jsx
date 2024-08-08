import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCodeCreate from '../QRCodeCreate';
import QRTable from '../../components/QRTable';
const QRCode = () => {
  const { pathname } = useLocation();
  const [openAddQR, setOpenAddQR] = useState(false);
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
            setOpenAddQR(!openAddQR);
          }}
        >
          Add QR Code
        </button>
      </div>
      <div
        className={`${
          openAddQR ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <QRCodeCreate
          openAddQR={openAddQR}
          setOpenAddQR={setOpenAddQR}
          onQRCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <QRTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default QRCode;
