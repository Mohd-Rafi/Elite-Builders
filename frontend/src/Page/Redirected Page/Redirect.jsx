import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import './Redirect.css';
const Redirect = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
      title: 'Enquiry Page',
    });
  }, []);
  return (
    <div className="redirect">
      <div className="redirect-content">
        <h1>Form Submitted Successfully...</h1>
        <h2>This window will close automatically.. Please wait...</h2>
        <p>If does not close automatically after 5 seconds, close manually</p>
      </div>
    </div>
  );
};

export default Redirect;
