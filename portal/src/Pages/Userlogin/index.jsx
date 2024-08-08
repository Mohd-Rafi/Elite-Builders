import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import { useRef, useState } from 'react';
import axios from '../../utilities/customAxios.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import './userlogin.css';
const Userlogin = () => {
  // ---------------------------START NAVIGATE TO SIGNUP----------------------------

  const navigate = useNavigate();
  const navigation = e => {
    e.preventDefault;
    navigate('/signup');
  };

  // ---------------------------STOP NAVIGATE TO SIGNUP----------------------------

  // ---------------------------START LOGIN DATA STORE----------------------------
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const pasRef = useRef();
  const btnRef = useRef();
  const onChange = (e, key) => {
    setUserDetails({ ...userDetails, [key]: e.target.value });
    // console.log(userDetails);
  };

  const onKeyDown = (e, key) => {
    if (e.key == 'Enter') {
      if (key == 'email') {
        pasRef.current.focus();
      }
      if (key == 'password') {
        btnRef.current.focus();
      }
    }
  };
  // ---------------------------STOP LOGIN DATA STORE----------------------------
  // ---------------------------START POST LOGIN DATA----------------------------
  const [loading, setLoading] = useState(false);
  console.log(userDetails);
  const onclick = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/user/login', userDetails);
      // console.log(response);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      setLoading(false);
      toast.success('login successful', {
        autoClose: 1500,
        onClose: () => {
          navigate('/home/userlist');
        },
      });
    } catch (e) {
      setLoading(false);
      toast.error('please try again');
    }
  };
  // ---------------------------STOP POST LOGIN DATA----------------------------

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
        <div className="user h-[89vh] flex justify-center items-center">
          <div className="login rounded-md">
            <div>
              <h1 className="text-center my-6 text-xl text-dark">LOGIN</h1>
            </div>
            <form>
              <ToastContainer position="top-center" />
              <Input
                placeHolder="Email"
                onChange={e => onChange(e, 'email')}
                onKeyDown={e => onKeyDown(e, 'email')}
              />
              <Input
                placeHolder="Password"
                type="password"
                refe={pasRef}
                onChange={e => onChange(e, 'password')}
                onKeyDown={e => onKeyDown(e, 'password')}
              />
            </form>
            {/* <p className="paragraph text-center text-secondary">
            Forgot password
          </p> */}
            <div className="flex justify-center">
              <button onClick={onclick} className="loading-btn" ref={btnRef}>
                {loading ? (
                  <ClipLoader color={'white'} loading={loading} size={20} />
                ) : (
                  'Login'
                )}
              </button>
            </div>
            {/* <p className="paragraph text-center mt-4 text-sm">
              <span className="text-primary">Don't have an account</span>

              <span
                className="text-secondary ml-5 paragraph"
                onClick={navigation}
              >
                Sign Up
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlogin;
