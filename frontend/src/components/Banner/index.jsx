import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './banner.css';
import customAxios from '../../../utils/CustomAxios.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ClipLoader } from 'react-spinners';
import ContentLoader from 'react-content-loader';

const CarouselComponent = ({ state, loading }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="main-slider">
      {loading ? (
        <div className="cc-loader-contentaa">
          <ContentLoader
            backgroundColor="rgba(0,0,0,0.18)"
            foregroundColor="rgba(0,0,0,0.09)"
            className="cc-loader-content"
          >
            <rect x="0" y="0" rx="0" ry="0" width="300%" height={'100%'} />
          </ContentLoader>
        </div>
      ) : (
        <Slider {...settings}>
          {state.map(item => (
            <div className="item" key={item._id}>
              <LazyLoadImage
                alt={item && item.images && item.images[0]}
                effect="blur"
                className="carousel-image main-banner-image"
                // wrapperProps={{
                //   style: { transitionDelay: '300ms' },
                // }}
                src={item && item.images && item.images[0]}
              />

              <div className="carousel-content">
                <div className="carousel-content-left">
                  {item.sliderName && <h2>{item.sliderName}</h2>}

                  {item.name && <h2>{item.name}</h2>}
                  {/* {item.sliderName ? ( */}
                  {item.location && (
                    <div className="location">
                      <p>
                        <i className="fa fa-map-marker"></i>
                        {item.location}
                      </p>
                    </div>
                  )}
                </div>
                <div className="carousel-content-middle">
                  <div className="arrows">
                    <i className="fa fa-chevron-down arrow-fade-1"></i>
                    <i className="fa fa-chevron-down arrow-fade-2"></i>
                    <i className="fa fa-chevron-down arrow-fade-3"></i>
                  </div>
                </div>
                <div className="carousel-content-right">
                  <div className="price">{item.price}</div>
                </div>
                <div className="carousel-contact">
                  <a
                    className="btn-know-more"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    Know More
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Add more banners here in the same format */}
        </Slider>
      )}
    </div>
  );
};

export default CarouselComponent;
