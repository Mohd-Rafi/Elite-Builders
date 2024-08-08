import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import customAxios from '../../../utils/CustomAxios';
import ContentLoader from 'react-content-loader';
import './carouselsection.css';

const CarouselSection = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [userReview, setUserReview] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserReviewApiCall = async () => {
    try {
      setLoading(true);
      const response = await customAxios.get('/userreview');
      setUserReview(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.log(e);
    }
  };

  useEffect(() => {
    getUserReviewApiCall();
  }, []);
  return (
    <>
      <div className="py-5" style={{ backgroundColor: '#77c15f' }}>
        {loading ? (
          <ContentLoader
            backgroundColor="rgba(0,0,0,0.20)"
            foregroundColor="rgba(0,0,0,0.01)"
            className="cc-loader-review"
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height={'100%'} />
          </ContentLoader>
        ) : (
          <div className="container pt-5 pb-5 position-relative green-container">
            <div className="">
              <Slider {...settings}>
                {userReview.map(item => (
                  <div
                    className="d-flex align-items-center justify-content-center flex-wrap user-review-card"
                    key={item._id}
                  >
                    <div className="col-md-6">
                      <div className="text">
                        <p>"{item.review}"</p>
                        <p style={{ fontWeight: '700' }}>- {item.reviewer}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="video">
                        <iframe
                          src={item.youtubelink}
                          allowFullScreen
                          style={{ borderRadius: '20px' }}
                          onError={e => {
                            console.log('Error loading iframe', e);
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarouselSection;
