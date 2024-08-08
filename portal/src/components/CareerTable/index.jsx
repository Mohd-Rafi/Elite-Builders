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
const CareerTable = ({ refreshTrigger }) => {
  const [career, setCareer] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCareerApi = async () => {
    const response = await axios.get('/career');
    if (response.status === 200) {
      setCareer(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCareerApi();
  }, [refreshTrigger]);

  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/career/${id}`);
      if (response.status === 204) {
        toast.success('Career deleted', {
          autoClose: 1500,
          onClose: () => {
            window.location.reload();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };
  // ----------------edit function-----------------
  const [openeditWindow, setOpeneditWindow] = useState(false);
  const [careedById, setCareerById] = useState({});
  const [updateCareer, setUpdateCareer] = useState({});

  const trigger = () => {
    setOpeneditWindow(!openeditWindow);
  };
  const editCareerApi = async id => {
    setOpeneditWindow(!openeditWindow);
    const result = await axios.get(`/career/detail/${id}`);
    setCareerById(result.data);
  };
  const onChange = (e, key) => {
    setUpdateCareer({ ...updateCareer, [key]: e.target.value });
  };
  const updateCareedApi = async id => {
    try {
      const response = await axios.patch(`/career/detail/${id}`, updateCareer);
      if (response && response.data) {
        toast.success('Career updated', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          onClose: () => {
            trigger();
            getCareerApi();
            window.location.reload();
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
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Career Table</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Role</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Vaccancies</p>
            </div>

            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {career.map((data, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.role}</p>
              </div>

              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                <p className="text-sm line-clamp-3">{data.vaccancies}</p>
              </div>
              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                {/* <p className="text-sm line-clamp-3">{data.vaccancies}</p> */}
              </div>

              <div className="col-span-1 flex items-center ">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => {
                    editCareerApi(data?._id);
                  }}
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
          <div
            className={`absolute bg-white w-full top-[190px] h-full p-12  ${
              !openeditWindow && 'hidden'
            }`}
          >
            <div className="flex justify-between">
              <h1 className="text-primary text-2xl">EDIT CAREER</h1>
              <i class="fa-solid fa-xmark text-2xl" onClick={trigger}></i>
            </div>
            <div className="mt-6">
              <label>Role</label>
              <Input
                type="text"
                placeHolder={careedById.role}
                onChange={e => {
                  onChange(e, 'role');
                }}
              />
              <label>Vaccancies</label>
              <Input
                placeHolder={careedById.vaccancies}
                type="text"
                onChange={e => {
                  onChange(e, 'vaccancies');
                }}
              />

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    updateCareedApi(careedById._id);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTable;
