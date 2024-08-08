import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnquiryTable from '../../components/EnquiryTable';
const Enquiries = () => {
  const { pathname } = useLocation();
  const [openAddNewsAndEvents, setopenAddNewsAndEvents] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRefreshTable = useCallback(() => {
    setRefreshTable(prev => !prev);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* <h1>{pathname}</h1> */}
      </div>
      <div
        className={`${
          openAddNewsAndEvents ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      ></div>
      <div className="mt-10">
        <EnquiryTable />
      </div>
    </div>
  );
};

export default Enquiries;
