import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Checkbox, Space, TimePicker } from 'antd';
import Input from '../../components/Input';
import Select from '../../components/Select';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'js-cookie';

//dor antd
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const HomeSliderCreate = ({
  openCreateSlider,
  setOpenCreateSlider,
  onSliderCreated,
}) => {
  const [items, setItems] = useState({
    sliderName: '',
    location: '',
    link: '',
    status: '',
    images: [],
  });
  console.log(items);
  const onChange = (e, key) => {
    setItems({ ...items, [key]: e.target.value });
  };
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
    // console.log(fileList);
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

  const onClick = async () => {
    try {
      const response = await axios.post('/slider/homeslider', items);
      if (response.status === 201) {
        toast.success('Home slider Added', {
          autoClose: 1500,
          onClose: () => {
            // setItems({ sliderName: '', status: '', images: [] });
            // setFileList([]);
            onSliderCreated(); // Trigger the refresh
            setOpenCreateSlider(!openCreateSlider);
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
          <label>Slider Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'sliderName')}
            value={items.sliderName}
          />
          <label>Location</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'location')}
            value={items.location}
          />
          <label>Know More</label>
          <Input
            type="text"
            placeHolder="Link"
            onChange={e => onChange(e, 'link')}
            value={items.link}
          />
          <label>Status</label>
          <Select
            options={[
              { _id: 'false', name: 'False' },
              { _id: 'true', name: 'True' },
            ]}
            placeHolder="status"
            value={items.status}
            onChange={e => onChange(e, 'status')}
          />
          <div className="right-inputs">
            <label>Slider Image</label>

            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              className="image-container"
              value={items.images}
            >
              {fileList.length >= 1 ? null : (
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

export default HomeSliderCreate;
