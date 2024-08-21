import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './buildingcard.css';
import axios from 'axios';
// import ScrollReveal from 'scrollreveal';
import { useNavigate } from 'react-router-dom';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import customAxios from '../../../utils/CustomAxios.js';
import { ClipLoader } from 'react-spinners';
import { Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Instagram } from 'react-content-loader';

const BuildingCard = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    pauseOnHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Adjust the breakpoint for large devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000, // Adjust the breakpoint for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600, // Adjust the breakpoint for tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const [state, setState] = useState([]);
  let [loading, setLoading] = useState(false);
  const fetchDataApiCall = async () => {
    try {
      setLoading(true);
      const response = await customAxios.get('/buildercard');
      setState(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(true);
    }
  };
  // console.log(state);
  const navigate = useNavigate();

  const onClickViewProject = id => {
    navigate(`/productDetails/${id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  //-----------------------------------------------
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [brocId, setBrochId] = useState('');

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

  //download broshcure
  const brochureOnClick = async () => {
    const product = state.find(item => item._id === brocId);
    if (product && product.brochure) {
      const link = document.createElement('a');
      link.href = product.brochure; // Assumes product.brochure is the URL of the brochure
      link.download = 'brochure.pdf'; // You can specify a default name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error('No brochure available to download');
    }
  };

  //---------------------Modal-----------------------
  const [open, setOpen] = useState(false);
  const handleOpen = id => {
    setBrochId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //------------------Enquiry--------------------------------

  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    mobileno: '',
    message: '',
  });

  const onChangeEnquiry = (e, key) => {
    setEnquiry({ ...enquiry, [key]: e.target.value });
    // console.log(enquiry);
  };

  const postEnquiryDatas = async () => {
    try {
      await customAxios.post('/enquiry', enquiry);
    } catch (e) {
      console.log(e);
    }
  };
  // const renderPage = () => {

  // };
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
        const newwindow = window.open('/redirect', '_blank');
        if (newwindow) {
          setTimeout(() => {
            newwindow.close();
          }, 2000);
        }
        setTimeout(() => {
          handleClose();
          brochureOnClick();
          setCaptchaInput('');
          refreshCaptcha();
        }, 2300);
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

  const makeCall = phoneNumber => {
    window.location.href = 'tel:' + phoneNumber;
  };

  useEffect(() => {
    fetchDataApiCall();
    refreshCaptcha();
  }, []);
  // console.log(state);
  // console.log(brocId);
  return (
    <div className="container project-sections mt-5 h-full">
      <Modal open={open} onClose={handleClose}>
        <>
          <Slide direction="down">
            <div
              className="modal modal-dialog modal-dialog-centered"
              style={{ marginTop: '100px' }}
            >
              {/* <!-- Centered modal --> */}
              <div className="modal-content">
                {/* <div className="modal-header">
                  <h5 className="modal-title" id="modalLabel">
                    Download Brochure
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div> */}
                <div className="modal-body">
                  {/* <!-- Form to collect user information --> */}
                  <form id="brochureForm">
                    <button
                      type="button"
                      className="btn-close btn-clodes"
                      onClick={handleClose}
                    ></button>
                    <div className="mb-3">
                      <label for="userName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your name"
                        onChange={e => onChangeEnquiry(e, 'name')}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="userEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={e => onChangeEnquiry(e, 'email')}
                        name="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label for="userPhone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={e => onChangeEnquiry(e, 'mobileno')}
                        placeholder="Enter 10 digit mobile number"
                        required
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label for="captcha" className="form-label">
                        Captcha
                      </label>
                      <div className="input-group mb-3">
                        <p className="captcha-code captcha-code-allign-dis">
                          {captchaCode}
                        </p>
                        <div
                          className="captcha-circle"
                          onClick={refreshCaptcha}
                          style={{ height: '40px' }}
                        >
                          ↻
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Captcha"
                        value={captchaInput}
                        onChange={e => setCaptchaInput(e.target.value)}
                        required
                      />
                    </div> */}
                    <div className="form-group captcha-wrapper wrap-align-correct">
                      <div className="captcha-circle" onClick={refreshCaptcha}>
                        <img
                          src="/assets/refresh.png"
                          alt=""
                          className="refresh-btn"
                          style={{ padding: 5 }}
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
                  </form>
                </div>
                <div className="modal-footer-itens">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#434d5c' }}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#4b8e3f' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Slide>
        </>
      </Modal>
      <h2 className="mb-5 pro_heading" style={{ color: 'black' }}>
        Featured Projects
      </h2>
      {loading ? (
        <div className="insta-loader">
          <Instagram />
          <Instagram className="insta-loader-c1" />
          <Instagram className="insta-loader-c1" />
        </div>
      ) : (
        <div className="slider-container building-card">
          <Slider {...settings}>
            {state
              .filter(item => {
                return item.status != 'Completed';
              })
              .map(item => (
                <div className="item" key={item._id}>
                  <div className="card mb-4" style={{ borderRadius: '15px' }}>
                    <Fade>
                      <div className="status-label">
                        {item.status}
                        {/* <!-- Example status text --> */}
                      </div>
                    </Fade>

                    {item.images[0] && (
                      <img
                        src={item.images[0]}
                        className="card-img-top card-image-district"
                        loading="lazy"
                      />
                    )}
                    <div className="card-body">
                      <h5
                        className="card-title"
                        style={{ overflow: 'inherit' }}
                      >
                        {item.name}
                      </h5>
                      <p className="card-text-carousel">
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {item.location}
                      </p>

                      <div className="row">
                        <div className="col">
                          <h6 className="small_h">Area Range</h6>
                          <p className="card-texts line-clamp-1">
                            {item.areaRange} Sq.Ft
                          </p>
                        </div>
                        <div className="col ">
                          <h6 className="small_h ">Apartment Type</h6>
                          <p className="card-texts line-clamp-1">
                            {item.apartmenttype} BHK
                          </p>
                        </div>
                      </div>
                      {/* <hr> */}
                      <div className="flex-container">
                        <div>
                          <h6 className="small_h">K-RERA</h6>
                          <p className="card-texts">K-RERA/PRJ/ERN/050/2021</p>
                        </div>
                        <div className="contact-buttons">
                          <a
                            className="btn btn-md property-btn-small whatsapp-btn"
                            href={`https://api.whatsapp.com/send?phone=91${item.whatsappno}`}
                            target="_blank"
                          >
                            {/* <!-- Small button with WhatsApp icon --> */}
                            <i className="fab fa-whatsapp"></i>
                          </a>
                          <button
                            className="btn btn-light btn-md property-btn-small phone-btn"
                            onClick={() => makeCall(item.telephoneno)}
                          >
                            {/* <!-- Small button with telephone icon --> */}
                            <i className="fas fa-phone"></i>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify content-buttons">
                        <button
                          className="btn btn-customsee"
                          onClick={() => handleOpen(item._id)}
                          // onClick={brochureOnClick}
                        >
                          BROCHURE
                        </button>
                        <a
                          className="btn btn-customser"
                          onClick={() => onClickViewProject(item._id)}
                        >
                          VIEW PROJECT
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default BuildingCard;
