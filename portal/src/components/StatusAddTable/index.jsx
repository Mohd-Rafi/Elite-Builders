import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StatusAddTable = ({ refreshTrigger }) => {
  const [statusGallery, setstatusGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const getstatusGallery = async () => {
    const response = await axios.get('/statusadding');
    // if (response && response.data) {
    setstatusGallery(response.data);
    setLoading(false);
    // }
  };
  useEffect(() => {
    getstatusGallery();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/statusadding/${id}`);
      if (response.status === 204) {
        toast.success('project deleted', {
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
            <h4 className="text-xl font-semibol">Project Names</h4>
          </div>

          <div className="grid grid-cols-2 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-6 hidden items-center sm:flex">
              <p className="font-medium">Project name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {statusGallery.map((data, key) => (
            <div
              className="grid grid-cols-2 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-6 flex items-center">
                <p className="text-sm">{data?.name}</p>
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

export default StatusAddTable;
