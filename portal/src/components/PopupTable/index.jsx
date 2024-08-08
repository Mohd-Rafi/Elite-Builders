import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import moment from 'moment';
import Input from '../Input/index.jsx';
import TextArea from '../TextArea/index.jsx';
import Button from '../Button/index.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PopupTable = ({ refreshTrigger }) => {
  const [popup, setPopup] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPopupApi = async () => {
    const response = await axios.get('/popup');
    if (response.status === 200) {
      setPopup(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPopupApi();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/popup/${id}`);
      if (response.status === 204) {
        toast.success('Popup deleted', {
          autoClose: 1500,
          onClose: () => {
            getPopupApi();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };

  // console.log(NewsAndEvents);
  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Popup Table</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Popup Image</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Description</p>
            </div>
            <div className="col-span-1 flex items-center text-red-500">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {popup.map((data, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-wrap">
                  <div className="h-8 w-12 rounded-md">
                    <img
                      src={data.image}
                      alt={data?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.name}</p>
              </div>
              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                <p className="text-sm line-clamp-3">{data.description}</p>
              </div>

              <div className="col-span-1 flex items-center text-red-500">
                <i
                  className="fa-regular fa-pen-to-square"
                  // onClick={() => {
                  //   editNewsAndEvent(data?._id);
                  // }}
                ></i>
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

export default PopupTable;
