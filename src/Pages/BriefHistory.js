import React from 'react';

const BriefHistory = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 mt-20 container">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-700 mb-6">
          We are working hard to bring you the fascinating history of Marzwell. Stay tuned for more updates and stories about our journey and milestones.
        </p>
        <div className="flex justify-center">
          <img
            src="/others/coming_soon.jpg" // Replace with the path to your coming soon image
            alt="Coming Soon"
            className="h-auto rounded-md shadow-md"
          />
        </div>
        <p className="text-gray-600 mt-6">
          In the meantime, feel free to explore our other pages and learn more about what we have to offer.
        </p>
      </div>
    </div>
  );
};

export default BriefHistory;
