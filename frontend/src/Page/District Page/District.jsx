import React, { useEffect, useState } from 'react';
import './district.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import CarouselComponent from '../../components/Banner/index.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import customAxios from '../../../utils/CustomAxios.js';
import ReactGA from 'react-ga4';
import { Slide } from 'react-awesome-reveal';
import { Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const District = () => {
  const [state, setState] = useState([]);
  const { district } = useParams();
  const navigate = useNavigate();
  // console.log(district);
  const [districts, setDistricts] = useState([]);

  const filterUniqueDistricts = data => {
    const districtsSet = new Set();
    return data.filter(item => {
      if (districtsSet.has(item.district)) {
        return false;
      }
      districtsSet.add(item.district);
      return true;
    });
  };

  const onClickNavigate = district => {
    navigate(`/districtName/${district}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchDistrictApi = async () => {
    try {
      const response = await customAxios.get(
        `/buildercard/district/get?district=${district}`
      );
      setState(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUniqueDistrictApi = async () => {
    const response = await customAxios.get('/buildercard');
    const uniqueDistricts = filterUniqueDistricts(response.data);
    setDistricts(uniqueDistricts);
    sessionStorage.setItem(
      'districtPageDistrict',
      JSON.stringify(uniqueDistricts)
    );
    // console.log(state);
  };
  const onViewProjectClick = id => {
    navigate(`/productDetails/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  });

  const onChangeEnquiry = (e, key) => {
    setEnquiry({ ...enquiry, [key]: e.target.value });
  };

  const postEnquiryDatas = async () => {
    try {
      await customAxios.post('/enquiry', enquiry);
    } catch (e) {
      console.log(e);
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
  useEffect(() => {
    refreshCaptcha();
    if (district) {
      fetchDistrictApi();
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname,
        title: `District Page - ${district}`,
      });
    }
    const cachedData = sessionStorage.getItem('districtPageDistrict');
    if (cachedData) {
      setDistricts(JSON.parse(cachedData));
    } else {
      fetchUniqueDistrictApi();
    }
  }, [district]);
  // console.log(state);
  return (
    <div>
      <Header />
      <Modal open={open} onClose={handleClose}>
        <>
          <Slide direction="down">
            <div
              className="modal modal-dialog modal-dialog-centered"
              style={{ marginTop: '100px' }}
            >
              {/* <!-- Centered modal --> */}
              <div className="modal-content">
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

                    <div className="form-group captcha-wrapper wrap-align-correct">
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
      <CarouselComponent state={state} />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3 d-none d-md-block sidebar">
            <ul className="list-group">
              <a
                onClick={() => {
                  navigate('/residential');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <li
                  className="list-group-item"
                  style={{ textTransform: 'uppercase' }}
                >
                  Residential
                </li>
              </a>
              {districts.map(item => (
                <a key={item._id}>
                  <li
                    className={`list-group-item ${
                      district == item.district ? 'actives' : ''
                    }`}
                    style={{ textTransform: 'uppercase' }}
                    onClick={() => onClickNavigate(item.district)}
                  >
                    {item.district}
                  </li>
                </a>
              ))}
            </ul>
          </div>

          {/* <div className="col-12 d-md-none">
            <select className="form-control mb-3">
              <option value="">Select a location</option>
              <option value="/residential">Residential</option>
              <option value="/">Thiruvananthapuram</option>
              <option value="/">Thrissur</option>
            </select>
          </div> */}

          <div className="col-md-9 content">
            <div className="heading-section mb-4">
              <h3 className="top-heading font text-uppercase ">{district}</h3>
            </div>
            <div className="mt-5">
              <p className="description description-district mt-4">
                Elite Developers, one of Kerala's leading Real Estate
                Developers, is committed towards premium quality, standards, and
                innovation. Four decades of rich experience in residential,
                commercial, and plotted real estate enables us to provide
                world-class living spaces mingling natural elements.
              </p>

              <div className="row mt-5 item-maps">
                {state.map(item => (
                  <div
                    className="district-page-card-width col-md-6 col-sm-12 mb-4 animas"
                    key={item._id}
                  >
                    <Helmet>
                      <title>
                        Villas in {item.district} |Flats in {item.district} |
                        Apartments in {item.district} -All the building projects
                        in {item.district}
                      </title>
                      <meta
                        name="description"
                        content={`Villas Flats Apartments for sale in ${item.district} Kerala. Real estate investing, investment property, apartments for sale in  ${item.district} - Elite Developers `}
                      />
                    </Helmet>
                    <div className="card mb-4" style={{ borderRadius: '15px' }}>
                      <div
                        className="status-label"
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'white',
                          padding: '5px 10px',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.status}
                      </div>
                      <img
                        src={item.images[0]}
                        className="card-img-top card-image-district"
                        alt="Image 1"
                        style={{
                          borderTopLeftRadius: '15px',
                          borderTopRightRadius: '15px',
                        }}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ overflow: 'inherit' }}
                        >
                          {item.name}
                        </h5>
                        <p className="card-text">
                          <i className="fas fa-map-marker-alt"></i>{' '}
                          {item.location}
                        </p>

                        <div className="row">
                          <div className="col">
                            <h6 className="small_h">Area Range</h6>
                            <p className="card-texts">{item.areaRange}</p>
                          </div>
                          <div className="col ">
                            <h6 className="small_h">Apartment Type</h6>
                            <p className="card-texts">{item.apartmenttype}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="flex-container">
                          <div>
                            <h6 className="small_h">K-RERA</h6>
                            <p className="card-texts">{item.kreranumber}</p>
                          </div>
                          <div className="contact-buttons">
                            <a
                              className="btn btn-md property-btn-small whatsapp-btn"
                              href={`https://api.whatsapp.com/send?phone=91${item.whatsappno}`}
                              target="_blank"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                            <button className="btn btn-light btn-md property-btn-small phone-btn">
                              <i className="fas fa-phone"></i>
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify content-buttons">
                          <button
                            className="btn btn-customs"
                            onClick={() => handleOpen(item._id)}
                          >
                            BROCHURE
                          </button>
                          <button
                            className="btn btn-customse"
                            onClick={() => onViewProjectClick(item._id)}
                          >
                            VIEW PROJECT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="heading-section mb-4">
                <h3 className="top-heading font">Reach Us</h3>
              </div>
              <div className="row">
                <div className="col-md-3 pt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name*"
                    required
                  />
                </div>
                <div className="col-md-3 pt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email*"
                    required
                  />
                </div>
                <div className="col-md-3 pt-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile Number*"
                    required
                  />
                </div>
                <div className="col-md-3 pt-3">
                  <button className="btn read-btns">Enquire</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default District;
