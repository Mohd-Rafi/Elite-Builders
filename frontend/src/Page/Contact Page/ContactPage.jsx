import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './contactpage.css';
import Footer from '../../components/Footer/Footer';
import { Fade } from 'react-awesome-reveal';
import ReactGA from 'react-ga4';
import customAxios from '../../../utils/CustomAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Contact Page',
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

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if (captchaInput === captchaCode) {
  //     alert('Captcha matched! Form submitted.');
  //   } else {
  //     alert('Captcha did not match. Please try again.');
  //   }
  // };
  const [activeTab, setActiveTab] = useState('thrissur');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  //----------------------------------------------------

  const [enquiry, setEnquiry] = useState({});

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
    <div>
      <Helmet>
        <title>
          luxury flats in thrissur | Leading builders in kerala, thrissur &
          trivandrum | Contact - Elite Developers
        </title>
        <meta
          name="description"
          content="Let us help you find your dream home! Fill in the online form with your query and we will get back to you at the earliest."
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/DALL·E 2024-04-27 18.36.00 - A construction site with builders working on various tasks. In the foreground, a builder with a yellow hard hat is operating a crane to lift large ste.webp"
          alt="Background Image"
        />

        <div className="header-overlay">
          <h1 className="font">Contact Us</h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 pt-5">
            <div className="button-section" role="group" id="location-buttons">
              <button
                type="button"
                className={`btn btnsys ${
                  activeTab === 'thrissur' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('thrissur')}
              >
                Thrissur
              </button>
              <button
                type="button"
                className={`btn btnsys ${
                  activeTab === 'trivandrum' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('trivandrum')}
              >
                Trivandrum
              </button>
            </div>
          </div>
          <div className="col-md-9 pt-5">
            <div className="card py-5">
              <div className="card-body">
                <div className="tab-content" id="location-info">
                  {activeTab === 'thrissur' && (
                    <Fade>
                      <div
                        className="tab-pane fade show active"
                        id="thrissur"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-4 ">
                            <h5 style={{ color: '#606C38' }}>LOCATION</h5>
                            <p>
                              Thrissur – Corporate Office Elite Gardenia Hills,
                              Near Reliance Petrol Pump, Puzhakkal P.O.,
                              Thrissur – 680 553 KERALA, India
                            </p>
                          </div>
                          <div className="col-md-4">
                            <h5 style={{ color: '#606C38' }}>CONTACT INFO</h5>
                            <p>
                              +91 99468 11111
                              <br />
                              +91 487 2322120
                            </p>
                          </div>
                          <div className="col-md-4">
                            <h5 style={{ color: '#606C38' }}>MAIL</h5>
                            <p>
                              sales@elitehomesindia.co.in
                              <br />
                              info@elitehomesindia.co.in
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 text-center ">
                            <a
                              href="https://www.google.com/maps/place/Elite+Developers/@10.5484897,76.1746162,15z/data=!4m6!3m5!1s0x3ba7ee573da096f5:0xf4ad0bfcf8cb6bea!8m2!3d10.5484897!4d76.1746162!16s%2Fg%2F1jgl_hngm?entry=ttu"
                              className="btn"
                              target="_blank"
                              style={{ color: '#fff', borderRadius: '25px' }}
                            >
                              Get Direction
                            </a>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  )}

                  {activeTab === 'trivandrum' && (
                    <Fade>
                      <div
                        className="tab-pane fade show active"
                        id="trivandrum"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <h5 style={{ color: '#606C38' }}>LOCATION</h5>
                            <p>
                              Trivandrum - Branch Office 375/1, Elite Samruddhi,
                              Vellaramkunnu Rd, Menamkulam, Kazhakuttom P.O,
                              Trivandrum-695 582
                            </p>
                          </div>
                          <div className="col-md-4">
                            <h5 style={{ color: '#606C38' }}>CONTACT INFO</h5>
                            <p>
                              +91 99468 11111
                              <br />
                              +91 487 2322120
                            </p>
                          </div>
                          <div className="col-md-4">
                            <h5 style={{ color: '#606C38' }}>MAIL</h5>
                            <p>
                              sales@elitehomesindia.co.in
                              <br />
                              info@elitehomesindia.co.in
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-center pt-3">
                            <a
                              href="https://www.google.com/maps/place/Elite+Developers-+Samrudhi+Apartments+in+Trivandrum/@8.5628552,76.8536949,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x3ba7ee573da096f5:0xf4ad0bfcf8cb6bea!2sElite+Developers!8m2!3d10.5484897!4d76.1746162!16s%2Fg%2F1jgl_hngm!3m5!1s0x3b05bfa586b89c7f:0x7e0be0b29cf55497!8m2!3d8.5628552!4d76.8562698!16s%2Fg%2F11j7j5l8zj?entry=ttu"
                              target="_blank"
                              className="btn"
                              style={{ color: '#fff', borderRadius: '25px' }}
                            >
                              View Location
                            </a>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container contact-form-container mb-5"
        style={{ marginTop: '90px' }}
      >
        <h2 className="top-heading font">Leave A Message</h2>
        <div className="mt-5">
          <div className="form-group">
            <input
              type="text"
              className="borderless-input"
              placeholder="Name"
              onChange={e => onChangeEnquiry(e, 'name')}
              value={enquiry.name}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="borderless-input"
              onChange={e => onChangeEnquiry(e, 'email')}
              placeholder="Email"
              value={enquiry.email}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="text"
              className="borderless-input"
              placeholder="Location"
            />
          </div> */}
          <div className="form-group">
            <input
              type="number"
              className="borderless-input"
              placeholder=" Mobile Number"
              onChange={e => onChangeEnquiry(e, 'mobileno')}
              value={enquiry.mobileno}
            />
          </div>
          <div className="form-group">
            <textarea
              className="borderless-input"
              placeholder="Message"
              style={{ paddingTop: 15, paddingLeft: 20 }}
              onChange={e => onChangeEnquiry(e, 'message')}
              value={enquiry.message}
              rows="3"
            />
          </div>
          <div className="form-group captcha-container">
            <button
              type="button"
              className="refresh-button"
              onClick={refreshCaptcha}
            >
              <img
                src="/assets/refresh.png"
                alt=""
                className="refresh-btn"
                style={{ padding: 5 }}
              />
            </button>
            <div className="captcha-code">{captchaCode}</div>
            <input
              type="text"
              className="borderless-inputs"
              required
              id="captchaInput"
              placeholder="ENTER CAPTCHA"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btnsys" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
