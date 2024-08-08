import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlogCardCreate from '../BlogCardCreate';
import BlogCardTable from '../../components/BlogCardTable';
const BlogerCard = () => {
  const { pathname } = useLocation();
  const [openAddBlogCard, setOpenAddBlogCard] = useState(false);
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
            setOpenAddBlogCard(!openAddBlogCard);
          }}
        >
          Add Blog Card
        </button>
      </div>
      <div
        className={`${
          openAddBlogCard ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <BlogCardCreate
          openAddBlogCard={openAddBlogCard}
          setOpenAddBlogCard={setOpenAddBlogCard}
          onBlogCardCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <BlogCardTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default BlogerCard;
