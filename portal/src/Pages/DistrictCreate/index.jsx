import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const DistrictCreate = ({
  openAddDistrict,
  setOpenAddDistrict,
  onDistictCreated,
}) => {
  const [items, setItems] = useState({
    stateName: '',
    name: '',
    status: '',
  });
  const [state, setState] = useState();
  const getStates = async () => {
    const response = await axios.get('/location/state');
    setState(response.data);
  };
  useEffect(() => {
    getStates();
  }, []);
  const onChange = (e, key) => {
    setItems({ ...items, [key]: e.target.value });
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/location/district', items);
      if (response.status === 201) {
        toast.success('District Added', {
          autoClose: 1500,
          onClose: () => {
            Cookies.remove('stateName');
            Cookies.remove('name');
            Cookies.remove('status');
            setItems({ stateName: '', name: '', status: '' });
            onDistictCreated(); // Trigger the refresh
            setOpenAddDistrict(!openAddDistrict);
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="p-4">
        <div className="">
          <label>State Name</label>
          <Select
            options={state}
            value={items.stateName}
            group="state"
            onChange={e => onChange(e, 'stateName')}
          />
          <label>District Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'name')}
          />
          <label>Status</label>
          <Select
            options={[
              { _id: 'false', name: 'False' },
              { _id: 'true', name: 'True' },
            ]}
            value={items.status}
            onChange={e => onChange(e, 'status')}
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

export default DistrictCreate;
