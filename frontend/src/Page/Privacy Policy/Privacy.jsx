import React from 'react';
import './privacy.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import ReactGA from 'react-ga4';

const Privacy = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Privacy Policy',
  });
  return (
    <>
      <Header />
      <div className="image-section">
        <img
          src="/assets/privacy_page_pic.webp"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Privacy Policy</h1>
          <p></p>
        </div>
      </div>
      <div className="container font-section privacy-page-main">
        <div className="content-section">
          <div className="text-content">
            <h3 className="mb-5">INTRODUCTION</h3>
            <p style={{ textAlign: 'justify' }}>
              This Privacy Policy ("Policy") governs the collection, use,
              maintenance, and disclosure of information from users ("Users" or
              "you") of the website and microsite (collectively, "Site")
              operated by Elite Gardenia LLP, its subsidiaries, partners,
              agents, and affiliates (collectively, "Company," "we," or "us").
            </p>
          </div>

          <img
            src="/assets/Privacy_Cover.webp"
            alt="Description of your image"
            style={{ width: '420px' }}
          />
        </div>
        <div className="additional-heading">
          <h2 className="mb-5 mt-5">2. INFORMATION COLLECTION </h2>
        </div>
        <div className="text-content subsection">
          <li>
            Personal Identification Information: The Company may collect
            personal identification information from Users through various
            means, including but not limited to site visits, newsletter
            subscriptions, form submissions, and engagement with Site-related
            activities, services, features, or resources. Such information may
            include name, email address, mailing address, and phone number.
            Users may visit the Site anonymously or refuse to provide personal
            information, although this may limit access to certain Site-related
            activities.
          </li>
        </div>
        <div className="text-content subsection">
          <li>
            Non-Personal Identification Information: The Company may collect
            non-personal identification information about Users during Site
            interactions. This may include browser type, computer type,
            technical information about Users' means of connection to the Site
            (e.g., operating system, Internet service providers), and similar
            information.
          </li>
        </div>
        <div className="text-content subsection">
          <li>
            Web Browser Cookies: The Site may employ "cookies" to enhance User
            experience. Users may configure their web browsers to refuse cookies
            or provide alerts when cookies are being sent. However, some parts
            of the Site may not function properly if cookies are disabled.
          </li>
        </div>

        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">3. USE OF COLLECTED INFORMATION </h3>
          <p>
            The Company may use Users' personal information for the following
            purposes: a) To improve customer service and support efficiency; b)
            To personalize User experience; c) To improve the Site; d) To
            conduct promotions, contests, surveys, or other Site features; e) To
            send Users information about topics of interest, as agreed by Users;
            f) To send periodic emails.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">4. DATA PROTECTION </h3>
          <p>
            The Company implements appropriate data collection, storage, and
            processing practices, as well as security measures, to protect
            against unauthorized access, alteration, disclosure, or destruction
            of Users' personal information and data stored on the Site. However,
            the Company acknowledges limitations in data security effectiveness
            and indemnifies itself in the event of difficult-to-defend-against
            attacks.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">5. SHARING OF PERSONAL INFORMATION </h3>
          <p>
            The Company does not sell, trade, or rent Users' personal
            identification information to third parties. The Company may share
            contact information, with its subsidiaries, business partners,
            trusted affiliates, and advertisers for the purposes outlined in
            Section 3.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">6. AMENDMENTS TO THE POLICY </h3>
          <p>
            The Company reserves the right to update this Policy at its sole
            discretion. Users are responsible for periodically reviewing this
            Policy to stay informed about how their personal information is
            protected. Continued use of the Site following any modifications to
            the Policy constitutes acceptance of such changes.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">7. ACCEPTANCE OF TERMS </h3>
          <p>
            By using the Site, Users signify their acceptance of this Policy and
            any subsequent modifications. Users who do not agree with this
            Policy should refrain from accessing or using the Site.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">8. APPLICABILITY TO CALL CENTERS </h3>
          <p>
            This Policy applies to information and data collected by the
            Company's call centers in addition to the Site.
          </p>
        </div>
        <div className="text-content subsection">
          <h3 className="mt-5 mb-5">9. GOVERNING LAW AND JURISDICTION </h3>
          <p>
            This Agreement shall be governed by the laws of India and shall be
            subject to the exclusive jurisdiction of courts at Thrissur, Kerala.
          </p>
        </div>
        <br />
        {/* <div className="text-content subsection">
          <h5>
            By using the Site, you acknowledge that you have read, understood,
            and agree to be bound by this Privacy Policy.
          </h5>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
