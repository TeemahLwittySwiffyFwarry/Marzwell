import React from 'react';

const Careers = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Join Our Team</h1>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              We are looking for talented and passionate individuals to join our team. Check out the open positions below!
            </p>
          </div>

          {/* Advertisement Image */}
          <div className="flex justify-center mb-8">
            <img
              src="others/recruit.png" // Replace with the path to your advertisement image
              alt="Job Advertisement"
              className="max-w-full h-auto rounded-md shadow-lg"
            />
          </div>

          {/* Available Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">Mathematics Instructor</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">Class Teachers</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            {/* Add more positions here */}
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">Class Assistance</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">Office Assistance</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            
                        {/* Add more positions here */}
          </div>

          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">After School attendant</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800">Accountant</h3>
              <p className="text-gray-600">Location: Abule Egba and its Evirons.</p>
              <p className="text-gray-600">Type: Full-time</p>
              
              <p className="mt-2 px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kindly send your CV to irecruitmentmain@gmail.com
              </p>
            </div>
            
                        {/* Add more positions here */}
          </div>

          <hr />
        
        </div>
      </div>
    </div>
  );
};

export default Careers;
