import React, { useEffect, useState } from 'react';
import './eliteblogextra.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import ScrollReveal from 'scrollreveal';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../../../utils/CustomAxios.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import { Zoom } from 'react-awesome-reveal';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const EliteBlogExtraPage = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.search,
    title: 'Elite Blogs Extra',
  });
  const { id } = useParams();

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

  const [blog, setBlog] = useState([]);
  const [description, setDescription] = useState({ description: '' });

  const navigate = useNavigate();

  const getBlogDescription = async () => {
    const response = await customAxios.get(`/blogcard/detail/${id}`);
    setDescription(response.data);
  };

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
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  useEffect(() => {
    getBlogDescription();
    fetchBlogApi();
  }, []);
  // console.log(description);

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
          content="builders at thrissur,builders at trivandrum,apartments thrissur,flat thrissur,villa  "
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/banner_elite.webp"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>The Blog Heading</h1>
          <br />
        </div>
      </div>

      <div className="container user-select-none">
        <div className="row">
          <div className="col-md-12">
            <div className="blog-content">
              <p
                className="descriptions"
                dangerouslySetInnerHTML={{ __html: description.description }}
              />

              <div className="ico">
                <span>Share:</span>
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
                  <i className="fab fa-whatsapp"></i>
                </a>

                <a
                  href="https://www.instagram.com"
                  className="social-media-icon d-inline-flex align-items-center justify-content-center"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
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
                      className="card-text-blog flex-grow-1 mt-3 line-clamp-2"
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

export default EliteBlogExtraPage;
