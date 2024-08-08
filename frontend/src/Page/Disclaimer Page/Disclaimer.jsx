import React from 'react';
import './disclaimer.css';
import Header from '../../components/Header';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from '../../components/Footer/Footer';
import ReactGA from 'react-ga4';

const Disclaimer = () => {
  //googel Analytics
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Disclaimer Page',
  });
  return (
    <>
      <Header />
      <div className="disclaimer-page-main">
        <div className="image-section">
          <img
            alt="/assets/Disclaimer_Cover.webp"
            loading="lazy"
            className="img-fluid"
            src="/assets/Disclaimer_Cover.webp"
          />

          <div className="header-overlay font">
            <h1>Disclaimer</h1>
            <p></p>
          </div>
        </div>

        <div className="container font-section">
          <div className="section">
            <h3 className="mb-5 mt-5">1. ARTISTIC REPRESENTATIONS</h3>
            <ul>
              <li>
                The artistic works contained on this website, including but not
                limited to 360-degree views, elevations, walkthroughs,
                e-brochures, and similar materials ("Artistic Works"), are for
                representation purposes only and do not constitute part of any
                agreement or create any legal binding on Elite Gardenia LLP
                ("the Company").
              </li>
              <li>
                Views expressed in connection with the Artistic Works do not
                represent actual deliverables. Soft furnishings, furniture, and
                gadgets depicted are not included in any offering.
              </li>
              <li>
                Products and technologies displayed or referred to are for
                representational purposes only. The Company does not guarantee
                the use of all items shown.
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="mb-5 mt-5">2. SPECIFICATIONS AND VARIATIONS</h3>
            <ul>
              <li>
                All specifications provided are indicative and subject to change
                as determined by the Company or competent authority.
              </li>
              <li>Marginal variations may occur during construction</li>
              <li>
                The extent, number, variety, and brand of equipment and
                appliances shown are tentative and liable to change at the sole
                discretion of the Company.
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="mb-5 mt-5">3. WAIVER OF OBJECTION RIGHTS </h3>
            <p>
              The applicant, allottee, or any other person shall have no right
              to raise objections regarding the matters described in Sections 1
              and 2 of this disclaimer.
            </p>
          </div>

          <div className="section">
            <h3 className="mb-5 mt-5">
              4. USER RESPONSIBILITY AND LIMITATION OF LIABILITY{' '}
            </h3>
            <ul>
              <li>
                It is the user's responsibility to evaluate the accuracy,
                completeness, and usefulness of any opinions, advice, services,
                or other information provided on this website
              </li>
              <li>
                All information is distributed with the understanding that the
                authors, publishers, and distributors are not rendering legal or
                other professional advice or opinions on specific facts or
                matters and assume no liability whatsoever in connection with
                its use.
              </li>
              <li>
                Users are advised to consult their own legal or tax advisors
                with respect to their personal situations.
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="mb-5 mt-5">5. EXCLUSION OF LIABILITY </h3>
            <p>
              In no event shall the Company and its related, affiliated, and
              subsidiary companies be liable for any direct, indirect, special,
              incidental, or consequential damages arising out of the use of the
              information provided herein.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Disclaimer;
