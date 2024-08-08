import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SliderTable = ({ refreshTrigger }) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSliders = async () => {
    const response = await axios.get('/slider/homesliders');
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
      const response = await axios.delete(`/slider/homeslider/${id}`);
      if (response.status === 204) {
        toast.success('Home slider deleted', {
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
            <h4 className="text-xl font-semibol">Home Sliders</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Slider Image</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Location</p>
            </div>
            <div className="col-span-1 flex items-center">
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
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12 w-15 rounded-md">
                    <img
                      src={data?.images[0]}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm">{data?.sliderName}</p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data?.location}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm">{data?.status?.toString()}</p>
              </div>
              <div className="col-span-1 flex items-center">
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

export default SliderTable;
