import React from 'react';

const Gallery = () => {
  const images = [
    { src: '/gallery/activity1.png', alt: 'Marzwell Activity 1', description: 'Image 1' },
    { src: '/gallery/activity2.png', alt: 'Marzwell Activity 2', description: 'Image 2' },
    { src: '/gallery/activity3.png', alt: 'Marzwell Activity 3', description: 'Image 3' },
    { src: '/gallery/activity4.png', alt: 'Marzwell Activity 1', description: 'Image 4' },
    { src: '/gallery/activity5.png', alt: 'Marzwell Activity 2', description: 'Image 5' },
    { src: '/gallery/activity6.png', alt: 'Marzwell Activity 3', description: 'Image 6' },
    { src: '/gallery/activity7.jpg', alt: 'Marzwell Activity 1', description: 'Image 7' },
    { src: '/gallery/activity8.jpg', alt: 'Marzwell Activity 2', description: 'Image 8' },
    { src: '/gallery/activity9.jpg', alt: 'Marzwell Activity 3', description: 'Image 9' },
    { src: '/gallery/activity10.jpg', alt: 'Marzwell Activity 1', description: 'Image 10' },
    { src: '/gallery/activity11.jpg', alt: 'Marzwell Activity 2', description: 'Image 11' },
    { src: '/gallery/activity12.jpg', alt: 'Marzwell Activity 3', description: 'Image 12' },
    { src: '/gallery/activity13.jpg', alt: 'Marzwell Activity 1', description: 'Image 13' },
    { src: '/gallery/activity14.jpg', alt: 'Marzwell Activity 2', description: 'Image 14' },
    { src: '/gallery/activity15.jpg', alt: 'Marzwell Activity 3', description: 'Image 15' },
    // Add more images with descriptions
  ];

//   const videos = [
//     { src: '/videos/vid1.mp4', alt: 'Marzwell Video 1', description: 'Description for Video 1' },
//     { src: '/videos/vid2.mp4', alt: 'Marzwell Video 2', description: 'Description for Video 2' },
//     { src: '/videos/vid3.mp4', alt: 'Marzwell Video 2', description: 'Description for Video 2' },
//     // Add more videos with descriptions
//   ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Gallery</h1>
          
          {/* Images Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Activities Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto rounded-md shadow-md object-cover"
                  />
                  <div className="mt-2 text-blue-600">
                    <p>{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos Section */}
          {/* <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Activities Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div key={index} className="relative group">
                  <video
                    controls
                    src={video.src}
                    className="w-full h-auto rounded-md shadow-md"
                    alt={video.alt}
                  />
                  <div className="mt-2 text-gray-600">
                    <p>{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
