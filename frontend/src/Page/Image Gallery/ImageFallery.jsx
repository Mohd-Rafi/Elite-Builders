import React, { useEffect, useState } from 'react';
import './imagegallery.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import customAxios from '../../../utils/CustomAxios.js';
import { useParams } from 'react-router-dom';
import ReactGA from 'react-ga4';

const ImageFallery = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'New and Events Gallery',
  });
  const [eventImage, setEventImage] = useState({
    images: [],
    name: '',
    heading: '',
    date: '',
  });

  const { id } = useParams();
  const getEventImageApi = async () => {
    const response = await customAxios.get(`/newsandevents/detail/${id}`);
    setEventImage(response.data);
  };

  useEffect(() => {
    getEventImageApi();
  }, []);
  console.log(eventImage);
  return (
    <div>
      <Header />
      <div className="image-section">
        <img
          src={eventImage.images[0]}
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>{eventImage.name}</h1>
          <br />
        </div>
      </div>

      <div className="container mt-4 mb-5">
        <div className="row">
          {eventImage.images.map((item, i) => (
            <div className="col-md-4 pt-5" key={i}>
              <a data-fancybox="gallery">
                <img src={item} className="img-fluid" alt="Responsive image" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImageFallery;
