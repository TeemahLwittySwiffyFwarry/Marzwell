import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const EditEnquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState({
    parent_name: '',
    pupil_name: '',
    grade: '',
    age: '',
    phone_number: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
  };

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await axios.get(`https://teemahlwitty.pythonanywhere.com/api/pupils/${id}/`, getAuthHeaders());
        setEnquiry(response.data);
      } catch (error) {
        setError('Failed to fetch enquiry');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry({ ...enquiry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://teemahlwitty.pythonanywhere.com/api/pupils/${id}/`, enquiry, getAuthHeaders());
      Swal.fire('Updated!', 'The enquiry has been updated.', 'success');
      navigate('/enquiry_list'); // Redirect to enquiry list
    } catch (error) {
      Swal.fire('Error!', 'There was a problem updating the enquiry.', 'error');
    }
  };

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="relative min-h-screen bg-blue-100 flex items-center justify-center overflow-hidden pt-20 mt-20">
      <img
        src="heropage1.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />
      <div style={{ backgroundColor: '#0ad4e7' }} className="relative z-10 max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6 mb-20">
        <h2 className="text-3xl font-bold text-center text-white font-extrabold">Edit Enquiry</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
              Parent's Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parent_name"
              placeholder="Enter parent's name"
              value={enquiry.parent_name}
              onChange={handleChange}
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
              name="pupil_name"
              placeholder="Enter pupil's name"
              value={enquiry.pupil_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              style={{
                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade
              </label>
              <select
                id="grade"
                name="grade"
                value={enquiry.grade}
                onChange={handleChange}
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

            <div className="w-1/2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <select
                id="age"
                name="age"
                value={enquiry.age}
                onChange={handleChange}
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

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={enquiry.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{
                  background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.1), inset -4px -4px 10px rgba(255,255,255,0.7)',
                }}
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="Processing">Processing</option>
                <option value="Contacted">Contacted</option>
                <option value="Awaiting Exam">Awaiting Exam</option>
                <option value="Admitted">Admitted</option>
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
              name="phone_number"
              placeholder="Enter parent's phone number"
              value={enquiry.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              style={{
                background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
                boxShadow: 'inset 5px 5px 15px rgba(0,0,0,0.1), inset -5px -5px 15px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Update Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEnquiry;
