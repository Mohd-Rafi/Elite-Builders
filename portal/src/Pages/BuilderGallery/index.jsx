import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GalleryCreate from '../GalleryCreate';
import GalleryTable from '../../components/GalleryTable';
const BuilderGallery = () => {
  const { pathname } = useLocation();
  const [openAddGallery, setOpenAddGallery] = useState(false);
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
            setOpenAddGallery(!openAddGallery);
          }}
        >
          Add Gallery
        </button>
      </div>
      <div
        className={`${
          openAddGallery ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <GalleryCreate
          openAddGallery={openAddGallery}
          setOpenAddGallery={setOpenAddGallery}
          onGalleryCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <GalleryTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default BuilderGallery;
