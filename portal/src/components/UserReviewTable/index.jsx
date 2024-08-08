import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserReviewTable = ({ refreshTrigger }) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSliders = async () => {
    const response = await axios.get('/userreview');
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
      const response = await axios.delete(`/userreview/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        toast.success('User Review deleted', {
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
  console.log(sliders);
  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">User Review Cards</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Slider Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Reviewer</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Review</p>
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
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.name}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.reviewer}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm line-clamp-2">{data.review}</p>
              </div>
              <div className="col-span-1 flex items-center ml-2">
                <i className="fa-regular fa-pen-to-square text-red-600"></i>
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

export default UserReviewTable;
