// LoadingSpinner.js
import React from 'react';
import { css } from '@emotion/react';
import { RiseLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        {/* Zooming Logo */}
      <div className="mb-6">
        <img 
          src="/logos/marz_logo_3.png" 
          alt="Marzwell School Logo" 
          className="  animate-pulse"
        />
      </div>
     
      <div className="mb-4">
      
      <p className="text-xl text-gray-700 mb-8 text-center">Page is loading, please wait...</p>
      <RiseLoader className="text-center" color={"#e63946"} loading={true} css={override} size={15} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
