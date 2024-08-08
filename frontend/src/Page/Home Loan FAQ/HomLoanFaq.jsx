import React, { useState, useEffect } from 'react';
import './HomLoanFaq.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import ScrollReveal from 'scrollreveal';
import { Fade } from 'react-awesome-reveal';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const HomLoanFaq = () => {
  //googel Analytics
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Home Loan FAQ',
  });
  const [openItem, setOpenItem] = useState(null);

  // Function to toggle accordion item
  const toggleAccordion = item => {
    setOpenItem(openItem === item ? null : item);
  };

  const accordionData = [
    {
      question: 'WHAT IS EMI?',
      answer: `EMI is the abbreviation of equated monthly instalment. This monthly instalment is paid by the borrower to the money lender (bank or other financial institutions). Borrower pays a part of the interest and principal amount together as the EMI every month.`,
    },
    {
      question: 'HOW WILL BANKS DECIDE THE LOAN AMMOUNT I AM ELIGIBLE FOR?',
      answer: `Banks will determine your loan eligibility largely by your income and repayment capacity. Other important factors include your age, qualification, number of dependants, your spouse's income (if any), assets & liabilities, savings history and the stability & continuity of occupation. Banks usually ask for up to 20% Own Contribution.`,
    },
    {
      question: 'WHAT DOES "OWN CONTRIBUTION" MEAN?',
      answer: `Own Contribution’ is the total cost of the property less bank's loan.`,
    },
    {
      question: 'DO I GET TAX BENEFITS ON THE LOAN?',
      answer: `Yes. You are eligible for tax benefits on the principal and interest components of your Home Loan under the Income Tax Act, 1961. As the benefits could vary each year, please do check with our Loan Counsellor about the tax benefits which you could avail on your loan.`,
    },
    {
      question: 'WHEN DO I START REPAYING THE PRINCIPAL AMOUNT?',
      answer: `Repayment of the principal commences from the month following the month in which you avail full disbursement of your loan. Pending final disbursement, you pay interest on the portion of the loan disbursed. This interest is called pre-EMI interest. Pre-EMI interest is payable every month from the date of each disbursement up to the date of commencement of EMI. In the case of under construction properties, Banks also offers you a unique ‘Tranching’ facility wherein you can choose the instalments you wish to pay till the time the property is ready for possession. Any amount over and above the interest which is paid by you goes towards principal repayment, thus helping you repay the loan faster. This is especially useful in case your disbursements are likely to be spread over a longer period of time.`,
    },
    {
      question:
        'WHAT DOES "AGREEMENT TO SELL" MEAN? DOES IT HAVE TO BE REGISTERED?',
      answer: `The ’Agreement to Sell’ in a property transaction is a legal document executed on a stamp paper that records in writing the understanding between the buyer and the seller and all the details of the property such as area, possession date, price etc. In many Indian states, the Agreement to Sell is required to be registered by law. We suggest that in your own interest you should register the Agreement within four months of the date of the Agreement at the office of the Sub-Registrar appointed by the State Government, under the Indian Registration Act, 1908.`,
    },
    {
      question: 'CAN I REPAY MY LOAN AHEAD OF SCHEDULE?',
      answer: `Yes, you can repay the loan ahead of schedule by making lump sum payments towards part or full prepayment, subject to the applicable prepayment charges. Banks may also offer a free-of-charge facility to accelerate your loan repayment called ‘Accelerated Repayment Scheme’. This option provides you the flexibility to increase the EMIs every year in proportion to the increase in your income which will result in you repaying the loan much faster.`,
    },
    {
      question:
        'WHAT ARE THE DOCUMENTS BANKS USUALLY ASK FOR PROCESSING A HOME LOAN',
      answer: `These documents may vary for case to case, depending on the borrower's background`,
    },
  ];

  return (
    <div>
      <Helmet>
        <title>
          Premuim Villas and Apartments | Banking Finance | flats for sale in
          punkunnam thrissur, trivandrum, kazhakoottam - Elite Developers
        </title>
        <meta
          name="description"
          content="Get the right assistance for any home loan from the banking partners of Elite Developers and own your dream home without any hassle."
        />
      </Helmet>

      <Header />
      <div className="image-section">
        <img
          src="/assets/home_loan_banner.png"
          alt="philosophy"
          className="img-fluid"
        />

        <div className="header-overlay font">
          <h1>Home Loan FAQ</h1>
          <p></p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="font">
          <h2 className="text-center head">Home Loan</h2>
        </div>
        <div className="sub-heading-section mt-4 text-center">
          <h5>Choose Your Home Loan From A Wide Array Of Options</h5>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq0.png"
                alt="HDFC Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_1.png"
                alt="ICICI Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_2.png"
                alt="IDBI Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_3.png"
                alt="State Bank of India"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_4.png"
                alt="AXIS Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_5.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_6.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_7.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_8.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_9.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_10.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="logo-box">
              <img
                src="/assets/faq_11.png"
                alt="Punjab National Bank"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-center font">FAQ</h1>
        <div
          className="accordion accordion-flush mt-5"
          id="accordionFlushExample"
        >
          {accordionData.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button fonts ${
                    openItem === index ? '' : 'collapsed'
                  }`}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                className={`accordion-collapse collapse ${
                  openItem === index ? 'show' : ''
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <Fade direction="down" triggerOnce>
                  <div className="accordion-body">{item.answer}</div>
                </Fade>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <div
        className="modal fade"
        id="leadModal"
        tabindex="-1"
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

export default HomLoanFaq;
