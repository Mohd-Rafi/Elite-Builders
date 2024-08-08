import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/index.jsx';
import Select from '../../components/Select/index.jsx';
import TextArea from '../../components/TextArea/index.jsx';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Checkbox, Space, TimePicker } from 'antd';
import Cookies from 'js-cookie';

//dor antd
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const StatusGalleryCreate = ({
  openAddStatus,
  setOpenAddStatus,
  onStatusGalleryCreated,
}) => {
  // ----------------get project names-------------------
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    const response = await axios.get('/statusadding');
    if (response && response.data) {
      setProjects(response.data);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  // console.log(projects);
  // ----------------stop get project names-------------------
  const [items, setItems] = useState({
    name: '',
    date: '',
    images: '',
  });
  // -----------image upload------------------
  //antd
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  //handle preview
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
    let updatedImages = [];
    newFileList.forEach((file, index) => {
      if (file.response && file.response.url) {
        updatedImages[index] = file.response.url;
      }
      // else if (file.url) {
      //   updatedImages[index] = file.url;
      // }
    });
    setItems({ ...items, images: updatedImages });
  };

  const handleRemove = async () => {
    const name = items.images[0].split('3000/')[1];
    const response = await axios.post('/upload/delete', { image: name });
    items.images = [];
  };
  // -----------stop image upload------------------

  const onChange = (e, key) => {
    const { value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [key]: value,
    }));
  };
  console.log(items);
  const onClick = async () => {
    try {
      const response = await axios.post('/image/statusgallery', items);
      if (response.status === 201) {
        toast.success('status Added', {
          autoClose: 1500,
          onClose: () => {
            onStatusGalleryCreated(); // Trigger the refresh
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
  console.log(items);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="p-4">
        <div className="">
          <label>Status Gallery Name</label>
          <Select
            placeHolder="Select Project Name"
            options={projects}
            value={items.name}
            onChange={e => onChange(e, 'name')}
          />
          <label>Status Date</label>
          <Input
            type="date"
            placeHolder="Date"
            onChange={e => onChange(e, 'date')}
          />
          <div className="right-inputs">
            <label>Status Gallery Image</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              className="image-container my-3"
              value={items.images}
            >
              {fileList.length >= 10 ? null : (
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
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

export default StatusGalleryCreate;
