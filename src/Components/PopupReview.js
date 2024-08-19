import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './popup.css'; // Import custom CSS for styling

const PopupReview = ({ message, showDuration, hideDuration, linkTo, initialDelay = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false); // Initially not visible
  const [isDismissed, setIsDismissed] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // List of review images
  const reviewImages = [
    '/review/review_1.png',
    '/review/review_2.png',
    '/review/review_3.png',
    '/review/review_4.png',
    '/review/review_5.png',
    '/review/review_6.png',
    // Add more images as needed
  ];

  useEffect(() => {
    let initialTimer, showTimer, hideTimer;

    const toggleVisibility = () => {
      if (!isDismissed) {
        setIsVisible(true);
        setImageUrl(reviewImages[Math.floor(Math.random() * reviewImages.length)]); // Select random image
        showTimer = setTimeout(() => {
          setIsVisible(false);
          hideTimer = setTimeout(toggleVisibility, hideDuration);
        }, showDuration);
      }
    };

    initialTimer = setTimeout(() => {
      toggleVisibility();
    }, initialDelay); // Delay before the popup starts showing

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [showDuration, hideDuration, isDismissed, initialDelay]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true); // Set dismissed state to true when the popup is closed manually
  };

  return (
    isVisible && !isDismissed && (
      <div className="popup-notification2">
        {imageUrl && <img src={imageUrl} alt="Popup" className="popup-image2" />}
        <p>{message}</p>
        <Link to={linkTo}>
          <button
            type="button"
            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.2), -4px -4px 10px rgba(255,255,255,0.7)' }}
          >
            Testimonials
          </button>
        </Link>
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default PopupReview;
