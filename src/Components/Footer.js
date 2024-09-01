import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://teemahlwitty.pythonanywhere.com/api/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        const { refresh, access } = response.data;
        
        // Store tokens in local storage
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('access_token', access);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
        }).then(() => {
          setShowModal(false);
          navigate('/admin_dashboard');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password. Please try again.',
      });
    }
  };

  return (
    <footer className="bg-gray-400 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img className="h-16 w-auto flex-shrink-0" src="./logos/marz_logo_3.png" alt="Responsive Logo" />
          </div>

          <div className="flex flex-col md:flex-row mb-4 md:mb-0">
            <Link to="/" className="text-white-800 hover:text--500 px-4 py-2">Home</Link>
            <Link to="/registration" className="text-white-800 hover:text--500 px-4 py-2">Admission</Link>
            <Link to="/testimonials" className="text-white-800 hover:text--500 px-4 py-2">Testimonials</Link>
            <Link to="/blog" className="text-white-800 hover:text--500 px-4 py-2">Blog</Link>
          </div>

          <div className="relative">
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                <FaFacebookF size={30} color="#3b5998" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <FaTwitter size={30} color="#1da1f2" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
                <FaInstagram size={30} color="#e4405f" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                <FaLinkedinIn size={30} color="#0077b5" />
              </a>
            </div>

            <div className="absolute -bottom-10 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={toggleModal}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-2xl transition duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} TeemahLwittySwiffyFwarry. All rights reserved.</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-200 bg-opacity-50">
          <div className="bg-cyan-200 p-8 rounded-lg shadow-xl max-w-md w-full">
            <img src="/logos/marz_logo_3.png" className="" alt="" />
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label htmlFor="password" className="block text-black font-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500 hover:text-gray-700 mt-5" size={20} />
                    ) : (
                      <FaEye className="text-gray-500 hover:text-gray-700 mt-5" size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 shadow-md hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
