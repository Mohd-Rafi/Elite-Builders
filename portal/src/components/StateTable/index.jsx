import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SilderTable = ({ refreshTrigger }) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSliders = async () => {
    const response = await axios.get('/location/state');
    if (response.status === 200) {
      setSliders(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSliders();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/location/state/${id}`);
      if (response.status === 204) {
        toast.success('State deleted', {
          autoClose: 1500,
          onClose: () => {
            getSliders();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };
  // console.log(sliders);
  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">States</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-4 hidden items-center sm:flex">
              <p className="font-medium">State Name</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Status</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {sliders.map((data, key) => (
            <div
              className="grid grid-cols-5 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-sm">{data.stateName}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm">{data?.status?.toString()}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <div className="col-span-1 flex items-center">
                <i
                  onClick={() => {
                    deleteFn(data._id);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SilderTable;
