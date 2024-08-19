import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
          <img
                className="h-16 w-auto flex-shrink-0 "
                src="./marz_logo_3.png"
                alt="Responsive Logo"
              />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row mb-4 md:mb-0">
            <Link to="/" className="text-white-800 hover:text--500 px-4 py-2">Home</Link>
            <Link to="/registration" className="text-white-800 hover:text--500 px-4 py-2">Admission</Link>
            <Link to="/testimonials" className="text-white-800 hover:text--500 px-4 py-2">Testimonials</Link>
            <Link to="/blog" className="text-white-800 hover:text--500 px-4 py-2">Blog</Link>
            
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
              <FaFacebookF size={30} color="#3b5998" /> {/* Facebook color */}
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <FaTwitter size={30} color="#1da1f2" /> {/* Twitter color */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
              <FaInstagram size={30} color="#e4405f" /> {/* Instagram color */}
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
              <FaLinkedinIn size={30} color="#0077b5" /> {/* LinkedIn color */}
            </a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} TeemahLwittySwiffyFwarry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
