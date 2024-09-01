import React from 'react';
import {Link} from 'react-router-dom'
import Hero from './../Components/Hero'
import PopupReview from '../Components/PopupReview';

const LandingPage = () => {
  return (
     
    <div className="min-h-screen bg-gray-100">
      <div>
      {/* Your page content */}
      <PopupReview 
        message="Check out our latest reviews!" 
        showDuration={3000} 
        
        linkTo="/testimonials" 
      />
      </div>
      
      {/* Hero Section */}
      <Hero/>


      {/* Features Section */}
      <section className="py-20">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-center text-red-600">Our Features</h2>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/teacher2.jpg" // Replace with your image path
          alt="Experienced Teachers"
        /> 
        <h3 className="text-2xl font-bold mb-4">Experienced Teachers</h3>
        <p>We have a team of dedicated and experienced teachers.</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/career.jpg" // Replace with your image path
          alt="Modern Facilities"
        />
        <h3 className="text-2xl font-bold mb-4">Co-curricular(Career Day)</h3>
        <p>Our school is equipped with state-of-the-art facilities.</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/feature3.png" // Replace with your image path
          alt="Holistic Education"
        />
        <h3 className="text-2xl font-bold mb-4">Holistic Education</h3>
        <p>We focus on the overall development of our students.</p>
      </div>
    </div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/feature4.png" // Replace with your image path
          alt="Experienced Teachers"
        /> 
        <h3 className="text-2xl font-bold mb-4">Highly Focused Pupils</h3>
        <p>We have a team of dedicated and experienced teachers.</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/recorder.jpg" // Replace with your image path
          alt="Modern Facilities"
        />
        <h3 className="text-2xl font-bold mb-4">The Music Show</h3>
        <p>Our school is equipped with state-of-the-art facilities.</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src="feature/sport.jpg" // Replace with your image path
          alt="Holistic Education"
        />
        <h3 className="text-2xl font-bold mb-4">Sporting Activities</h3>
        <p>We focus on the overall development of our students.</p>
      </div>
    </div>
  </div>
</section>


      {/* Call to Action Section */}
      <section
  className="relative text-white text-center py-20 bg-cover bg-center"
  style={{ backgroundImage: 'url(/others/banner2.jpg)' }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text visibility */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold">Join Us Today!</h2>
    <p className="mt-4 text-lg">Enroll your child in our school for a bright future.</p>
    <Link to="/contact"><button className="mt-8 px-8 py-4 bg-lemon-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300">
      Contact Us
    </button></Link>
  </div>
</section>


      
    </div>
  );
};

export default LandingPage;
