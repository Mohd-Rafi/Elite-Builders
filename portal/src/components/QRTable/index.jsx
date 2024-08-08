import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QRTable = ({ refreshTrigger }) => {
  const [qrcodes, setQRcodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getqrcodes = async () => {
    const response = await axios.get('/qrcode');
    if (response.status === 200) {
      setQRcodes(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getqrcodes();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/qrcode/${id}`);
      if (response.status === 204) {
        toast.success('Logo deleted', {
          autoClose: 1500,
          onClose: () => {
            getqrcodes();
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
            <h4 className="text-xl font-semibol">QR Codes</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-4 hidden items-center sm:flex">
              <p className="font-medium">QR Code</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">QR Code Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {qrcodes.map((data, key) => (
            <div
              className="grid grid-cols-5 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-4 hidden items-center sm:flex">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12 w-15 rounded-md">
                    <img
                      src={data?.images[0]}
                      alt={data?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm">{data?.name}</p>
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

export default QRTable;
