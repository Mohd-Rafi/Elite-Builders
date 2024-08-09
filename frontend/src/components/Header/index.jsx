import React, { useState, useEffect, useCallback } from 'react';
import './header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Slide } from 'react-awesome-reveal';
import customAxios from '../../../utils/CustomAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(null); // Track active sub-menu
  const [fix, setFix] = useState(false);
  const [chatWindowVisible, setChatWindowVisible] = useState(false); // Track chat window visibility
  const [districts, setDistricts] = useState([]);
  // const [addForm, setAddForm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    mobileno: '',
    message: '',
  });
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
        enquiry.mobileno.length < 10 ||
        enquiry.message.length < 1
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
        refreshCaptcha();
        handleClose();

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

  const fetchUniqueDistrictApi = async () => {
    const response = await customAxios.get('/buildercard');
    const uniqueDistricts = filterUniqueDistricts(response.data);
    setDistricts(uniqueDistricts);
  };

  const toggleMenu = useCallback(() => {
    setMenuActive(prevState => !prevState);
  }, []);

  const closeMenu = () => {
    setMenuActive(false);
    setSubMenuActive(null); // Close any open sub-menu
  };

  const toggleSubMenu = useCallback(index => {
    setSubMenuActive(prevState => (prevState === index ? null : index));
  }, []);

  const closeSubMenu = () => {
    setSubMenuActive(null);
  };

  const handleClickOutside = event => {
    if (
      !event.target.closest('.menu') &&
      !event.target.closest('.menu-toggle')
    ) {
      closeMenu();
    }
  };

  const closeChatWindow = () => {
    setChatWindowVisible(false);
  };

  const sendMessage = () => {
    // Add the functionality to send a message
    const userInput = document.getElementById('user-input').value;
    // console.log('User message:', userInput);
    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
  };

  const onClickNavigate = district => {
    navigate(`/districtName/${district}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setFix(window.scrollY > 10);
    };

    const handleClickOutside = event => {
      if (
        !event.target.closest('.menu') &&
        !event.target.closest('.menu-toggle')
      ) {
        setMenuActive(false);
        setSubMenuActive(null);
      }
    };

    fetchUniqueDistrictApi();
    refreshCaptcha();

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <ToastContainer style={{ marginTop: '100px' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="modal show d-flex modal-enquire"
          style={{ display: 'block', marginTop: '90px' }}
        >
          <div className="modal-dialog modal-test-enquiry">
            <Slide direction="down" duration={400}>
              <div className="modal-contents">
                <div className="modal-header">
                  <h5 className="modal-title" id="leadModalLabel">
                    Get In Touch
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Name"
                    onChange={e => onChangeEnquiry(e, 'name')}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Your Email"
                    onChange={e => onChangeEnquiry(e, 'email')}
                    required
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Your Phone Number"
                    onChange={e => onChangeEnquiry(e, 'mobileno')}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    onChange={e => onChangeEnquiry(e, 'message')}
                    className="form-control mb-3"
                  ></textarea>
                  <div className="form-group captcha-wrapper mb-4">
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
                  <button
                    type="submit"
                    className="btn read-btns"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </Modal>
      <div className="fixed-icons-cont">
        <a
          href="https://api.whatsapp.com/send?phone=919946177643"
          target="_blank"
          className="icon-links whatsapp-icon"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a className="enquire-frm-btn" onClick={handleOpen}>
          {/* <i className="fa fa-question-circle" aria-hidden="true"></i> */}
          Enquire Now
        </a>
      </div>
      <div className="bottom-fixed-icons">
        <a href="tel:9946177643" className="call-link">
          <i className="fa fa-phone" aria-hidden="true"></i> Call
        </a>
        <div className="break">|</div>
        <a className="enquire-link" onClick={handleOpen}>
          <i className="fa fa-envelope" aria-hidden="true"></i> Enquire
        </a>
        <div className="break">|</div>
        <a
          href="https://api.whatsapp.com/send?phone=919946177643"
          target="_blank"
          className="whatsapp-link"
        >
          <i className="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
      </div>
      <div className={fix ? 'header' : 'no-header'}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="hamburger"></div>
          <div className="hamburger-border"></div>
        </div>
        <div className="logo">
          <a href="/">
            {fix ? (
              <img
                src="/assets/Elite Logo 1.png"
                alt="Logo"
                className="img-fluid logo-normal"
              />
            ) : (
              <img
                src="/assets/elite_flag_log.png"
                alt="Logo"
                className="logo-default"
              />
            )}
          </a>
        </div>
        <div className="phone-icon text-white"></div>
        <div className={`menu ${menuActive ? 'active' : ''}`}>
          <div className="menu-header">
            <h4 style={{ color: 'transparent' }}>.</h4>
            <i
              className="fas fa-times fa-xs close-menu"
              onClick={toggleMenu}
            ></i>
          </div>
          <ul className="menu-list mt-5">
            <li>
              <a href="/" className="menu-link lead">
                HOME
              </a>
            </li>
            <li>
              <a
                className="menu-link lead with-arrow"
                onClick={() => toggleSubMenu(0)}
                style={{ cursor: 'pointer' }}
              >
                ABOUT US <i className="fas fa-arrow-right"></i>
              </a>
              <ul className={`sub-menu ${subMenuActive === 0 ? 'active' : ''}`}>
                <li className="sub-menu-header">
                  <a className="close-submenu" onClick={closeSubMenu}>
                    <i className="fas fa-arrow-left"></i> Back
                  </a>
                </li>
                <li>
                  <a href="/philosophy" className="menu-link lead">
                    WHO WE ARE
                  </a>
                </li>
                <li>
                  <a href="/media-center" className="menu-link lead">
                    MEDIA CENTER
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="menu-link lead with-arrow"
                onClick={() => toggleSubMenu(1)}
                style={{ cursor: 'pointer' }}
              >
                Projects <i className="fas fa-arrow-right"></i>
              </a>
              <ul className={`sub-menu ${subMenuActive === 1 ? 'active' : ''}`}>
                <li className="sub-menu-header">
                  <a className="close-submenu" onClick={closeSubMenu}>
                    <i className="fas fa-arrow-left"></i> Back
                  </a>
                </li>
                <li>
                  <a href="/residential" className="menu-link lead">
                    RESIDENTIAL
                  </a>
                </li>
                {districts.map(item => (
                  <li
                    key={item._id}
                    onClick={() => onClickNavigate(item.district)}
                  >
                    <a className="menu-link lead">{item.district}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a
                className="menu-link lead with-arrow"
                onClick={() => toggleSubMenu(2)}
                style={{ cursor: 'pointer' }}
              >
                Info <i className="fas fa-arrow-right"></i>
              </a>
              <ul className={`sub-menu ${subMenuActive === 2 ? 'active' : ''}`}>
                <li className="sub-menu-header">
                  <a className="close-submenu" onClick={closeSubMenu}>
                    <i className="fas fa-arrow-left"></i> Back
                  </a>
                </li>
                <li>
                  <a href="/homeloan" className="menu-link lead">
                    HOME LOAN FAQ
                  </a>
                </li>
                <li>
                  <a href="/home-buying-guide" className="menu-link lead">
                    HOME BUYING GUIDE
                  </a>
                </li>
                <li>
                  <a href="/elite-blog" className="menu-link lead">
                    BLOGS
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/elite-privilage" className="menu-link lead">
                SERVICES
              </a>
            </li>
            <li>
              <a href="/careers" className="menu-link lead">
                CAREERS
              </a>
            </li>
            <li>
              <a href="/contact" className="menu-link lead">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="connect-with-us mt-5">
            <h4>Connect with us</h4>
            <div className="social-icons">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/Elitedevlp/"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/eliterealtydev" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/elitedevelopersindia/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send?phone=919946177643"
                    target="_blank"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/user/EliteDevelopersIndia"
                    target="_blank"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-overlay"></div>
      <div className="chat-window" id="chat-window" style={{ display: 'none' }}>
        <div className="chat-header" style={{ backgroundColor: '#095e54' }}>
          <h4 className="text-white">Chat with Us</h4>
          <button onClick={closeChatWindow} className="close-chat-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41l5.59 5.59L5 17.59 6.41 19l5.59-5.59 5.59 5.59L19 17.59l-5.59-5.59L19 6.41z" />
            </svg>
          </button>
        </div>
        <div className="chat-content" id="chat-content"></div>
        <div className="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
