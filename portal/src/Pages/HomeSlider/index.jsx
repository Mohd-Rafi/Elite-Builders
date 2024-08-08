import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeSliderCreate from '../HomeSliderCreate';
import SliderTable from '../../components/SilderTable';
const HomeSlider = () => {
  const { pathname } = useLocation();
  const [openCreateSlider, setOpenCreateSlider] = useState(false);
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
            setOpenCreateSlider(!openCreateSlider);
          }}
        >
          Create Slider
        </button>
      </div>
      <div
        className={`${
          openCreateSlider ? 'block' : 'hidden'
        } bg-white min-h-[200px] rounded-lg mt-10 shadow-md theme`}
      >
        <HomeSliderCreate
          openCreateSlider={openCreateSlider}
          setOpenCreateSlider={setOpenCreateSlider}
          onSliderCreated={handleRefreshTable}
        />
      </div>
      <div className="mt-10">
        <SliderTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default HomeSlider;
