import React, { useEffect, useState } from 'react';
import axios from '../../utilities/customAxios.js';
import { getLogedId } from '../../utilities/index.js';
import { Link } from 'react-router-dom';
import DropdownUser from '../DropdownUser';
import DropdownMessage from '../DropdownMessage';
import DarkModeSwitcher from '../DarkModeSwitcher';
const Header = ({ sidebarOpen, setSidebarOpen = () => {} }) => {
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    const response = await axios.get(`/user/profile/${getLogedId()}`);
    setUser(response.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow theme">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 my-2">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={e => {
              //   e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              {/* <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span> */}
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden w-20" to="/home">
            <img
              src="/assets/elite_developer_2.png"
              alt="elitebuilders-logo"
              className=""
            />
          </Link>
        </div>

        <div>
          <button
            className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md hidden lg:block"
            // onClick={e => {}}
          >
            <i className="fa-solid fa-angles-left mr-2"></i>Menu
          </button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-4 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser user={user} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
