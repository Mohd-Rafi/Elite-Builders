import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Checkbox, Space, TimePicker } from 'antd';
import Input from '../../components/Input/index.jsx';
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

const UserListCreate = ({
  openUserList,
  setopenUserList,
  onUserListCreated,
}) => {
  // ---------------------------START SIGNUP DATA STORE----------------------------

  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: [],
  });

  const onChange = (e, key) => {
    // console.log(e.target.value);
    setSignUp({ ...signUp, [key]: e.target.value });
    // console.log(signUp);
  };
  console.log(signUp);
  // ---------------------------STOP SIGNUP DATA STORE----------------------------

  // antd
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
    setSignUp({ ...signUp, image: updatedImages });
  };

  const handleRemove = async () => {
    const name = signUp.image[0].split('3000/')[1];
    const response = await axios.post('/upload/delete', { image: name });
    signUp.image = [];
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/user/signup', signUp);
      if (response.status === 201) {
        toast.success('User signup successful', {
          autoClose: 1500,
          onClose: () => {
            onUserListCreated(); // Trigger the refresh
            setopenUserList(!openUserList);
            window.location.reload();
          },
        });
      }
    } catch (e) {
      toast.error('please try again');
    }
  };
  // console.log(items);
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="p-4">
        <form>
          <label>User Name</label>
          <Input placeHolder="Name" onChange={e => onChange(e, 'name')} />
          <label>User Email</label>
          <Input placeHolder="Email" onChange={e => onChange(e, 'email')} />
          <label>Password</label>
          <Input
            placeHolder="Password"
            type="password"
            onChange={e => onChange(e, 'password')}
          />
          <label>Confirm Password</label>
          <Input
            placeHolder="Confirm Password"
            type="password"
            onChange={e => onChange(e, 'confirmPassword')}
          />
          <div className="right-inputs">
            <label>Gallerey Images</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              className="image-container my-3"
              value={signUp.image}
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
        </form>
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

export default UserListCreate;
