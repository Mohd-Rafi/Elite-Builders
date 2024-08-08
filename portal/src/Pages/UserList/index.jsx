import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserListCreate from '../UserListCreate';
import UserListTable from '../../components/UserListTable';
import { getLogedId } from '../../utilities/index.js';
import axios from '../../utilities/customAxios.js';
const UserList = () => {
  const { pathname } = useLocation();

  const [userRole, setUserRole] = useState({});
  const getuserbyid = async () => {
    const result = await axios.get(`/user/profile/${getLogedId()}`);
    setUserRole(result.data.role);
  };

  useEffect(() => {
    getuserbyid();
  }, []);

  const [openUserList, setopenUserList] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const handleRefreshTable = useCallback(() => {
    setRefreshTable(prev => !prev);
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{pathname}</h1>
        {userRole === 'admin' ? (
          <button
            className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md"
            onClick={() => {
              setopenUserList(!openUserList);
            }}
          >
            Add User
          </button>
        ) : (
          <button className="bg-slate-600 text-white flex items-center px-3 py-2 rounded-md">
            Add User
          </button>
        )}
      </div>
      <div
        className={`${
          openUserList ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <UserListCreate
          openUserList={openUserList}
          setopenUserList={setopenUserList}
          onUserListCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <UserListTable refreshTrigger={refreshTable} userRole={userRole} />
      </div>
    </div>
  );
};

export default UserList;
