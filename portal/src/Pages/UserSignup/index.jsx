import axios from '../../utilities/customAxios.js';
import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import uploadImage from '../../../components/helpers/uploadImages.js';
// import Logo from '../../../components/Logo/index.jsx';
import './usersignup.css';

const UserSignUp = () => {
  // ---------------------------START NAVIGATE TO LOGIN----------------------------

  const navigate = useNavigate();
  const navigation = () => {
    navigate('/');
  };
  // ---------------------------STOP NAVIGATE TO LOGIN----------------------------

  // ---------------------------START SIGNUP DATA STORE----------------------------

  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const onChange = (e, key) => {
    // console.log(e.target.value);
    setSignUp({ ...signUp, [key]: e.target.value });
    // console.log(signUp);
  };
  console.log(signUp);
  // ---------------------------STOP SIGNUP DATA STORE----------------------------

  // ---------------------------START IMAGE UPLOAD----------------------------
  const onUpload = async e => {
    if (signUp.image) {
      const name = signUp.image.split('4444/')[1];
      const response = await axios.post('/upload/delete', { image: name });
    }
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('/upload/image', formData);
        setSignUp({ ...signUp, image: response.data.url });
      } catch (e) {
        console.log(e);
      }
    }
  };
  // ---------------------------STOP IMAGE UPLOAD----------------------------

  // ---------------------------START POST SIGNUP DATA----------------------------

  const onclick = async () => {
    try {
      await axios.post('/user/signup', signUp);
      toast.success('user signup successful,please login', {
        autoClose: 1500,
        onClose: () => {
          navigation();
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  // ---------------------------STOP POST SIGNUP DATA----------------------------

  return (
    <>
      <div className="w-full flex justify-end bg-black pr-8">
        <div className="p-4 w-30">
          <img
            src="/assets/Elite Logo 1.png"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="user flex justify-center">
          <div className="signup mt-8 sm:mt-16">
            <h1 className="text-center my-3 text-xl text-dark">SIGN UP</h1>
            <ToastContainer />
            <form>
              <Input placeHolder="Name" onChange={e => onChange(e, 'name')} />
              <Input placeHolder="Email" onChange={e => onChange(e, 'email')} />
              <Input
                placeHolder="Password"
                type="password"
                onChange={e => onChange(e, 'password')}
              />
              <Input
                placeHolder="Confirm Password"
                type="password"
                onChange={e => onChange(e, 'confirmPassword')}
              />
              <Input placeHolder="Image" type="file" onChange={onUpload} />
            </form>
            <div className="flex justify-center">
              <div className="flex justify-center">
                <Button onClick={onclick}>Sign Up</Button>
              </div>
            </div>
            <p className="paragraph text-center">
              <span className="text-primary">Have an account</span>
              <span
                className="text-secondary ml-5 paragraph"
                onClick={navigation}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
