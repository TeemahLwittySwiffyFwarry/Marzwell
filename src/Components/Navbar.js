import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.about-dropdown')) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to determine if the current location matches any of the dropdown links
  const isAboutActive = () => {
    return (
      location.pathname === '/contact' ||
      location.pathname === '/careers' ||
      location.pathname === '/brief-history' ||
      location.pathname === '/gallery' ||
      location.pathname === '/blog'
    );
  };

  return (
    <>
      <nav style={{ backgroundColor: '#0ad4e7' }} className="fixed top-0 left-0 w-full shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Image */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="h-16 w-auto flex-shrink-0"
                  src="./marz_logo_3.png"
                  alt="Responsive Logo"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Toggle menu"
              >
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink
                to="https://portal.marzwellschools.com/login.php"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-600 font-extrabold'
                    : 'text-red-800 font-extrabold hover:text-yellow-600 hover:scale-110 hover:shadow-lg transition duration-300 px-4 py-2 rounded-lg font-medium'
                }
              >
                Portal
              </NavLink>
              <NavLink
                to="/lms"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-600 font-extrabold'
                    : 'text-red-800 font-extrabold hover:text-yellow-600 hover:scale-110 hover:shadow-lg transition duration-300 px-4 py-2 rounded-lg font-medium'
                }
              >
                LMS
              </NavLink>

              {/* About Us Dropdown */}
              <div className="relative about-dropdown">
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`${
                    isAboutActive() ? 'text-yellow-600' : 'text-red-800'
                  } font-extrabold hover:text-yellow-600 hover:scale-110 hover:shadow-lg transition duration-300 px-4 py-2 rounded-lg font-medium`}
                >
                  About Us
                </button>
                {isAboutDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-cyan-300 rounded-lg shadow-lg z-10">
                    <NavLink
                      to="/contact"
                      className="block px-4 py-2 text-red-800 font-medium hover:text-yellow-600"
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      Contact
                    </NavLink>
                    <hr />
                    <NavLink
                      to="/careers"
                      className="block px-4 py-2 text-red-800 font-medium hover:text-yellow-600"
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      Careers
                    </NavLink>
                    <hr />
                    <NavLink
                      to="/brief-history"
                      className="block px-4 py-2 text-red-800 font-medium hover:text-yellow-600"
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      Brief History
                    </NavLink>
                    <hr />
                    <NavLink
                      to="/gallery"
                      className="block px-4 py-2 text-red-800 font-medium hover:text-yellow-600"
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      Gallery
                    </NavLink>
                    <hr />
                    <NavLink
                      to="/blog"
                      className="block px-4 py-2 text-red-800 font-medium hover:text-yellow-600"
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      Blog
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/registration"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-600 font-extrabold'
                    : 'text-red-800 font-extrabold hover:text-yellow-600 hover:scale-110 hover:shadow-lg transition duration-300 px-4 py-2 rounded-lg font-medium'
                }
              >
                Admissions
              </NavLink>
              <NavLink
                to="/testimonials"
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-600 font-extrabold'
                    : 'text-red-800 font-extrabold hover:text-yellow-600 hover:scale-110 hover:shadow-lg transition duration-300 px-4 py-2 rounded-lg font-medium'
                }
              >
                Testimonials
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-[#0ad4e7]`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="https://portal.marzwellschools.com/login.php"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-600 font-extrabold'
                  : 'text-red-800 font-extrabold block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600'
              }
              onClick={() => setIsOpen(false)}
            >
              Portal
            </NavLink>
            <NavLink
              to="/lms"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-600 font-extrabold'
                  : 'text-red-800 font-extrabold block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600'
              }
              onClick={() => setIsOpen(false)}
            >
              LMS
            </NavLink>
            <button
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              className={`${
                isAboutActive() ? 'text-yellow-600' : 'text-red-800'
              } block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600`}
            >
              About Us
            </button>
            {isAboutDropdownOpen && (
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink
                  to="/contact"
                  className="text-red-800 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/careers"
                  className="text-red-800 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </NavLink>
                <NavLink
                  to="/brief-history"
                  className="text-red-800 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Brief History
                </NavLink>
                <NavLink
                  to="/gallery"
                  className="text-red-800 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </NavLink>
              </div>
            )}
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-600 font-extrabold'
                  : 'text-red-800 font-extrabold block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600'
              }
              onClick={() => setIsOpen(false)}
            >
              Admissions
            </NavLink>
            <NavLink
              to="/testimonials"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-600 font-extrabold'
                  : 'text-red-800 font-extrabold block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-600'
              }
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
