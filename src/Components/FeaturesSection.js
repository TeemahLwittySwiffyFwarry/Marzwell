import React from 'react'

const FeaturesSection = () => {
  return (
    <div>{/* Features Section */}
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
      <p>At Marzwell School, we have a team of dedicated and experienced teachers.</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src="feature/career.jpg" // Replace with your image path
        alt="Modern Facilities"
      />
      <h3 className="text-2xl font-bold mb-4">Co-curricular Activities</h3>
      <p>Marzwell School is equipped with state-of-the-art facilities.</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src="feature/feature3.png" // Replace with your image path
        alt="Holistic Education"
      />
      <h3 className="text-2xl font-bold mb-4">Holistic Education</h3>
      <p>Marzwell School focus on the overall development of the pupils.</p>
    </div>
  </div>
  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src="feature/feature4.png" // Replace with your image path
        alt="Experienced Teachers"
      /> 
      <h3 className="text-2xl  font-bold mb-4">Highly Focused Pupils</h3>
      <p className="text-justify">At Marzwell School, our team of dedicated and experienced teachers ensures that pupils focus when it matters most.</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src="feature/recorder.jpg" // Replace with your image path
        alt="Modern Facilities"
      />
      <h3 className="text-2xl font-bold mb-4">The Music Show</h3>
      <p className="text-justify">At Marzwell School, we go beyond academics by nurturing well-rounded pupils, excelling in extracurricular activities such as music.</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src="feature/sport.jpg" // Replace with your image path
        alt="Holistic Education"
      />
      <h3 className="text-2xl font-bold mb-4">Sporting Activities</h3>
      <p className="text-justify">We focus on the overall development of our students at Marzwell School, including sports and other activities that contribute to their growth and success.</p>
    </div>
  </div>
</div>
</section></div>
  )
}

export default FeaturesSection