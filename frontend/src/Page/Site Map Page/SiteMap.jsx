import React, { useEffect, useState } from 'react';
import './sitemap.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../../utils/CustomAxios';
import Footer from '../../components/Footer/Footer';
import ReactGA from 'react-ga4';

const SiteMap = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Site Map',
  });
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  //filter
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

  //api call
  const fetchDataApiCall = async () => {
    try {
      const response = await customAxios.get('/buildercard');
      const uniqueDistricts = filterUniqueDistricts(response.data);
      setState(uniqueDistricts);
      sessionStorage.setItem('districtmap', JSON.stringify(uniqueDistricts));
    } catch (e) {
      console.log(e.message);
    }
  };

  //onClick districts
  const onClick = district => {
    navigate(`/districtName/${district}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const catchedDis = sessionStorage.getItem('districtmap');
    if (catchedDis) {
      setState(JSON.parse(catchedDis));
    } else {
      fetchDataApiCall();
    }
  }, []);
  // console.log(state);
  return (
    <>
      <Header />
      <div className="image-section">
        <img
          src="assets/banner_elite.webp"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Site Map</h1> <br />
        </div>
      </div>
      <div className="container mt-5 font-section sitemap-container-main">
        <div className="row site-map-section">
          <div className="col-12">
            <h4 style={{ textTransform: 'capitalize' }}>WHO WE ARE</h4>
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>ABOUT US</h5>
            <a
              onClick={() => {
                navigate('/philosophy');
                window.scrollTo({ top: 0 });
              }}
            >
              Philosophy
            </a>
            <a
              onClick={() => {
                navigate(`/philosophy${'#logosection'}`);
              }}
            >
              Our Logo
            </a>

            <a
              onClick={() => {
                navigate(`/philosophy${'#journeysection'}`);
              }}
            >
              Our Journey
            </a>

            <a
              onClick={() => {
                navigate(`/philosophy${'#visionsection'}`);
              }}
            >
              Vision & Mission
            </a>
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>INFORMATION</h5>
            <a
              onClick={() => {
                navigate('/homeloan');
                window.scrollTo({ top: 0 });
              }}
            >
              Home-loan FAQ
            </a>
            <a
              onClick={() => {
                navigate('/home-buying-guide');
                window.scrollTo({ top: 0 });
              }}
            >
              Home Buying Guide
            </a>
            <a
              onClick={() => {
                navigate('/elite-blog');
                window.scrollTo({ top: 0 });
              }}
            >
              Blogs
            </a>
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>MEDIA CENTER</h5>
            <a
              onClick={() => {
                navigate('/media-center');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              MEDIA
            </a>
            <a
              onClick={() => {
                navigate(`/media-center${'#newsandinterest'}`);
              }}
            >
              News And Events
            </a>
            <a
              onClick={() => {
                navigate(`/media-center${'#socialmediafeed'}`);
              }}
            >
              Social Media Feeds
            </a>
            <a
              onClick={() => {
                navigate(`/media-center${'#plantforplanet'}`);
              }}
            >
              Plant For The Planet
            </a>
          </div>
        </div>
        <div className="row site-map-section">
          <div className="col-12">
            <h4 style={{ marginTop: 15 }}>OUR SERVICES</h4>
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>WHAT WE DO</h5>
            <a
              onClick={() => {
                navigate('/residential');
                window.scrollTo({ top: 0 });
              }}
            >
              Residential
            </a>
            <a>Commercial</a>
            <a>Industrial</a>
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>OUR PROJECTS</h5>
            {state.map(item => (
              <a
                // className="btn btn-custom"
                onClick={() => onClick(item.district)}
                key={item._id}
                style={{ textDecoration: 'none' }}
              >
                {item.district}
              </a>
            ))}
          </div>
          <div className="col-md-3 text-center text-align-correct">
            <h5>SERVICES</h5>
            <a
              onClick={() => {
                navigate('/elite-privilage');
                window.scrollTo({ top: 0 });
              }}
            >
              Elite Previlages
            </a>
          </div>
          {/* <!-- <div className="col-md-3">
                <h5>MANUFACTURING</h5>
                <a href="manufacturing-interiors.html">SOBHA Interiors</a>
                <a href="manufacturing-glazing.html">Glazing and Metal Works</a>
                <a href="manufacturing-concrete.html">Concrete Products</a>
                <a href="manufacturing-restoplus.html">SOBHA Restoplus</a>
            </div> --> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SiteMap;
