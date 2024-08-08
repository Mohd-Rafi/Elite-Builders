import React from 'react';
import Header from '../../components/Header';
import './terms.css';
import Footer from '../../components/Footer/Footer';
import ReactGA from 'react-ga4';

const Terms = () => {
  //googel Analytics
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Terms and Conditions',
  });
  return (
    <>
      <Header />
      <div className="image-section">
        <img
          src="/assets/terms_and_Conditions_cover.webp"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Terms And Conditions</h1>
          <p></p>
        </div>
      </div>
      <div className="terms-and-conditions-main">
        <div className="container">
          <div className="section font">
            <h3 className="mb-5">1. ACCEPTANCE OF TERMS </h3>
            <p>
              By accessing and using the Resources provided by Elite Gardenia
              LLP (hereinafter referred to as "the Company"), whether directly
              or indirectly, you agree to comply with and be bound by the
              following Terms of Use Agreement (hereinafter referred to as "the
              Agreement"). Your use of the Resources is contingent upon your
              acceptance of this Agreement and adherence to applicable laws,
              regulations, and generally accepted online practices.
            </p>
          </div>

          <div className="section font">
            <h3 className="mb-5">2. USER RESPONSIBILITIES </h3>
            <ul>
              <li>
                Information Accuracy: You shall provide accurate, current, and
                complete information as required for registration or use of the
                Resources.
              </li>
              <li>
                Account Security: You are solely responsible for maintaining the
                confidentiality of your account credentials and for all
                activities occurring under your account(s).
              </li>
              <li>
                Prohibited Activities: You are expressly prohibited from:
                <ul>
                  <li>
                    Accessing or attempting to access the Resources through
                    unauthorized means;
                  </li>
                  <li>
                    Engaging in any activity that disrupts or interferes with
                    the Resources, including associated servers and networks;
                  </li>
                  <li>
                    Copying, duplicating, reproducing, selling, trading,
                    renting, or reselling the Resources.
                  </li>
                </ul>
              </li>
              <li>
                Liability: You shall be solely responsible for any consequences,
                losses, or damages incurred by the Company, directly or
                indirectly, due to any unauthorized activities conducted by you.
              </li>
            </ul>
          </div>

          <div className="section font">
            <h3 className="mb-5">3. INDEMNIFICATION </h3>
            <p>
              You agree to indemnify and hold harmless the Company, its parent
              company, affiliates, and their respective directors, officers,
              managers, employees, donors, agents, and licensors from and
              against all losses, expenses, damages, and costs, including
              reasonable attorneys' fees, resulting from any violation of this
              Agreement or failure to fulfill obligations relating to your
              account.
            </p>
          </div>

          <div className="section font">
            <h3 className="mb-5">4. INTELLECTUAL PROPERTY </h3>
            <ul>
              <li>
                Trademarks: All trademarks, service marks, and logos displayed
                on the website are registered or unregistered trademarks of the
                Company. Reproduction or use of any trademark without prior
                written permission is strictly prohibited.
              </li>
              <li>
                Unsolicited Ideas: Any information or materials submitted to the
                Company through the website will be considered non-confidential
                and non-proprietary.
              </li>
            </ul>
          </div>

          <div className="section font">
            <h3 className="mb-5">5. LIMITATION OF LIABILITY </h3>
            <p>
              Your use of the website is at your sole risk. The Company shall
              not be liable for any direct or indirect losses or damages arising
              out of or in connection with your use of or inability to use the
              website, or your reliance on any information provided therein.
              This limitation applies to all losses and damages of any kind
              whatsoever, whether direct, indirect, general, special,
              incidental, consequential, exemplary, or otherwise.
            </p>
          </div>

          <div className="section font">
            <h3 className="mb-5">6. PRIVACY </h3>
            <p>
              The Company's Privacy Policy, incorporated by reference into this
              Agreement, governs the collection, management, processing,
              security, and storage of your private information.
            </p>
          </div>

          <div className="section font">
            <h3 className="mb-5">7. ENTIRE AGREEMENT </h3>
            <p>
              This Agreement constitutes the entire understanding between you
              and the Company with respect to your access to and use of the
              website, superseding all prior agreements, communications, and
              proposals, whether electronic, oral, or written.
            </p>
          </div>

          <div className="section font">
            <h3 className="mb-5">8. GOVERNING LAW AND JURISDICTION </h3>
            <p>
              This Agreement shall be governed by the laws of India and shall be
              subject to the exclusive jurisdiction of courts at Thrissur,
              Kerala.
            </p>
          </div>

          {/* <!-- <div className="section">
            <h5>By using the Resources, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</h5>
        </div> --> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Terms;
