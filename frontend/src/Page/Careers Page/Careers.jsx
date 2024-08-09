import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import customAxios from '../../../utils/CustomAxios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './careers.css';

const Careers = () => {
  const [career, setCareer] = useState([]);

  const getCareerApi = async () => {
    try {
      const response = await customAxios.get('/career');
      setCareer(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const [data, setData] = useState({
    name: '',
    email: '',
    mobileno: '',
    qualifications: '',
    role: '',
    experience: '',
    resume: '',
  });

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onUpload = e => {
    if (e.file && e.file.response) {
      setData({ ...data, resume: e.file.response.url });
    }
  };

  const postApplication = async () => {
    try {
      const response = await customAxios.post('/career-application', data);
      if (response && response.data) {
        toast.success('Application Submitted', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (e) {
      toast.error('Somethings wrong..try again', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const onClick = e => {
    e.preventDefault();
    if (
      data.name.length < 3 ||
      data.email.length < 3 ||
      data.mobileno.length < 3 ||
      data.experience.length < 3 ||
      data.qualifications.length < 1 ||
      data.resume.length < 3 ||
      data.role.length < 3
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
      postApplication();
      setData({
        name: '',
        email: '',
        mobileno: '',
        qualifications: '',
        role: '',
        experience: '',
        resume: '',
      });
    }
  };

  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Career Page',
  });
  useEffect(() => {
    getCareerApi();
  }, []);
  console.log(data);
  return (
    <>
      <ToastContainer style={{ marginTop: '100px' }} />
      <Helmet>
        <title>
          Real Estate Jobs in Kerala | Elite Developers | Thrissur & Trivandrum
        </title>
        <meta
          name="description"
          content="Would you like to begin your career at Elite Developers? We are open up for applications from experienced professionals. Apply now!"
        />
        <meta
          property="og:title"
          content="Real Estate Jobs in Kerala | Elite Developers | Thrissur &Trivandrum"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Would you like to begin your career at Elite Developers? We are open up for applications from experienced professionals. Apply now!"
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/DALL·E 2024-04-27 18.36.00 - A construction site with builders working on various tasks. In the foreground, a builder with a yellow hard hat is operating a crane to lift large ste.webp"
          alt="Background Image"
        />

        <div className="header-overlay">
          <h1 className="font">Career Page</h1>
        </div>
      </div>
      <div className="current-openings-container">
        <h1>CURRENT OPENINGS</h1>
        <div className="current-openings-container-body">
          {career.map((item, i) => (
            <div className="current-openings-cards" key={i}>
              <p className="current-openings-cards-item-name">{item.role}</p>
              <p className="current-openings-cards-item-vacancies">
                {item.vaccancies} vaccancies available
              </p>
              <button>APPLY NOW</button>
            </div>
          ))}
        </div>
        <form className="current-openings-form" onSubmit={onClick}>
          <h1>APPLY NOW</h1>
          <div className="current-openings-form-container">
            <div className="form-container-fields">
              <p>YOUR NAME</p>
              <input
                onChange={e => onChange(e, 'name')}
                value={data.name}
                type="text"
                placeholder="Type your name"
              />
            </div>
            <div className="form-container-fields">
              <p>YOUR EMAIL</p>
              <input
                onChange={e => onChange(e, 'email')}
                value={data.email}
                type="text"
                placeholder="Type your emal"
              />
            </div>
            <div className="form-container-fields">
              <p>YOUR MOBILE NO</p>
              <input
                onChange={e => onChange(e, 'mobileno')}
                value={data.mobileno}
                type="number"
                placeholder="Type your mobile no"
              />
            </div>
            <div className="form-container-fields">
              <p>YOUR QUALIFICATIONS</p>
              <input
                onChange={e => onChange(e, 'qualifications')}
                type="text"
                value={data.qualifications}
                placeholder="Type your qualifications"
              />
            </div>
            <div className="form-container-fields">
              <p>YOUR EXPERIENCE</p>
              <input
                value={data.experience}
                onChange={e => onChange(e, 'experience')}
                type="text"
                placeholder="Type your experience"
              />
            </div>
            <div className="form-container-fields">
              <p>APPLYING FOR</p>
              <select value={data.role} onChange={e => onChange(e, 'role')}>
                <option disabled value="">
                  Select a role
                </option>
                {career.map((item, i) => (
                  <option value={item.role} key={i}>
                    {item.role}
                  </option>
                ))}
              </select>
            </div>

            {/* <input type="text" placeholder="Your name" /> */}
          </div>
          <Upload
            name="file"
            action="http://localhost:3000/upload/image"
            onChange={onUpload}
          >
            <Button icon={<UploadOutlined />} className="upload-field">
              Upload Resume
            </Button>
          </Upload>
          <button>SUBMIT</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Careers;
