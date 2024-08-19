import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import PopupReview from '../Components/PopupReview';

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission with Axios
    axios.post('http://127.0.0.1:8000/api/contactmessages/', data)
      .then(response => {
        console.log(response.data);
        // Display SweetAlert on successful submission
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Message sent successfully!',
        });
      })
      .catch(error => {
        
        console.error('There was an error sending the message!', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
      
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div>
        {/* Popup Review */}
        <PopupReview 
          message="Check out our latest reviews!" 
          showDuration={10000} 
          hideDuration={10000} 
          linkTo="/testimonial" 
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Contact Us</h1>
          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
            {/* Contact Details */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-800 w-6 h-6" />
                <span className="text-lg font-medium text-gray-800">+2348023286539</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-800 w-6 h-6" />
                <span className="text-lg font-medium text-gray-800">+2348023276543</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-800 w-6 h-6" />
                <span className="text-lg font-medium text-gray-800">marzwellschoolshos@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-800 w-6 h-6" />
                <span className="text-lg font-medium text-gray-800">ogamarzwellschools@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-800 w-6 h-6" />
                <span className="text-lg font-medium text-gray-800">
                  5, Alexander Street, Off Old Abeokuta Express Way, Oko Oba, Ageg, Lagos.
                </span>
              </div>

              {/* Embedded Google Map */}
              <div className="mt-6">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9959372313892!2d3.30711677499402!3d6.6474235933472245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9131f616b5fb%3A0x54cc47d105948bc0!2sMarzwell%20Schools!5e0!3m2!1sen!2sng!4v1723704725884!5m2!1sen!2sng"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register('subject', { required: true })}
                />
                {errors.subject && <span className="text-red-500">This field is required</span>}
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  {...register('message', { required: true })}
                ></textarea>
                {errors.message && <span className="text-red-500">This field is required</span>}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-800 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
