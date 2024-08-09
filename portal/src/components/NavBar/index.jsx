import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import './navbar.css';
const NavBar = ({ sidebarOpen, setSidebarOpen = () => {} }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [sliderExpandButton, setSliderExpandButton] = useState(false);
  const [locationExpandButton, setLocationExpandButton] = useState(false);
  const [cardExpandButton, setCardExpandButton] = useState(false);
  const [careerExpandButton, setcareerExpandButton] = useState(false);

  const toogleFn = key => {
    if (key === 'slider') {
      setSliderExpandButton(!sliderExpandButton);
    } else if (key === 'location') {
      setLocationExpandButton(!locationExpandButton);
    } else if (key === 'card') {
      setCardExpandButton(!cardExpandButton);
    } else if (key === 'career') {
      setcareerExpandButton(!careerExpandButton);
    }
  };
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:block lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="gap-2 px-6 py-5 lg:py-6 flex justify-center">
        <Link className="w-32 mr-10" to="/home/userlist">
          <img
            src="/assets/Elite Logo 1.png"
            alt="elitebuilders-logo"
            className=""
          />
        </Link>
        {/* <div className="flex">
          <h1 className="text-red-600 text-3xl">Elite</h1>
          <h1 className="text-white text-sm ml-2 mt-3">Building Lifestyles</h1>
        </div> */}
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-bodydark2"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div
        className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
        style={{ height: '90vh' }}
      >
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-6">
          {/* <!-- Menu Group --> */}
          <div className="nav-menu-a">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to={'userlist'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i className="fa-solid fa-box-open mr-2"></i>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'createblogcard'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i className="fa-solid fa-clipboard mr-2"></i>
                  Blog Card
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'createuserreview'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i class="fa-solid fa-user-tag mr-2"></i>
                  User Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'createnews'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i className="fa-solid fa-microphone-lines mr-2"></i>
                  News And Event
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'enquiry'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i class="fa-solid fa-magnifying-glass mr-2"></i>
                  Enquiries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'popup'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i class="fa-regular fa-circle-up mr-2"></i>
                  Add Popup
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={'careers'}
                  className="navbar-switch py-2 px-4 flex items-center relative"
                >
                  <i class="fa-regular fa-envelope mr-2"></i>
                  Careers
                </NavLink>
              </li> */}

              <li
                onClick={() => {
                  toogleFn('career');
                }}
              >
                <div
                  className={`navbar-switch py-2 px-4 flex items-center relative cursor-pointer ${
                    careerExpandButton && 'navbar-switch-bg'
                  }`}
                >
                  <i class="fa-solid fa-book-open-reader mr-2"></i>
                  Career Section
                  <i
                    className={`fa-solid fa-angle-down absolute right-0 mr-4 ${
                      careerExpandButton ? 'hidden' : 'block'
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-angle-up absolute right-0 mr-4 ${
                      careerExpandButton ? 'block' : 'hidden'
                    }`}
                  ></i>
                </div>
              </li>
              <div
                className={`translate transform overflow-hidden ${
                  careerExpandButton ? 'block' : 'hidden'
                }`}
              >
                <ul className="mt-4 mb-5 flex flex-col gap-2 pl-6">
                  <li>
                    <NavLink
                      to={'careers'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      <i class="fa-regular fa-envelope mr-2"></i>
                      Careers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'careers-application'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      <i class="fa-regular fa-clipboard mr-2"></i>
                      Applications
                    </NavLink>
                  </li>
                </ul>
              </div>
              <li
                onClick={() => {
                  toogleFn('slider');
                }}
              >
                <div
                  className={`navbar-switch py-2 px-4 flex items-center relative cursor-pointer ${
                    sliderExpandButton && 'navbar-switch-bg'
                  }`}
                >
                  <i className="fa-solid fa-panorama mr-2"></i>
                  Slider Adding
                  <i
                    className={`fa-solid fa-angle-down absolute right-0 mr-4 ${
                      sliderExpandButton ? 'hidden' : 'block'
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-angle-up absolute right-0 mr-4 ${
                      sliderExpandButton ? 'block' : 'hidden'
                    }`}
                  ></i>
                </div>
              </li>
              <div
                className={`translate transform overflow-hidden ${
                  sliderExpandButton ? 'block' : 'hidden'
                }`}
              >
                <ul className="mt-4 mb-5 flex flex-col gap-2 pl-6">
                  <li>
                    <NavLink
                      to={'list-home-slider'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      Home Silder
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink className="navbar-switch py-2 px-4 flex items-center relative">
                      District Silder
                    </NavLink>
                  </li> */}
                </ul>
              </div>
              <li
                onClick={() => {
                  toogleFn('card');
                }}
              >
                <div
                  className={`navbar-switch py-2 px-4 flex items-center relative cursor-pointer ${
                    cardExpandButton && 'navbar-switch-bg'
                  }`}
                >
                  <i className="fa-solid fa-building-circle-arrow-right mr-2"></i>
                  Builder Card Adding
                  <i
                    className={`fa-solid fa-angle-down absolute right-0 mr-4 ${
                      cardExpandButton ? 'hidden' : 'block'
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-angle-up absolute right-0 mr-4 ${
                      cardExpandButton ? 'block' : 'hidden'
                    }`}
                  ></i>
                </div>
              </li>
              <div
                className={`translate transform overflow-hidden ${
                  cardExpandButton ? 'block' : 'hidden'
                }`}
              >
                <ul className="mt-4 mb-5 flex flex-col gap-2 pl-6">
                  <li>
                    <NavLink
                      to={'createlogo'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      {/* <i class="fa-brands fa-slack mr-2"></i> */}
                      Logos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'createqr'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      {/* <i class="fa-solid fa-qrcode mr-2"></i> */}
                      QR Codes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'creategallery'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      {/* <i class="fa-solid fa-qrcode mr-2"></i> */}
                      Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'createsitegallery'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      {/* <i class="fa-solid fa-qrcode mr-2"></i> */}
                      Site Plan Gallery
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to={'createstatusadding'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      Status Adding
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'createstatusgallery'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      Status Gallery
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      to={'createbuildercard'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      {/* <i class="fa-solid fa-building-circle-arrow-right mr-2"></i> */}
                      Builder Card
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* <li
                onClick={() => {
                  toogleFn('location');
                }}
              >
                <div
                  className={`navbar-switch py-2 px-4 flex items-center relative cursor-pointer ${
                    locationExpandButton && 'navbar-switch-bg'
                  }`}
                >
                  <i className="fa-solid fa-location-dot mr-2"></i>
                  Location
                  <i
                    className={`fa-solid fa-angle-down absolute right-0 mr-4 ${
                      locationExpandButton ? 'hidden' : 'block'
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-angle-up absolute right-0 mr-4 ${
                      locationExpandButton ? 'block' : 'hidden'
                    }`}
                  ></i>
                </div>
              </li>
              <div
                className={`translate transform overflow-hidden ${
                  locationExpandButton ? 'block' : 'hidden'
                }`}
              >
                <ul className="mt-4 mb-5 flex flex-col gap-2 pl-6">
                  <li>
                    <NavLink
                      to={'add-state'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      State
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'add-district'}
                      className="navbar-switch py-2 px-4 flex items-center relative"
                    >
                      District
                    </NavLink>
                  </li>
                </ul>
              </div> */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default NavBar;
