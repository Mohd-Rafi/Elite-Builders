import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlogCardCreate from '../BlogCardCreate';
import BlogCardTable from '../../components/BlogCardTable';
import UserReviewCreate from '../UserReviewCreate';
import UserReviewTable from '../../components/UserReviewTable';
const UserReview = () => {
  const { pathname } = useLocation();
  const [openAddUserReviewCard, setOpenAddUserReviewCard] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const [openeditWindow, setOpeneditWindow] = useState(false);

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
            setOpenAddUserReviewCard(!openAddUserReviewCard);
          }}
        >
          Add Review
        </button>
      </div>
      <div
        className={`${
          openAddUserReviewCard ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <UserReviewCreate
          openAddUserReviewCard={openAddUserReviewCard}
          setOpenAddUserReviewCard={setOpenAddUserReviewCard}
          onUserReviewCardCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <UserReviewTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default UserReview;
