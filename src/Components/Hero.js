import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './hero.css'; // Import custom CSS
import Popup from './Popup'; // Import the popup component
import { Link } from 'react-router-dom';

const HeroSection = ({ isOpen }) => {
  const [enquiries, setEnquiries] = useState([]);
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fetch the enquiry data from the backend API
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('https://teemahlwitty.pythonanywhere.com/api/pupils/');
        setEnquiries(response.data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = contentRef.current;
  
    if (container && content) {
      const containerHeight = container.clientHeight;
      const contentHeight = content.scrollHeight;
  
      let scrollPosition = 0;
      const scrollSpeed = 0.5; // Adjust the scrolling speed
  
      const scroll = () => {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= contentHeight) {
          // Reset scroll position to create a continuous loop without a noticeable stop
          scrollPosition = -containerHeight;
        }
        container.scrollTop = scrollPosition;
      };
  
      const interval = setInterval(scroll, 30); // Adjust the interval for smoothness
  
      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [enquiries]);
  

  // Reverse the enquiries array to show latest entries first
  const reversedEnquiries = [...enquiries].reverse();

  return (
    <section
      className="relative text-white text-center py-20 bg-cover bg-center mt-5"
      style={{ backgroundImage: 'url(./others/banner.jpg)' }}
    >
      <Popup
        message="Admission is ongoing now!"
        imageUrl="/notification-icon.png"
        showDuration={5000}
        hideDuration={10000}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative px-4 sm:px-6 lg:px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Left Section - Summer Activity */}
            <div className="md:col-span-3">
              <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 transform transition-transform duration-300 hover:scale-105">
                <img
                  className="w-full h-32 object-cover rounded-md mb-4"
                  src="./others/summer.jpg"
                  alt="Marzwell Summer Activity"
                />
                <h2 className="text-2xl font-bold mb-4">Summer Activity Ongoing</h2>
                <div className="relative mb-6">
                  <p className="text-base">
                    Join our exciting summer programs designed to engage and educate students during the break. The
                    children learn coding, numeracy, are involved in the maths club, music, and speech fluency.
                  </p>
                </div>
                <Link to="/registration">
                  <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-pink-800 transition-colors duration-300">
                    Register Your Child Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Middle Section - Main Content */}
            <div className="md:col-span-6">
              <h1 className="text-5xl font-bold mb-4">Welcome to Marzwell School</h1>
              <p className="mt-4 text-lg mb-8">
                A place where learning is fun and engaging. At Marzwell School, we offer a comprehensive education that
                prepares students for the future while ensuring they enjoy their learning journey.
              </p>
              <button className="mt-8 px-8 py-4 bg-lemon-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300">
                Learn More
              </button>
            </div>

            {/* Right Section - Waiting List */}
            <div className="md:col-span-3">
  <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 overflow-hidden">
    <h2 className="text-2xl font-bold mb-4">Enrollment Prgress Tracker</h2>
    <div
      ref={scrollContainerRef}
      className="relative"
      style={{ height: '30rem', overflow: 'hidden' }} // Fixed height
    >
      <div ref={contentRef} className="absolute top-0 left-0 w-full">
        <table className="min-w-full divide-y divide-gray-200 table-scroll-container overflow-x-auto">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">S/N</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reversedEnquiries.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
                <td className="px-4 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-4 text-sm text-gray-800">{item.pupil_name}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Duplicate Table for Continuous Scroll */}
        <table className="min-w-full divide-y divide-gray-200 mt-2">
          <tbody className="bg-white divide-y divide-gray-200">
            {reversedEnquiries.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
                <td className="px-4 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-4 text-sm text-gray-800">{item.pupil_name}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
