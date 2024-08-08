import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/index.jsx';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CareerCreate = ({
  openAddCareer,
  setOpenAddCareer,
  onAddCareerCreated,
}) => {
  const [items, setItems] = useState({
    role: '',
    vaccancies: '',
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
      const response = await axios.post('/career', items);
      if (response) {
        toast.success('Career Added', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          onClose: () => {
            onAddCareerCreated(); // Trigger the refresh
            setOpenAddCareer(!openAddCareer);
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
  console.log(items);

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <div className="">
          <label>Role Name</label>
          <Input
            type="text"
            placeHolder="Name of role"
            onChange={e => onChange(e, 'role')}
          />

          <label>Vaccancies</label>
          <Input
            type="text"
            placeHolder="Vaccancies"
            onChange={e => onChange(e, 'vaccancies')}
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

export default CareerCreate;
