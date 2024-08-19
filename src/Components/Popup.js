import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './popup.css'; // Import custom CSS for styling

const PopupNotification = ({ message, imageUrl, showDuration, hideDuration, linkTo }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let showTimer, hideTimer;

    const toggleVisibility = () => {
      setIsVisible(true);
      showTimer = setTimeout(() => {
        setIsVisible(false);
        hideTimer = setTimeout(toggleVisibility, hideDuration);
      }, showDuration);
    };

    toggleVisibility();

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [showDuration, hideDuration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="popup-notification">
        {imageUrl && <img src={"././../popup.png"} alt="Popup" className="popup-image" />}
        <p>{message}</p>
        <Link to={"/registration"}>
          <button
            type="button"
            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
            style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.2), -4px -4px 10px rgba(255,255,255,0.7)' }}
          >
            Register
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

export default PopupNotification;
