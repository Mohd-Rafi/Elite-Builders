import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './philosophy.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const Philosophy = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Philosophy',
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleReadMore = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    $(document).ready(function () {
      // Animate elements on scroll
      $(window).on('scroll', function () {
        $('.timeline ul li .content').each(function () {
          if (checkVisibility($(this)) && !$(this).hasClass('slide-in')) {
            $(this).addClass('slide-in');
          }
        });
      });

      // Trigger the scroll function on page load to check initial visibility
      $(window).scroll();

      // Toggle read more button
      // $('#read-more-btn').click(function () {
      //   $('#extra-content').toggleClass('open');
      //   var newText = $('#extra-content').hasClass('open')
      //     ? 'Read Less'
      //     : 'Read More';
      //   $(this).text(newText);
      // });

      // Toggle main menu visibility
      $('.menu-toggle').click(function () {
        $('.menu').toggleClass('active');
        $('body').toggleClass('menu-active');
      });

      // Close the main menu with a button
      $('.close-menu').click(function () {
        $('.menu').removeClass('active');
        $('body').removeClass('menu-active');
      });

      // Toggle sub-menu
      $('.with-arrow').click(function (e) {
        e.preventDefault();
        var subMenu = $(this).next('.sub-menu');
        subMenu.toggleClass('active');
      });

      // Close sub-menu with a button
      $('.close-submenu').click(function (e) {
        e.preventDefault();
        $(this).closest('.sub-menu').removeClass('active');
      });

      // Close the menu and sub-menu if clicking outside of them
      $(document).on('click', function (e) {
        if (
          !$(e.target).closest('.menu').length &&
          !$(e.target).closest('.menu-toggle').length
        ) {
          $('.menu').removeClass('active');
          $('body').removeClass('menu-active');
          $('.sub-menu').removeClass('active');
        }
      });

      // Function to check if an element is in the viewport
      function checkVisibility(element) {
        var windowHeight = $(window).height(),
          scrollTop = $(window).scrollTop(),
          elementOffsetTop = $(element).offset().top,
          elementHeight = $(element).outerHeight();

        // Check if the element is in the viewport
        return (
          scrollTop + windowHeight >= elementOffsetTop &&
          scrollTop <= elementOffsetTop + elementHeight
        );
      }
    });
  }, []); //
  const location = useLocation();
  const logoRef = useRef(null);
  const journeyRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const hash = location.hash;
    if (hash === '#logosection' && logoRef.current) {
      // logoRef.current.scrollIntoView({ behavior: 'smooth' });
      const elementPosition =
        logoRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 150;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (hash === '#journeysection' && journeyRef.current) {
      // logoRef.current.scrollIntoView({ behavior: 'smooth' });
      const elementPosition =
        journeyRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 130;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (hash === '#visionsection' && visionRef.current) {
      // logoRef.current.scrollIntoView({ behavior: 'smooth' });
      const elementPosition =
        visionRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [location]);
  return (
    <div>
      <Helmet>
        <title>
          Leading builders and developers in Thrissur|We provide luxury
          flats,apartments and villas in Thrissur
        </title>
        <meta
          name="description"
          content="Elite is a South Indian based company We are Top builders and developers in Kerala Thrissur. We provide luxury flats,apartments and villas in Thrissur,Trivandrum Kerala"
        />
      </Helmet>
      <Header />
      <div className="image-section">
        <img
          src="/assets/philosophy_banner.png"
          alt="philosophy"
          className="img-fluid"
        />
        <div className="header-overlay font">
          <h1>WHO WE ARE</h1>
          <p></p>
        </div>
      </div>
      <div className="container mt-5" style={{ padding: '20px' }}>
        <div className="row">
          <div className="col-md-6 pt-3">
            <p className="description">
              Our group legacy in business for more than half a century, bears
              testament to our reliability and trustworthiness as a business
              group. We have transformed lifestyles, established iconic
              landmarks, and expanded our footprint into multiple cities, with
              many more on the horizon. <br />
              <br />
              As we look ahead for our real-estate vertical, we remain
              steadfastly committed to creating intelligent, sustainable urban
              living spaces that harmoniously blend residential, professional,
              and recreational elements. We are acutely aware of the challenges
              posed by rapid urbanization, and as a responsible industry leader,
              we will continue to pioneer intelligent, lifestyle-driven
              solutions.
              <br />
              <br />
              We rely on our team's innovative spirit, passion for design, and
              embrace of technology to craft environments that add tremendous
              value to the lives of our residents and stakeholders. We will
              continually push boundaries, setting new benchmarks in the
              industry, strengthening our commitment to building lifestyles that
              inspire and enrich.
            </p>
          </div>
          <div className="col-md-6 pt-3">
            <img
              src="/assets/gallery_1.png"
              alt="construction_image"
              className="img-fluid"
            />
            <div className="row mt-5 d-flex justify-content-center">
              <div className="col-md-4 d-flex justify-content-center align-items-center pt-3">
                <img
                  src="/assets/elite_parent_logo.png"
                  alt="Logo 1"
                  className="logo img-fluid"
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center pt-3">
                <img
                  src="/assets/solgen.webp"
                  alt="Logo 2"
                  className="logo img-fluid"
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center pt-3">
                <img
                  src="/assets/green_logo.webp"
                  alt="Logo 3"
                  className="logo img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/wfBBiNtPZ_w?si=jVTOMGktjAAGEm-m"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="container mt-5" id="logosection" ref={logoRef}>
        <div
          className="heading-container"
          style={{ justifyContent: 'left', marginTop: 70 }}
        >
          <span className="heading-text font" style={{ fontWeight: 500 }}>
            Our Logo
          </span>
        </div>
        <div className="logo-sections mt-5" style={{ textAlign: 'center' }}>
          <img
            src="/assets/elite_developer_2.png"
            alt="elite_logo"
            className="img-fluid-philosophy"
          />
        </div>
        <div className="logo-para text-center mt-5">
          <p>
            The logo presents a bold and vibrant visual identity that reflects
            Elite's commitment to building lifestyles. The circular emblem at
            the center serves as the focal point, with its concentric rings of
            red, white, and yellow-green hues creating a radiant and energetic
            impression.
          </p>
          <br />
          <p>
            The inner red circle with a white horizontal line represents a
            stylized letterform "e," seamlessly integrated into the design. This
            letterform symbolizes the brand's initials and establishes a strong,
            recognizable icon. The warm red and yellow tones exude a sense of
            passion, energy, and vitality, perfectly capturing the brand's
            dedication to creating dynamic living experiences.
          </p>
          <br />
          <p>
            The outermost green hue not only adds a pop of colour but also
            subtly evokes associations with nature, sustainability, and growth –
            elements that are often integral to modern lifestyles. This ring
            acts as a vibrant frame, encapsulating the essence of the brand
            within its boundaries.
          </p>
          <br />
          <div className={`extra-content ${isOpen ? 'open' : ''}`}>
            <p>
              The wordmark "ELITE building lifestyles" sits below the emblem,
              rendered in a clean, modern typeface. The use of lowercase letters
              lends a sense of approachability and friendliness, while the bold
              styling maintains a strong presence. The tagline "building
              lifestyles" reinforces the brand's core philosophy and mission,
              serving as a constant reminder of Elite's commitment to creating
              holistic living experiences.
            </p>
            <br />
            <p>
              Overall, the Elite logo strikes a balanced harmony between bold,
              energetic visuals and a clear messaging that resonates with the
              brand's values. The combination of the dynamic emblem and
              descriptive wordmark effectively communicates Elite's dedication
              to building lifestyles that are vibrant, sustainable, and tailored
              to the needs of modern living.
            </p>
            <br />
          </div>
          <span className="read-more-btn" onClick={toggleReadMore}>
            {isOpen ? 'Read Less' : 'Read More'}
          </span>
        </div>
      </div>
      <div
        id="journeysection"
        ref={journeyRef}
        className="container"
        style={{ justifyContent: 'left', marginTop: 70 }}
      >
        <span className="heading-text font" style={{ fontWeight: 500 }}>
          Our Journey
        </span>
      </div>
      <div className="timeline" style={{ marginTop: '30px' }}>
        <ul>
          <li>
            <div className="content">
              <h3>OUR TEAM</h3>
              <p>
                Elite Developers is focused on development of residential,
                commercial and plotted real estate. Our team consists of
                professionals with a contagious passion for premium quality,
                design, innovation, environment and standards.
              </p>
            </div>
            <div className="time"></div>
          </li>
          <li>
            <div className="content">
              <h3>FOUR DECADES</h3>
              <p>
                A paragraph is defined as “a group of sentences or a single
                sentence that forms a unit” (Lunsford and Connors 116). Length
                and appearance do not determine whether a section in a paper is
                a paragraph. For instance, in some styles of writing,
                particularly journalistic styles, a paragraph can be just one
                sentence long.
              </p>
            </div>
            <div className="time"></div>
          </li>
          <li>
            <div className="content">
              <h3>LANDMARK PROJECTS</h3>
              <p>
                Landmark projects in Thrissur such as the Puzhakkal bridge, Bini
                Tourist Home, Sea wall construction at Chavakad, Chamakkala &
                Vadanappaly, Sree Narayana College at Nattika, old Income Tax
                building at Padinjare Kotta, Model Girls High School are but a
                few of the legacies, that today stand tall as a testament to
                their quality & workmanship. In 1990’s Elite pioneered in
                bringing the concept of plotted development through projects
                such as Elite Gardenia, Elite Enclave and Elite Knowledge
                Village.
              </p>
              <img
                src="/assets/Landmark.png"
                alt="Description of the image"
                style={{ width: '100%', maxWidth: '350px' }}
                className="img-fluid"
              />
            </div>
            <div className="time"></div>
          </li>
          <li>
            <div className="content">
              <h3>SEPTEMBER 2012</h3>
              <p>
                A paragraph is defined as “a group of sentences or a single
                sentence that forms a unit” (Lunsford and Connors 116). Length
                and appearance do not determine whether a section in a paper is
                a paragraph. For instance, in some styles of writing,
                particularly journalistic styles, a paragraph can be just one
                sentence long.
              </p>
            </div>
            <div className="time"></div>
          </li>
          <div style={{ clear: 'both' }}></div>
        </ul>
      </div>
      <section
        className="values-section container-fluid"
        id="visionsection"
        ref={visionRef}
      >
        <div className="container">
          <h2 className="values-heading">Our Core Values</h2>
          <div className="row">
            <div className="col-md-4">
              <h3 className="list-heading">MISSION</h3>
              <ul className="values-list">
                <li>
                  We will enhance the ecology of all our project locations
                  through plantation of more trees and environment friendly
                  landscaping.
                </li>
                <li>We will protect the local flora and fauna.</li>
                <li>
                  We will promote and use of green building practices in
                  building design, construction materials etc.
                </li>
                <li>
                  We will reduce our carbon footprint through promotion and use
                  of energy efficient lighting & alternative fuel vehicles.
                </li>
                <li>
                  We will augment our energy requirements through real energy
                  sources such as solar, wind, hydro etc.
                </li>
                <li>We will make all our projects Vastu compliant.</li>
                <li>
                  We will work towards inclusive growth of all our stakeholders.
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3 className="list-heading">VISION</h3>
              <ul className="values-list">
                <li>
                  Elite Developers aims to be the most premier Infrastructure &
                  Real estate developer with superior quality standards, design,
                  sustainable practices & professionalism, which will reflect in
                  our people, projects, processes and systems.
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3 className="list-heading">QUALITY POLICY</h3>
              <ul className="values-list">
                <li>
                  To be the industry champion in employing modern and proven
                  techniques, material and management systems, and to maintain
                  sustainable development in every area.
                </li>
                <li>
                  To efficiently and effectively manage the company's resources,
                  enabling timely realisation of projects conforming to every
                  quality standard prescribed.
                </li>
                <li>
                  To establish an excellent information management system and
                  communication link among all stakeholders.
                </li>
                <li>
                  To provide best in class solutions to clients through
                  assessment of their needs and demands.
                </li>
                <li>
                  To conform to every valid standard within the context of
                  project at the maximum level.
                </li>
                <li>
                  To conform to the country's all legal laws and ethical rules.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

// jQuery Functions

export default Philosophy;
