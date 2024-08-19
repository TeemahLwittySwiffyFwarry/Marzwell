import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopupReview from '../Components/PopupReview';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(formRef.current);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pupils/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response); // Debugging response
  
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your enquiry has been successfully submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        console.log('First SweetAlert Result:', result); // Debugging SweetAlert result
  
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Do you want to register another child?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            console.log('Second SweetAlert Result:', result); // Debugging second SweetAlert result
  
            if (result.isConfirmed) {
              if (formRef.current) {
                formRef.current.reset();
              }
              navigate('/registration');
            } else {
              navigate('/');
            }
          });
        }
      });
    } catch (error) {
      console.error('Error:', error); // Debugging error
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'There was a problem with the registration.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
    }
  };
  

  return (
    <div className="relative min-h-screen bg-blue-100 flex items-center justify-center overflow-hidden pt-20 mt-20">
      <div>
        {/* PopupReview component */}
        <PopupReview 
          message="Check out our latest reviews!" 
          showDuration={10000} 
          hideDuration={2000} 
          linkTo="/testimonials" 
        />
      </div>
      <img
        src="heropage1.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />
      <div style={{ backgroundColor: '#0ad4e7' }} className="relative z-10 max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6 mb-20">
        <h2 className="text-3xl font-bold text-center text-white font-extrabold">Enquiry For 2024/2025 Admissions</h2>
        <div className="flex justify-center">
          {/* Uncomment if logo is available */}
          {/* <img src="marz_logo_1.png" className="h-16" alt="Logo" /> */}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
              Parent's Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parent_name" // Matches backend field name
              placeholder="Enter parent's name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              style={{
                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                boxShadow: 'inset 5px 5px 15px rgba(0,0,0,0.1), inset -5px -5px 15px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          <div>
            <label htmlFor="pupilName" className="block text-sm font-medium text-gray-700">
              Name of Pupil
            </label>
            <input
              type="text"
              id="pupilName"
              name="pupil_name" // Matches backend field name
              placeholder="Enter pupil's name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              style={{
                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          {/* Row for Grade and Age */}
          <div className="flex space-x-4">
            {/* Grade (Dropdown with Choices) */}
            <div className="w-1/2">
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade
              </label>
              <select
                id="grade"
                name="grade" // Matches backend field name
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{
                  background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
                }}
                required
              >
                <option value="" disabled>Select Grade</option>
                <option value="toddler_1">Toddler 1</option>
                <option value="toddler_2">Toddler 2</option>
                <option value="junior_infant">Junior Infant</option>
                <option value="senior_infant">Senior Infant</option>
                <option value="year_one">Year One</option>
                <option value="year_two">Year Two</option>
                <option value="year_three">Year Three</option>
                <option value="year_four">Year Four</option>
                <option value="year_five">Year Five</option>
              </select>
            </div>

            {/* Age (Dropdown with Choices) */}
            <div className="w-1/2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <select
                id="age"
                name="age" // Matches backend field name
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{
                  background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
                }}
                required
              >
                <option value="" disabled>Select Age</option>
                {Array.from({ length: 11 }, (_, i) => i + 2).map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Parent's Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phone_number" // Matches backend field name
              placeholder="Enter phone number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              style={{
                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.2)' }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
