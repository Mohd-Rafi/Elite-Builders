import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import customAxios from '../../../utils/CustomAxios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
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
    mobbileno: '',
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
      console.log(e.file.response.url);
    }
  };

  const onClick = () => {
    setData({
      name: '',
      email: '',
      mobbileno: '',
      qualifications: '',
      role: '',
      experience: '',
      resume: '',
    });
  };
  useEffect(() => {
    getCareerApi();
  }, []);
  // console.log(data);
  return (
    <>
      <Header />
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
        <div className="current-openings-form">
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
                <option value="Civil">Civil</option>
                <option value="Sales and marketing">Sales and marketing</option>
                <option value="Finance">Finance</option>
                <option value="Admin & Liaisoning">Admin & Liaisoning</option>
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
          <button onClick={onClick}>SUBMIT</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Careers;
