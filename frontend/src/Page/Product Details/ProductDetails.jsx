import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//fancybox
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import './productdetails.css';
import ContactSection from '../../components/Contact Section/ContactSection';
import Footer from '../../components/Footer/Footer';
import { Slide } from 'react-awesome-reveal';
import BuildingCard from '../../components/BuildingCard/BuildingCard';
import moment from 'moment';
import customAxios from '../../../utils/CustomAxios.js';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Slider as AntSlider, Button as AntButton } from 'antd';
import { ConfigProvider } from 'antd';

const ProductDetails = () => {
  const { id } = useParams();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: false,
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [state, setState] = useState({
    images: [],
    name: '',
    location: '',
    status: '',
    bedroom: '',
    hall: '',
    kitchen: '',
    district: '',
    price: '',
    areaRange: '',
    kreranumber: '',
    permitno: '',
    logo: '',
    qrcode: {},
    youtube: '',
    siteplan: {
      siteplangallery: [],
    },
    locationurl: '',
    statusgallery: [],
    amenitiesgallery: [],
    gallery: {
      images: [],
    },
    brochure: '',
    institutions: '',
    offices: '',
    facilities: '',
    worship: '',
    transportation: '',
    shopping: '',
    landmarks: '',
  });
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchDataApiCall = async () => {
    try {
      const response = await customAxios.get(`/buildercard/${id}`);
      setState(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const fetchAllDataApiCall = async () => {
  //   try {
  //     const response = await customAxios.get('/buildercard');
  //     setData(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleAccordionClick = index => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the active index
  };

  const accordionItems = [
    {
      title: 'EDUCATIONAL INSTITUTIONS',
      content: state.institutions,
    },
    {
      title: 'PUBLIC OFFICES',
      content: state.offices,
    },
    {
      title: 'HEALTHCARE FACILITIES',
      content: state.facilities,
    },
    {
      title: 'PLACES OF WORSHIP',
      content: state.worship,
    },
    {
      title: 'TRANSPORTATION',
      content: state.transportation,
    },
    {
      title: 'SHOPPING & ENTERTAINMENT',
      content: state.shopping,
    },
    {
      title: 'OTHER LANDMARKS',
      content: state.landmarks,
    },
    // Add more items as needed
  ];

  //download broshcure
  const brochureOnClick = async () => {
    // const blob = await pdf(<Brochure state={state} />).toBlob();
    // saveAs(blob, 'E-broshure.pdf');
    if (state.brochure) {
      const link = document.createElement('a');
      link.href = state.brochure; // Assumes state.brochure is the URL of the brochure
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //=---------------------Modal for enquire======================

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

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
  //--------------------Capcha----------------------

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
  // handle submit of brochure
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
        const newwindow = window.open('/redirect', '_blank');
        if (newwindow) {
          setTimeout(() => {
            newwindow.close();
          }, 2000);
        }
        setTimeout(() => {
          postEnquiryDatas();
          setCaptchaInput('');
          refreshCaptcha();
          handleClose();
          brochureOnClick();
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

  // handle submit of enquire
  const handleSubmitEnquire = () => {
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
        const newwindow = window.open('/redirect', '_blank');
        if (newwindow) {
          setTimeout(() => {
            newwindow.close();
          }, 2000);
        }
        setTimeout(() => {
          postEnquiryDatas();
          setCaptchaInput('');
          refreshCaptcha();
          handleClose1();
          // brochureOnClick();
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

  const variant = {
    initial: {
      x: -100,
      scale: 0.7,
      opacity: 0,
    },
    animate: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  //sample API for testing

  // const [sample, setSample] = useState([]);
  // const getSamppleApi = async () => {
  //   const response = await axios.get('https://api.sampleapis.com/coffee/hot');
  //   setSample(response.data);
  // };

  useEffect(() => {
    fetchDataApiCall();
    // getSamppleApi();
    // fetchAllDataApiCall();
    refreshCaptcha();
  }, [id]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    // Scroll to the top of the page after reload
    window.scrollTo(0, 0);
  }, []);

  const handleSliderChange = value => {
    setCurrentPage(value);
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, maxPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const maxPages = Math.ceil(state.gallery.images.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const selectedImages = state.gallery.images.slice(startIndex, endIndex);

  useEffect(() => {
    if (state.name) {
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname,
        title: `Product Details - ${state.name}`,
      });
    }
  }, [state.name]);

  useEffect(() => {
    // Initialize FancyBox for gallery1 with thumbnails
    Fancybox.bind("[data-fancybox='gallery']", {
      loop: true,
      buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'], // Shows thumbnailss
    });
    Fancybox.bind("[data-fancybox='gallery1']", {
      loop: true,
      buttons: ['slideShow', 'fullScreen', 'close'], // Hides thumbnails
    });
    Fancybox.bind("[data-fancybox='gallery2']", {
      loop: true,
      buttons: ['slideShow', 'fullScreen', 'close'], // Hides thumbnails
    });
  }, [state.images, state.statusgallery, state.siteplan.images]);

  //set max limit of 10 items for image gallery for mobile screens
  // const [isResponsive, setIsResponsive] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsResponsive(window.innerWidth <= 768); // Adjust the threshold as needed
  //   };

  //   handleResize(); // Check initial screen width
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // const imagesToShow = isResponsive
  //   ? state.gallery.images.slice(0, 10)
  //   : state.gallery.images;
  // console.log(state);
  return (
    <div>
      <ToastContainer style={{ marginTop: '100px' }} />

      {/* Helmet for SEO */}
      <Helmet>
        <title>
          Apartments Flats in {state.location}, {state.district} | investment
          property in trivandrum | flats near {state.location}, {state.district}
        </title>
        <meta
          name="description"
          content={`${state.name} is the new apartment project in ${state.district} with comfy ${state.apartmenttype} BHK apartments suitable for an affordable real estate investment`}
        />
      </Helmet>

      {/* Modal for brochure */}
      <Modal open={open} onClose={handleClose}>
        <>
          <Slide direction="down">
            <div
              className="modal modal-dialog modal-dialog-centered"
              style={{ marginTop: 100 }}
            >
              {/* <!-- Centered modal --> */}
              <div className="modal-content">
                {/* <div className="modal-header"></div> */}
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
                <div className="modal-footer">
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

      {/* Modal for Enquire */}
      <Modal open={open1} onClose={handleClose1}>
        <>
          <Slide direction="down">
            <div
              className="modal modal-dialog modal-dialog-centered"
              style={{ marginTop: 100 }}
            >
              {/* <!-- Centered modal --> */}
              <div className="modal-content">
                {/* <div className="modal-header"></div> */}
                <div className="modal-body">
                  {/* <!-- Form to collect user information --> */}
                  <form id="brochureForm">
                    <button
                      type="button"
                      className="btn-close btn-clodes"
                      onClick={handleClose1}
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
                    <div className="mb-3">
                      <label for="userPhone" className="form-label">
                        Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Message"
                        onChange={e => onChangeEnquiry(e, 'message')}
                        value={enquiry.message}
                        className="form-control mb-3"
                      />
                    </div>
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#434d5c' }}
                    onClick={handleClose1}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#4b8e3f' }}
                    onClick={handleSubmitEnquire}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Slide>
        </>
      </Modal>

      {/* Header Component */}
      <Header />

      {/* Slider Component */}
      <Slider {...settings}>
        {state.images.map((item, index) => (
          <div className="item" key={index}>
            <LazyLoadImage
              alt={item}
              effect="blur"
              className="carousel-image main-banner-image"
              src={item}
            />
            <div className="carousel-content">
              <div className="carousel-content-left">
                <h2>{state.name}</h2>
                <div className="location">
                  <i className="fa fa-map-marker"></i> {state.location}
                </div>
              </div>
              <div className="carousel-content-middle">
                <div className="arrows">
                  <i className="fa fa-chevron-down arrow-fade-1"></i>
                  <i className="fa fa-chevron-down arrow-fade-2"></i>
                  <i className="fa fa-chevron-down arrow-fade-3"></i>
                </div>
              </div>
              <div className="carousel-content-right">
                <div className="price">{state.price}</div>
              </div>
              {/* Contact details */}
              <div className="carousel-contact">
                <button className="btn-know-more">Know More</button>
              </div>
            </div>
          </div>
        ))}

        {/* Add more banners here in the same format */}
      </Slider>

      <div className="container mt-5">
        <div className="row">
          {/* <!-- Left Section --> */}
          <div className="col-md-6 mt-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <motion.h1
                  variants={variant}
                  initial="initial"
                  whileInView="animate"
                  className="font anim text-h"
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 500,
                    textAlign: 'left',
                  }}
                >
                  {state.name}
                </motion.h1>
                <div className="location-rera" style={{ color: '#212529' }}>
                  <div className="mt-3">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{state.location}</span>
                  </div>
                  <div>
                    <i className="fas fa-certificate"></i>
                    <span>{state.kreranumber}</span>
                  </div>
                </div>
              </div>
              <div className="qr-code">
                <img
                  src={state.qrcode.images}
                  alt="QR Code"
                  className="img-fluid"
                />
              </div>
            </div>
            {/* <div className="logo text-center mt-5">
              <img
                src={state.logo && state.logo.images}
                alt="Paradiza Logo"
                className="img-fluid"
              />
            </div> */}
            <div className="share-icons mt-3">
              <ul style={{ padding: 0 }}>
                <FacebookShareButton url={window.location.href}>
                  <li>
                    <i className="fab fa-facebook-f"></i>
                  </li>
                </FacebookShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <li>
                    <i className="fab fa-whatsapp"></i>
                  </li>
                </WhatsappShareButton>
                <TwitterShareButton url={window.location.href}>
                  <li>
                    <i className="fab fa-twitter"></i>
                  </li>
                </TwitterShareButton>
              </ul>
            </div>
            <motion.h2
              variants={variant}
              initial="initial"
              whileInView="animate"
              className="mt-5 font texts anim"
            >
              Premium Luxury Villas at {state.location}
            </motion.h2>
            <p className="mt-5 text_para">{state.description}</p>
          </div>

          {/* Right Section  */}
          <div className="col-md-6 right-section">
            <div
              className="card"
              style={{ backgroundColor: '#ede9e2', borderRadius: '0px' }}
            >
              <div className="card-body">
                <motion.h3
                  variants={variant}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="card-titles font mt-5 anima"
                >
                  Project Overview
                </motion.h3>
                <div className="ico-logo">
                  <img
                    src={state.logo && state.logo.images}
                    alt="Paradiza Logo"
                    className="img-fluid"
                  />
                </div>
                <div className="text-center mt-5 text-notalign btn-form-wrapper">
                  <button
                    className="btn btn-primarys"
                    onClick={() => handleOpen1()}
                  >
                    Enquire Now
                  </button>
                  <button
                    className="btn btn-outline-secondarys"
                    data-bs-toggle="modal"
                    data-bs-target="#brochureModal"
                    onClick={() => {
                      handleOpen();
                    }}
                    // onClick={brochureOnClick}
                  >
                    E-Brochure
                  </button>
                </div>
                <ul className="list-unstyled mt-3">
                  <li>
                    <strong>Location</strong>
                    <p>{state.location}</p>
                  </li>
                  <li>
                    <strong>Permit Number</strong>
                    <p>{state.permitno}</p>
                  </li>
                  <li>
                    <strong>K-RERA Number</strong>
                    <p>{state.kreranumber}</p>
                  </li>
                  <li>
                    <strong>Status</strong>
                    <p>{state.status}</p>
                  </li>
                  <li>
                    <strong>Unit Type</strong>
                    <p>{state.apartmenttype} BHK Villa</p>
                  </li>
                  <li>
                    <strong>Area Range</strong>
                    <p>{state.areaRange} Sq ft</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Component */}
      <div className="gallery-container">
        <div className="galleri">
          {/* selectedImages */}
          {selectedImages.map((image, index) => {
            const isThirdItem = index % 3 === 0;
            const itemHeight = isThirdItem ? '500px' : '245px';

            return (
              <div key={index} className="pics">
                <a data-fancybox="gallery" href={image}>
                  <LazyLoadImage
                    alt={image}
                    effect="blur"
                    style={{
                      width: '100%',
                      height: itemHeight,
                      objectFit: 'cover',
                    }}
                    wrapperProps={{
                      style: { transitionDelay: '100ms' },
                    }}
                    src={image}
                    className="image"
                  />
                </a>
              </div>
            );
          })}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                handleColor: 'green', // Set the handle color to green
                handleActiveColor: 'green',
                trackHoverBg: 'green',
                trackBg: 'green',
                colorPrimaryBorderHover: 'green',
              },
            },
          }}
        >
          {maxPages != 1 && (
            <div
              className="gallery-button-component"
              style={{ position: 'relative' }}
            >
              <div
                className={`gallery-next-prev-btn`}
                onClick={handlePrev}
                // disabled={currentPage === 0}
              >
                <i class="fa-solid fa-chevron-left"></i>
              </div>
              <div
                className=""
                style={{
                  position: 'absolute',
                  bottom: 19,
                  userSelect: 'none',
                }}
              >
                <p style={{ color: 'black' }}>
                  Page {currentPage + 1} / {maxPages}
                </p>
              </div>

              <AntSlider
                min={0}
                max={maxPages - 1}
                value={currentPage}
                onChange={handleSliderChange}
                className="slider"
              />
              <div
                className={`gallery-next-prev-btn`}
                onClick={handleNext}
                // disabled={currentPage === maxPages - 1}
              >
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          )}
        </ConfigProvider>
      </div>

      {/* SitePlan Component */}
      <>
        {state.siteplan && (
          <div className="container mt-5 mb-5 project-siteplan">
            <h2 className="text-center font project-heading">Project Plans</h2>

            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoplaySpeed={1000}
              pauseOnHover={false}
              swipeable={true}
              draggable={true}
              infinite={true}
              afterChange={false}

              // partialVisible={false}
            >
              {state.siteplan.siteplangallery.map((item, i) => (
                <motion.div
                  initial={{ scale: 0.7 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mx-auto d-flex flex-column align-items-center justify-content-center"
                  key={i}
                >
                  <a data-fancybox="gallery2" href={item.image}>
                    <LazyLoadImage
                      alt={item.image}
                      effect="blur"
                      className="img-fluid img-siteplan"
                      src={item.image}
                    />
                  </a>
                  <p
                    style={{
                      color: 'black',
                      fontSize: 14,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </Carousel>
          </div>
        )}
      </>

      {/* contact section */}
      <ContactSection />

      {/* <!-- Modal --> */}
      <div
        className=""
        style={{
          position: 'relative',
          backgroundImage: `url(${state.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '438px',
        }}
      >
        <div className="virtual-tour-heading font">Virtual Tour</div>
        <button
          className="play-button"
          data-bs-toggle="modal"
          data-bs-target="#videoModal"
        >
          <i className="fa fa-play" aria-hidden="true"></i>
          {/* <!-- FontAwesome icon --> */}
          PLAY NOW
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        aria-labelledby="videoModalLabel"
        aria-hidden="true"
        style={{ marginTop: '70px' }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalLabel">
                VIRTUAL TOUR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <iframe
                width="100%"
                height="450"
                src={state.youtube}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Amneties section */}
      <>
        {state.amenitiesgallery && state.amenitiesgallery.length > 0 && (
          <>
            <div className="heading-container mt-5">
              <span className="heading-text font" style={{ fontWeight: 500 }}>
                Amenities
              </span>
            </div>
            <div
              className="carousel-container container mt-5 animas mb-5"
              style={{ width: '100%' }}
            >
              {/* //start */}

              <Carousel
                responsive={responsive2}
                autoPlay={true}
                swipeable={true}
                pauseOnHover={false}
                draggable={true}
                infinite={true}
                afterChange={false}
                className="amneties-carousel"
              >
                {state.amenitiesgallery.map((item, i) => (
                  <motion.div
                    initial={{ scale: 0.7 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="square mx-auto"
                    key={i}
                  >
                    <img src={item.image} alt="Club House" />
                    <p>{item.description}</p>
                  </motion.div>
                ))}
              </Carousel>
            </div>
          </>
        )}
      </>

      {/* Location Map and Highlights  */}
      <div className="container" style={{ marginTop: '120px' }}>
        <div className="row">
          <div className="col-md-6">
            <h2 className="map-heading">Location Map</h2>
            <div className="map-container mt-5">
              <iframe
                src={state.locationurl}
                width="550"
                height="550"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                className="map-frame"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="map-heading">Location Highlights</h2>
            <div className="accordion mt-5">
              {accordionItems.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        index === activeIndex ? '' : 'collapsed'
                      }`}
                      type="button"
                      onClick={() => handleAccordionClick(index)}
                      style={{ borderRadius: '20px' }}
                    >
                      {item.title}
                      <div className="icon-circle">
                        <i
                          className={`fas ${
                            index === activeIndex
                              ? 'fa-chevron-up'
                              : 'fa-chevron-down'
                          }`}
                        ></i>
                      </div>
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse ${
                      index == activeIndex ? 'show' : ''
                    }`}
                  >
                    <div
                      className="accordion-body"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Approved By  */}
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="container text-center logos" style={{ margin: 0 }}>
              <div className="heading-container mt-5">
                <span
                  className="text-center font project-heading"
                  style={{ lineHeight: 1.5, fontWeight: 500 }}
                >
                  Project Approved By
                </span>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-12 col-sm-2 px-1 logose">
                  <img
                    src="/assets/HDFC LOGO 1.png"
                    alt="HDFC Bank"
                    className="img-fluid-custom"
                  />
                </div>
                <div className="col-12 col-sm-2 px-1 logose">
                  <img
                    src="/assets/ICIC LOGO 1.png"
                    alt="ICICI Bank"
                    className="img-fluid-custom"
                  />
                </div>
                <div className="col-12 col-sm-2 px-1 logose">
                  <img
                    src="/assets/SBI LOGO 1.png"
                    alt="State Bank of India"
                    className="img-fluid-custom"
                  />
                </div>
                <div className="col-12 col-sm-2 px-1 logose">
                  <img
                    src="/assets/AXIS LOGO 1.png"
                    alt="Axis Bank"
                    className="img-fluid-custom"
                  />
                </div>
                <div className="col-12 col-sm-2 px-1 logose">
                  <img
                    src="/assets/FEDERAL LOGO 1.png"
                    alt="Federal Bank"
                    className="img-fluid-custom"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 pt-5 mb-5">
            {state.statusgallery && state.statusgallery.length > 0 && (
              <div className="container">
                <div className="heading-container mt-5">
                  <span
                    className="heading-text font"
                    style={{ fontWeight: 500 }}
                  >
                    Project Status
                  </span>
                </div>

                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  autoplaySpeed={3000}
                  pauseOnHover={false}
                  swipeable={true}
                  draggable={true}
                  infinite={true}
                  className="mt-5"
                >
                  {state.statusgallery.map(item => (
                    <div
                      className="item d-flex align-items-center justify-content-center"
                      key={item._id}
                    >
                      <motion.div
                        initial={{ scale: 0.7 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="img-container"
                      >
                        <a data-fancybox="gallery1" href={item.image}>
                          <LazyLoadImage
                            alt={item.image}
                            effect="blur"
                            className="img-fluid img-status"
                            src={item.image}
                          />
                        </a>
                        <div className="date-overlay">
                          {moment(item.date).format('MMM D, YYYY')}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
        {/* <!-- <div className="gradient-line"></div> --> */}
      </div>

      {/* Building Card  */}
      <BuildingCard />
      <div style={{ marginTop: '80px' }}></div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
