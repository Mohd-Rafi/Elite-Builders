import React, { useState } from 'react';
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

const SitePlanGalleryCreate = ({
  openSitePlan,
  setOpenSitePlan,
  onSitePlanCreated,
}) => {
  const [items, setItems] = useState({
    name: '',
    siteplangallery: [],
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

  const handleChange = async ({ fileList: newFileList }, key) => {
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

  //add project plan
  const [siteplanName, setSitePlanName] = useState('');
  const [sitePlanFileList, setSitePlanFileList] = useState([]);
  const handleAddStatusGallery = () => {
    if (sitePlanFileList.length > 0 && siteplanName) {
      const newSitePlanGallery = [
        ...items.siteplangallery,
        {
          image: sitePlanFileList[0].response.url,
          description: siteplanName,
        },
      ];
      setItems({ ...items, siteplangallery: newSitePlanGallery });
      setSitePlanFileList([]);
      setSitePlanName('');
    }
  };
  const handleSitePlanGalleryChange = ({ fileList }) => {
    setSitePlanFileList(fileList);
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/image/siteplan', items);
      if (response.status === 201) {
        toast.success('Site Plan Added', {
          autoClose: 1500,
          onClose: () => {
            onSitePlanCreated(); // Trigger the refresh
            setOpenSitePlan(!openSitePlan);
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
          <label>Site Plan Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'name')}
          />
          {/* <div className="right-inputs">
            <label>Site Image</label>
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
              {fileList.length >= 6 ? null : (
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
          </div> */}
          {/* /    here see added status galler images and dates   / */}
          <div className="border border-blue-900 p-6 rounded-md my-3">
            <div className="flex gap-4">
              {items.siteplangallery.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt={`status-gallery-${index}`}
                    className="w-[120px] h-[80px] object-cover"
                  />
                  <p className="my-4 text-xs text-center">
                    name: {item.description}
                  </p>
                </div>
              ))}
            </div>
            <label>Site Plan Images</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={sitePlanFileList}
              onChange={handleSitePlanGalleryChange}
              className="image-container my-3"
            >
              {sitePlanFileList.length === 0 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : null}
            </Upload>

            <label>Site Plan Label</label>
            <Input
              type="text"
              placeHolder="Site Plan Label"
              value={siteplanName}
              onChange={e => setSitePlanName(e.target.value)}
            />

            <button
              className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md my-5 mx-auto"
              onClick={handleAddStatusGallery}
            >
              Add Site Plan Gallery
            </button>
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

export default SitePlanGalleryCreate;
