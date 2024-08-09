import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const CareerApplicationTable = ({ refreshTrigger }) => {
  const [career, setCareer] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCareerAppApi = async () => {
    const response = await axios.get('/career-application');
    if (response.status === 200) {
      setCareer(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCareerAppApi();
  }, [refreshTrigger]);

  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/career-application/${id}`);
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

  const trigger = () => {
    setOpeneditWindow(!openeditWindow);
  };
  const editCareerApi = async id => {
    setOpeneditWindow(!openeditWindow);
    const result = await axios.get(`/career-application/detail/${id}`);
    setCareerById(result.data);
  };

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
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Name</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Experience</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Qualification</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">email</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">View</p>
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
                <p className="text-sm line-clamp-3">{data.name}</p>
              </div>
              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                <p className="text-sm line-clamp-3">{data.experience}</p>
              </div>
              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                <p className="text-sm line-clamp-3">{data.qualifications}</p>
              </div>
              <div className="col-span-1 hidden items-center mr-5 sm:flex">
                <p className="text-sm line-clamp-3">{data.email}</p>
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
            <div className="flex items-center justify-start gap-96">
              <div className="text-black flex flex-col gap-2 my-8">
                <label className="uppercase">Apllicant Name</label>
                <p>{careedById.name}</p>
              </div>
              <div className="text-black flex flex-col gap-2 my-8">
                <label className="uppercase">Role</label>
                <p>{careedById.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[410px]">
              <div className="text-black flex flex-col gap-2 my-4">
                <label className="uppercase">Email</label>
                <p>{careedById.email}</p>
              </div>
              <div className="text-black flex flex-col gap-2 my-4">
                <label className="uppercase">Mobile No</label>
                <p>{careedById.mobileno}</p>
              </div>
            </div>
            <div className="text-black flex flex-col gap-2 my-4">
              <label className="uppercase">Experience</label>
              <p>{careedById.experience}</p>
            </div>
            <div className="text-black flex flex-col gap-2 my-8">
              <label className="uppercase">Qualification</label>
              <p>{careedById.qualifications}</p>
            </div>
            {/* //pdf section */}
            <div className="w-full flex justify-start gap-[450px]">
              <label className="uppercase text-black">Resume</label>
              <a
                href={careedById.resume}
                target="_blank"
                className="bg-slate-800 text-white px-10 py-2 rounded-md transition-all duration-150 hover:bg-slate-600"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="text-black mt-[50vh] px-10">
            {careedById.resume && (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
              >
                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '100vh',
                  }}
                >
                  <Viewer fileUrl={careedById.resume} />
                </div>
              </Worker>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerApplicationTable;
