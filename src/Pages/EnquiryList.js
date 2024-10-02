import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve token from local storage
        const response = await axios.get('https://teemahlwitty.pythonanywhere.com/api/pupils/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in authorization header
          },
        });
        setEnquiries(response.data);
      } catch (error) {
        setError('Failed to fetch enquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit_enquiry/${id}`);
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete enquiry with id: ${id}`);
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
    
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        console.log('Access token:', token); // Check if the token is retrieved correctly
        await axios.delete(`https://teemahlwitty.pythonanywhere.com/api/pupils/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnquiries(enquiries.filter((enquiry) => enquiry.id !== id));
        Swal.fire('Deleted!', 'The enquiry has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting enquiry:', error); // Log error details
        Swal.fire('Error!', 'There was a problem deleting the enquiry.', 'error');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-20 mb-5">
      
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Enquiry List</h1>
        <AdminNavbar/>
        <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 mb-20">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S/N</th>
              <th className="py-2 px-4 border-b">Parent's Name</th>
              <th className="py-2 px-4 border-b">Pupil's Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Grade</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.slice().reverse().map((enquiry, index) => (
              <tr key={enquiry.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td> {/* S/N column */}
                <td className="py-2 px-4 border-b">{enquiry.parent_name}</td>
                <td className="py-2 px-4 border-b">{enquiry.pupil_name}</td>
                <td className="py-2 px-4 border-b">{enquiry.status}</td>
                <td className="py-2 px-4 border-b">{enquiry.grade}</td>
                <td className="py-2 px-4 border-b">{enquiry.age}</td>
                <td className="py-2 px-4 border-b">{enquiry.phone_number}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <Link to={`/edit_enquiry/${enquiry.id}`}>
                    <button
                      className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaRegEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(enquiry.id)}
                    className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;