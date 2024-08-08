import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DropdownUser = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = event => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = event => {
      if (!dropdownOpen || event.keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="relative ml-2">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </span>
        <span className="hidden lg:block">
          <span className="block text-sm font-medium text-black primary-color">
            {user.name}
          </span>
          <span className="block text-xs">{user.email}</span>
        </span>

        <div className="hidden sm:block">
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default theme ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        {/* <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-6 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              My Contacts
            </Link>
          </li>
          <li>
            <Link
              to="/pages/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <i className="fa-solid fa-gear"></i>
              Account Settings
            </Link>
          </li>
        </ul> */}
        <button
          className="flex items-center gap-3 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={logout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
