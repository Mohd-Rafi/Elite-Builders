import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StatusGalleryTable = ({ refreshTrigger }) => {
  const [statusGallery, setstatusGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const getstatusGallery = async () => {
    const response = await axios.get('/image/statusgallery');
    if (response.status === 200) {
      setstatusGallery(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getstatusGallery();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/image/statusgallery/${id}`);
      if (response.status === 204) {
        toast.success('statusGallery deleted', {
          autoClose: 1500,
          onClose: () => {
            getstatusGallery();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };
  // console.log(statusGallery);
  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Status Gallery</h4>
          </div>

          <div className="grid grid-cols-8 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Status Gallery</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Gallery Name</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {statusGallery.map((data, key) => (
            <div
              className="grid grid-cols-5 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 hidden items-center sm:flex">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-wrap">
                  {data.images.map((image, i) => {
                    return (
                      <div className="h-8 w-12 rounded-md" key={i}>
                        <img
                          src={image}
                          alt={data?.name?.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm">{data?.name?.name}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm">
                  {moment(data?.date).format('MMM Do YY')}
                </p>
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

export default StatusGalleryTable;
