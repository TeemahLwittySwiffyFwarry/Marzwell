import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminDashboard from './AdminDashboard';
import { useNavigate, Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import AdminNavbar from '../Components/AdminNavbar';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://teemahlwitty.pythonanywhere.com/api/testimonial/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); // Debug: check API response
        setTestimonials(response.data);
      } catch (error) {
        setError('Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit_testimonial/${id}`);
  };

  const handleDelete = async (id) => {
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
        await axios.delete(`https://teemahlwitty.pythonanywhere.com/api/testimonial/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
        Swal.fire('Deleted!', 'The testimonial has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        Swal.fire('Error!', 'There was a problem deleting the testimonial.', 'error');
      }
    }
  };

  const toggleExpand = (id) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, isExpanded: !testimonial.isExpanded }
          : testimonial
      )
    );
  };

  const getTruncatedText = (text, isExpanded) => {
    const words = text.split(' ');
    if (words.length <= 20 || isExpanded) {
      return text;
    }
    return words.slice(0, 20).join(' ') + '...';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
       

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-20 mb-5">

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Testimonial List</h1>
        <AdminNavbar/>


        <div className="overflow-auto rounded-lg shadow mb-5">
        <table className="min-w-full bg-white border border-gray-200 mb-20">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">S/N</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Relationship</th>
              <th className="py-2 px-4 border-b">Testimonial</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Date Created</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Approval Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.slice().reverse().map((testimonial, index) => (
              <tr key={testimonial.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 truncate">{testimonial.name}</td>
                <td className="py-2 px-4 truncate">{testimonial.relationship_to_school}</td>
                <td className="py-2 px-4">
                  <div>
                    <div style={{ maxHeight: testimonial.isExpanded ? 'none' : '6rem', overflow: 'hidden' }}>
                      {getTruncatedText(testimonial.testimonial, testimonial.isExpanded)}
                    </div>
                    {testimonial.testimonial.split(' ').length > 20 && (
                      <button
                        onClick={() => toggleExpand(testimonial.id)}
                        className="text-blue-500 text-sm mt-2 block"
                      >
                        {testimonial.isExpanded ? 'See less' : '...See more'}
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt="testimonial"
                      className="w-20 h-20 object-cover"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="py-2 px-4">{new Date(testimonial.date_created).toLocaleDateString()}</td>
                <td className="py-2 px-4">{testimonial.rating}</td>
                <td className="py-2 px-4">
                  {testimonial.approval ? testimonial.approval : 'Not Approved'}
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <Link to={`/edit_testimonial_list/${testimonial.id}`}>
                    <button
                      className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      <FaRegEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
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
    </div>
  );
};

export default TestimonialList;
