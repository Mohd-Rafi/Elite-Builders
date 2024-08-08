import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './locations.css';
import { json, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import customAxios from '../../../utils/CustomAxios.js';

const Locations = () => {
  const [state, setState] = useState([]);
  const navigate = useNavigate();
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
      sessionStorage.setItem('location', JSON.stringify(uniqueDistricts));
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
    const catchLoc = sessionStorage.getItem('location');
    if (catchLoc) {
      setState(JSON.parse(catchLoc));
    } else {
      fetchDataApiCall();
    }
  }, []);
  return (
    <div>
      <div className="locations-section mt-5">
        <div className="container">
          <Slide>
            <h2 className="font">Locations</h2>
          </Slide>
          <p className="mt-3">
            We carefully select locations that provide excellent connectivity,
            outstanding financial returns, and a pleasant neighbourhood
            experience.Each land is carefully vetted by our team of
            professionals so that you can invest worry free.
          </p>
          <Fade>
            <div className="item-locations-map">
              <a className="btn btn-custom mt-3" href="/residential">
                ALL LOCATIONS
              </a>

              {state &&
                state.map(item => (
                  <a
                    className="btn btn-custom mt-3"
                    onClick={() => onClick(item.district)}
                    key={item._id}
                  >
                    {item.district}
                  </a>
                ))}
            </div>
          </Fade>
        </div>
      </div>

      <div className="quote-section mt-5">
        <h2>
          "We're helping hundreds of customers <br /> find their dream homes"
        </h2>
        <Slide>
          <a className="btn btn-custom mt-5" href="/homeloan">
            HOME BUYERS GUIDE
          </a>
        </Slide>
      </div>
    </div>
  );
};

export default Locations;
