import React, { useEffect } from 'react';
import './eliteprivilage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import ScrollReveal from 'scrollreveal';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const ElitePrivilage = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Elite Privilage',
  });
  useEffect(() => {
    ScrollReveal().reveal('.animas', {
      delay: 300, // Delay in milliseconds until the animation starts
      duration: 600, // Duration of the animation
      distance: '50px', // Distance element moves during the reveal
      origin: 'bottom', // Direction from which the element appears
      easing: 'ease-in-out', // CSS easing option for the animation
      opacity: 0, // Starting opacity for the animation
      scale: 0.85, // Starting scale for the animation
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>
          Help Buy Villas and Flats in Thrissur, Kazhakoottam, Trivandrum
        </title>
        <meta
          name="description"
          content="Dedicated team offering the best, from designing your dream home to paying your electricity bill & moving your home."
        />
        <meta
          name="keywords"
          content="villas in Thrissur,flats Thrissur,builders thrissur"
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/previlage_banner.webp"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Elite Previlages</h1>
          <p></p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="heading-container">
          <hr className="line" />
          <span className="heading-text font">Services</span>
          <hr className="line2" />
        </div>
        <div className="paragra-sections mt-5">
          <p className="text-center font service-text">
            We have a dedicated team who can offer you the best of what you ask,
            from designing your dream home to paying your electricity bill and
            moving your home.
          </p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-4 pt-5">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fas fa-home"></i>
                </div>
                <h4
                  className="card-title-elite mt-3 font text-center"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Design
                </h4>
                <p className="card-text-elite mt-3">
                  Your home decides your lifestyle and by choosing an interior
                  design that suits your needs, you can live up to your dreams.
                  Our professional interior consultants create environs that
                  make you happy.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-sharp fa-solid fa-user-tie"></i>
                </div>
                <h4
                  className="card-title-elite text-center mt-3 font"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Travel Desk
                </h4>
                <p className="card-text-elite mt-3">
                  We will make your travel hassle free, no matter where you are
                  going. We arrange taxis, reserve hotel rooms and respond
                  quickly to other travel requirements. eClub Travel Desk can
                  also arrange special rates at some of the best hotels in
                  selected towns.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-sharp fa-solid fa-sack-dollar"></i>
                </div>
                <h4
                  className="card-title-elite mt-3 text-center font"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Wealth
                </h4>
                <p className="card-text-elite mt-3">
                  We find joy in creating long-term wealth for our customers.
                  For the same purpose, we provide our customers with special
                  schemes and early stage investment options in our future
                  projects and investments. Keep track of our investor
                  promotions to avail the benefits.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <h4
                  className="card-title-elite text-center mt-3 font"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Agent
                </h4>
                <p className="card-text-elite mt-3">
                  Are you looking to rent or sell your apartment? We have a team
                  driven to help you close the deal hassle-free and a strong
                  agent network that gets you maximum choices.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-solid fa-right-left"></i>
                </div>
                <h4
                  className="card-title-elite mt-3 font text-center"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Move Me
                </h4>
                <p className="card-text-elite mt-3">
                  Moving home is a tough task, and there are tons of works. Our
                  service team in association with professional movers can make
                  it easier for you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-solid fa-handshake-angle"></i>
                </div>
                <h4
                  className="card-title-elite mt-3 font text-center"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Assist
                </h4>
                <p className="card-text-elite mt-3">
                  We know you are busy with your job and family engagements. So
                  here is our eClub Assist team to help with your regular
                  payments such as Electricity Bill Payment, Water Bill
                  Payments, Property Tax, Land Tax, Association & Maintenance
                  Charges, etc.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 animas">
            <div className="card custom-card h-100">
              <div className="card-body">
                <div className="icon mt-3 text-center">
                  <i className="fa-solid fa-hands-praying"></i>
                </div>
                <h4
                  className="card-title-elite mt-3 font text-center"
                  style={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  E Club Insure
                </h4>
                <p className="card-text-elite mt-3">
                  We help you with your insurance needs and ensure that your
                  home is covered against damages due to natural calamities such
                  as earthquakes, flood, etc. for 25 years. Your home is sure to
                  last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <div
        className="modal fade"
        id="leadModal"
        tabIndex="-1"
        aria-labelledby="leadModalLabel"
        aria-hidden="true"
        style={{ marginTop: '90px' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leadModalLabel">
                Get In Touch
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form id="leadForm">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Your Email"
                  required
                />
                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Your Phone Number"
                  required
                />
                <textarea
                  name="message"
                  id=""
                  placeholder="Message"
                  className="form-control mb-3"
                ></textarea>
                <button type="submit" className="btn read-btns">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElitePrivilage;
