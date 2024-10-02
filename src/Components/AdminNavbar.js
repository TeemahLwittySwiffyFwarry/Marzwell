import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-cyan-400 p-4 flex items-center rounded-lg shadow-lg my-4">
      <div className="flex flex-grow justify-around">
        <NavLink to="/inbox" className={({ isActive }) => 
            isActive ? 'text-red-400 font-semibold' : 'text-white hover:text-red-400 font-semibold transition-colors duration-300'
          }>
          Inbox
        </NavLink>
        <NavLink to="/blog_list" className={({ isActive }) => 
            isActive ? 'text-red-400 font-semibold' : 'text-white hover:text-red-400 font-semibold transition-colors duration-300'
          }>
          Blog
        </NavLink>
        <NavLink to="/enquiry_list" className={({ isActive }) => 
            isActive ? 'text-red-400 font-semibold' : 'text-white hover:text-red-400 font-semibold transition-colors duration-300'
          }>
          Edit Enquiry
        </NavLink>
        <NavLink to="/testimonial_list" className={({ isActive }) => 
            isActive ? 'text-red-400 font-semibold' : 'text-white hover:text-red-400 font-semibold transition-colors duration-300'
          }>
          Edit Testimonial
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavbar;