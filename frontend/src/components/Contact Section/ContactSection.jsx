import React, { useState, useEffect } from 'react';
import './contactsection.css';
import customAxios from '../../../utils/CustomAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';

const ContactSection = () => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaCode(newCaptcha);
  };

  //----------------------------------------------------

  const [enquiry, setEnquiry] = useState({
    name: '',
    message: '',
    mobileno: '',
    email: '',
  });

  const onChangeEnquiry = (e, key) => {
    setEnquiry({ ...enquiry, [key]: e.target.value });
    // console.log(enquiry);
  };

  const postEnquiryDatas = async () => {
    try {
      await customAxios.post('/enquiry', enquiry);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleSubmit = () => {
    if (captchaInput === captchaCode) {
      if (
        enquiry.name.length < 3 ||
        enquiry.email.length < 3 ||
        !enquiry.email.includes('@gmail.com') ||
        enquiry.mobileno.length > 10 ||
        enquiry.mobileno.length < 10
      ) {
        toast.warn('Enter all fields correctly', {
          position: 'top-center',
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        postEnquiryDatas();
        setCaptchaInput('');
        setEnquiry({ name: '', message: '', mobileno: '', email: '' });
        refreshCaptcha();

        //toast code

        // toast.success('Form submitted successfully', {
        //   position: 'top-center',
        //   autoClose: 800,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'colored',
        // });

        // redirection code
        const newwindow = window.open('/redirect', '_blank');
        if (newwindow) {
          setTimeout(() => {
            newwindow.close();
            // window.history.back();
          }, 3000);
        }
      }
    } else {
      toast.error('Captcha did not match', {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="contact-section">
      <ToastContainer style={{ marginTop: '100px' }} />

      <div className="container">
        <div className="row d-flex">
          <div className="col-md-6 d-flex justify-content-center pt-5">
            <div className="card form-card">
              <div className="card-body">
                <h3
                  className="card-titles font text-center mt-3"
                  style={{ fontWeight: '700' }}
                >
                  ENQUIRE NOW
                </h3>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NAME"
                    value={enquiry.name}
                    onChange={e => onChangeEnquiry(e, 'name')}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    value={enquiry.email}
                    placeholder="EMAIL"
                    onChange={e => onChangeEnquiry(e, 'email')}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="MOBILE NO."
                    value={enquiry.mobileno}
                    onChange={e => onChangeEnquiry(e, 'mobileno')}
                  />
                </div>
                <div className="form-group">
                  <div className="">
                    <textarea
                      name="message"
                      placeholder="Message"
                      onChange={e => onChangeEnquiry(e, 'message')}
                      value={enquiry.message}
                      className="form-control mb-3"
                    />
                  </div>
                </div>

                <div className="form-group captcha-wrapper">
                  <div className="captcha-circle" onClick={refreshCaptcha}>
                    <img
                      src="/assets/refresh.png"
                      alt=""
                      className="refresh-btn"
                    />
                  </div>
                  <div className="captcha-code" id="captchaCode">
                    {captchaCode}
                  </div>
                  <input
                    type="text"
                    className="form-control captcha-input"
                    placeholder="ENTER CAPTCHA"
                    value={captchaInput}
                    onChange={e => setCaptchaInput(e.target.value)}
                  />
                </div>
                <div className="text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-submit"
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center pt-5">
            <p className="text-italic">
              Take a step closer to owning your dream home!
            </p>
            <img
              src="/assets/home_icon.svg"
              alt="Home Image"
              className="home-image img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
