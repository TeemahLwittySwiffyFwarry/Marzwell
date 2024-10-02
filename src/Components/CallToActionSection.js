import React from 'react'
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <div>{/* Call to Action Section */}
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
</section></div>
  )
}

export default CallToActionSection