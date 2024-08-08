import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/index.jsx';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
//dor antd

const UserReviewCreate = ({
  openAddUserReviewCard,
  setOpenAddUserReviewCard,
  onUserReviewCardCreated,
}) => {
  const [items, setItems] = useState({
    name: '',
    reviewer: '',
    review: '',
    youtubelink: '',
  });
  // -----------image upload------------------

  // -----------stop image upload------------------

  const onChange = (e, key) => {
    const { value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [key]: value,
    }));
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/userreview', items);
      if (response.status === 201) {
        toast.success('user Review Added', {
          autoClose: 1500,
          onClose: () => {
            // setFileList([]);
            onUserReviewCardCreated(); // Trigger the refresh
            setOpenAddUserReviewCard(!openAddUserReviewCard);
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
      <ToastContainer position="top-center" />
      <div className="p-4">
        <div className="">
          <label>Review Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'name')}
          />
          <label>Reviewer</label>
          <Input
            type="text"
            placeHolder="Reviewer"
            onChange={e => onChange(e, 'reviewer')}
          />
          <label>Review</label>
          <Input
            type="text"
            placeHolder="Review"
            onChange={e => onChange(e, 'review')}
          />
          <label>YouTube Link</label>
          <Input
            type="text"
            placeHolder="Youtube Link"
            onChange={e => onChange(e, 'youtubelink')}
          />
          {/* <TextArea type="text" onChange={e => onChange(e, 'description')} /> */}
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

export default UserReviewCreate;
