import React, { useEffect } from 'react';
import './buildinglifestyles.css';
import ScrollReveal from 'scrollreveal';
import { Slide, Zoom } from 'react-awesome-reveal';

const BuildingLifeStyles = () => {
  return (
    <div className="custom-section container-fluid" style={{ marginTop: -8 }}>
      <div className="container mt-5 mb-5">
        <div className="row align-items-center content-row">
          <div className="col-md-4 image-container">
            <Zoom triggerOnce>
              <div className="image-wrapper">
                <img
                  src="/assets/elite_top_image.webp"
                  alt="Circular Image"
                  className="main-img img-fluid"
                />
                <div className="logo-img">
                  <img
                    src="/assets/elite_flag_log.png"
                    alt="Logo Image"
                    className=""
                  />
                </div>
              </div>
            </Zoom>
          </div>
          <div className="col-md-8 content-container">
            <Slide direction="up">
              <h2 className="font">Building Lifestyles</h2>
            </Slide>

            <p>
              Elite Developers is dedicated to "building lifestyles" in the
              truest sense. For us, it goes beyond merely constructing
              structures. We craft experiences that elevate everyday living.
              This driving philosophy is ingrained in our DNA, guiding us to
              create world-className, quality homes and communities that
              resonate with discerning individuals.
            </p>
            <Slide direction="up">
              <a className="btn btn-custom" href="/philosophy">
                READ MORE
              </a>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingLifeStyles;
