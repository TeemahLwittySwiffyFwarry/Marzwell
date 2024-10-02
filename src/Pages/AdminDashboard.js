import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPen, FaListUl, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-green-50 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Inbox Card */}
          <Link
            to="/inbox"
            className="bg-cyan-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-cyan-300 transition-transform transform hover:scale-105"
          >
            <FaEnvelope size={36} className="text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Inbox</h2>
              <p className="text-gray-500">View and manage your inbox</p>
            </div>
          </Link>

          {/* Add Blog Card */}
          <Link
            to="/blog_list"
            className="bg-cyan-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-cyan-300 transition-transform transform hover:scale-105"
          >
            <FaPen size={36} className="text-green-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Add Blog</h2>
              <p className="text-gray-500">Create and publish new blogs</p>
            </div>
          </Link>

          {/* Enquiry List Card */}
          <Link
            to="/enquiry_list"
            className="bg-cyan-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-cyan-300 transition-transform transform hover:scale-105"
          >
            <FaListUl size={36} className="text-orange-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Enquiry List</h2>
              <p className="text-gray-500">View and manage enquiries</p>
            </div>
          </Link>

          {/* Edit Testimonial Card */}
          <Link
            to="/testimonial_list"
            className="bg-cyan-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-cyan-300 transition-transform transform hover:scale-105"
          >
            <FaEdit size={36} className="text-purple-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Edit Testimonial</h2>
              <p className="text-gray-500">Update and manage testimonials</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
