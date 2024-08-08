import React, { useEffect, useState } from 'react';
import './eliteblog.css';
import Header from '../../components/Header';
import ScrollReveal from 'scrollreveal';
import Footer from '../../components/Footer/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import customAxios from '../../../utils/CustomAxios.js';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Slide, Zoom } from 'react-awesome-reveal';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const EliteBlogs = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Elite Blogs',
  });
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Adjust the breakpoint for large devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000, // Adjust the breakpoint for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600, // Adjust the breakpoint for tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);

  const fetchBlogApi = async () => {
    try {
      const response = await customAxios.get('/blogcard');
      setBlog(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onClickReadMore = id => {
    navigate(`/elite-blog-extra/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchBlogApi();
  }, []);

  // console.log(blog);
  return (
    <div>
      <Helmet>
        <title>
          Elite Developers | Flats,Apartments and villas in
          Thrissur,Trivandrum,Kerala
        </title>
        <meta
          name="description"
          content="Best builders in Kerala located at Thrissur and Trivandrum ,Offers you Villas and flats in Thrissur developed with an eye for great design employing the best resources."
        />
        <meta
          name="keywords"
          content="builders at thrissur,builders at trivandrum,apartments thrissur,flat thrissur,villa "
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/blog_banner.png"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Blogs</h1>
          <p></p>
        </div>
      </div>
      <Zoom triggerOnce>
        <div className="container my-blog-container mt-5 mb-5">
          <Slider {...settings}>
            {blog.map(item => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item._id}>
                <div className="card h-100 m-1">
                  <img
                    className="card-img-top img-fluid-blog"
                    src={item && item.images && item.images[0]}
                    alt="Blog Title"
                  />
                  <div className="card-body d-flex flex-column">
                    <p className="blog-date text-muted mt-3">
                      {moment(item.date).format('MMMM D YYYY')}
                    </p>
                    <h5 className="card-title-blog font mt-3 line-clamp-2">
                      {item.heading}
                    </h5>
                    <p
                      className="card-text-blog flex-grow-1 mt-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    <a
                      onClick={() => onClickReadMore(item._id)}
                      className="mt-auto blog-read-more"
                    >
                      READ MORE <i className="fas fa-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Zoom>

      <Footer />
    </div>
  );
};

export default EliteBlogs;
