import React, { useEffect, useState } from 'react';
import './footer.css';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../../utils/CustomAxios';

const Footer = () => {
  let navigate = useNavigate();

  const onClickNavigate = district => {
    navigate(`/districtName/${district}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const fetchUniqueDistrictApi = async () => {
    try {
      const response = await customAxios.get('/buildercard');
      const uniqueDistricts = filterUniqueDistricts(response.data);
      setDistricts(uniqueDistricts);
      sessionStorage.setItem('districts', JSON.stringify(uniqueDistricts));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const cachedDistricts = sessionStorage.getItem('districts');
    if (cachedDistricts) {
      setDistricts(JSON.parse(cachedDistricts));
    } else {
      fetchUniqueDistrictApi();
    }
  }, []);
  // console.log(districts);
  return (
    <div className="footer text-white py-5">
      <div className="container" style={{ marginTop: '90px' }}>
        <div className="row">
          {/* <!-- First Section --> */}
          <div className="col-md-4 pt-5">
            {/* <!-- Logo and vertical line --> */}
            <div className="logo-section">
              <img
                src="/assets/elite_parent_logo.png"
                alt="Logo"
                className="mb-3 img-fluid"
                style={{ width: '120px' }}
              />
              <div className="vertical-line"></div>
              &nbsp; &nbsp;
              <h6 className="title mt-3 mb-3">
                <span>
                  An Elite Foods <br />
                  <span>& Innovations </span>
                  <br />
                  <span>Group Enterprise</span>
                </span>
              </h6>
            </div>
            <br />
            <h5 className="with-line" style={{ color: '#77c15f' }}>
              ADDRESS
            </h5>
            <p className="address" style={{ lineHeight: 2.8 }}>
              Elite Gardenia Hills,
              <br />
              Near Reliance Petrol Pump, <br />
              Puzhakkal P.O.Thrissur -680 553
              <br />
              Kerala, India
            </p>
            {/* <br /> */}
            <h5 className="with-line" style={{ color: '#77c15f' }}>
              CONTACT US
            </h5>
            <p className="address" style={{ lineHeight: 3 }}>
              +91 99468 11111 <br />
              +91 487 2322120
            </p>
            <h5 className="with-line" style={{ color: '#77c15f' }}>
              EMAIL
            </h5>
            <p className="mt-3">sales@elitehomesindia.co.in</p>
          </div>
          <div className="col-md-1"></div>
          {/* <!-- Adjust the column size for the desired gap --> */}

          <div
            className="col-md-4 margin_section"
            style={{ marginTop: '150px', userSelect: 'none' }}
          >
            {/* <!-- Second Section Content --> */}
            <h5 className="with-line" style={{ color: '#77c15f' }}>
              MORE INFORMATION
            </h5>
            <br />
            <a
              className="footer-link"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/media-center${'#newsandinterest'}`);
              }}
            >
              <span style={{ color: '#77c15f' }}></span> News & Events
            </a>
            <br />

            {districts &&
              districts.map(item => (
                <div key={item._id}>
                  <a
                    className="footer-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onClickNavigate(item.district)}
                  >
                    Best builders in {item.district}
                  </a>
                  <br />
                </div>
              ))}
            {/* <a className="footer-link" style={{ cursor: 'pointer' }}>
              <span style={{ color: '#77c15f' }}></span> Best Builder in
              Trivandrum
            </a>
            <br /> */}
            {/* <br /> */}
            <h5 className="mb-4 with-line" style={{ color: '#77c15f' }}>
              PROJECT DETAILS
            </h5>
            {districts &&
              districts.map(item => (
                <div key={item._id}>
                  <a
                    className="footer-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onClickNavigate(item.district)}
                  >
                    Flats in {item.district}
                  </a>
                  <br />
                </div>
              ))}

            {/* <a className="footer-link" style={{ cursor: 'pointer' }}>
              <span style={{ color: '#77c15f' }}></span> Flats in Trivandrum
            </a> */}
            {/* <br /> */}
            <a
              className="footer-link"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/residential');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span style={{ color: '#77c15f' }}></span> All Location
            </a>
            <br />
          </div>
          <div className="col-md-3 pt-5">
            <h5 style={{ color: '#77c15f' }}>Get Social</h5>

            <a
              href="https://www.facebook.com"
              className="social-media-icon d-inline-flex align-items-center justify-content-center"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://www.twitter.com"
              className="social-media-icon d-inline-flex align-items-center justify-content-center"
            >
              <i className="fab fa-youtube"></i>
            </a>

            <a
              href="https://www.instagram.com"
              className="social-media-icon d-inline-flex align-items-center justify-content-center"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <div
              className="d-flex justify-content-between"
              style={{ marginTop: '120px' }}
            >
              <img
                src="/assets/certification1.png"
                alt="Logo 1"
                className="img-fluid"
                style={{ width: '80px', height: '80px' }}
              />
              <img
                src="/assets/certification2.png"
                alt="Logo 2"
                className="img-fluid"
                style={{ width: '80px', height: '80px' }}
              />
              <img
                src="/assets/certfications3.webp"
                alt="Logo 3"
                className="img-fluid"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
          </div>
        </div>
        <div className="row bottom-section">
          <div className="col-md-6">
            <p>Elite Gardenia LLP © Copyright 2024 All rights reserved</p>
          </div>
          <div
            className="col-md-6 text-md-right d-flex flex-wrap text-footer-a-tag"
            style={{
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a
              onClick={() => {
                navigate('/terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Terms of Use
            </a>
            |{' '}
            <a
              onClick={() => {
                navigate('/privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Privacy Policy
            </a>{' '}
            |
            <a
              onClick={() => {
                navigate('/disclaimer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Disclaimer
            </a>
            |{' '}
            <a
              onClick={() => {
                navigate('/rera');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              RERA Disclaimer
            </a>{' '}
            |
            <a
              onClick={() => {
                navigate('/sitemap');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
