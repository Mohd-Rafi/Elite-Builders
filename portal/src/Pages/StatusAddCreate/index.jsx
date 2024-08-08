import React, { useState } from 'react';
import Input from '../../components/Input/index.jsx';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StatusAddCreate = ({
  openAddStatus,
  setOpenAddStatus,
  onStatusCreated,
}) => {
  const [items, setItems] = useState({
    name: '',
  });

  const onChange = (e, key) => {
    const { value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [key]: value,
    }));
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/statusadding', items);
      if (response.status === 201) {
        toast.success('status Added', {
          autoClose: 1500,
          onClose: () => {
            onStatusCreated(); // Trigger the refresh
            setOpenAddStatus(!openAddStatus);
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
  // console.log(items);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="p-4">
        <div className="">
          <label>Project Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'name')}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md"
            onClick={onClick}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default StatusAddCreate;
