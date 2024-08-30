import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';

const EditTestimonialList = () => {
  const { testimonialId } = useParams();
  const [form, setForm] = useState({
    name: '',
    relationship: '',
    text: '',
    rating: 5,
    picture: null,
    approval: '',
    date: '',
  });

  const relationshipChoices = [
    { value: '', label: 'Select your relationship' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Pupils', label: 'Pupils' },
    { value: 'Alumni', label: 'Alumni' },
    { value: 'Others', label: 'Others' },
  ];

  const approvalChoices = [
    { value: '', label: 'Select approval status' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Approved pending', label: 'Approval pending' },
    
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch testimonial data for the given ID
    axios.get(`https://teemahlwitty.pythonanywhere.com/api/testimonial/${testimonialId}/`)
      .then(response => {
        const testimonial = response.data;
        setForm({
          name: testimonial.name,
          relationship: testimonial.relationship_to_school,
          text: testimonial.testimonial,
          rating: testimonial.rating,
          picture: null,
          approval: testimonial.approval,
          date: testimonial.date_created ? new Date(testimonial.date_created).toISOString().split('T')[0] : '',
        });
      })
      .catch(error => {
        console.error('Error fetching testimonial:', error);
      });
  }, [testimonialId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({ ...form, [name]: type === 'file' ? files[0] : value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('relationship_to_school', form.relationship);
    formData.append('testimonial', form.text);
    formData.append('rating', form.rating);
    if (form.picture) formData.append('image', form.picture);
    formData.append('approval', form.approval);
    formData.append('date_created', form.date);

    axios.put(`https://teemahlwitty.pythonanywhere.com/api/testimonial/${testimonialId}/`, formData)
      .then(() => {
        Swal.fire('Testimonial updated', '', 'success');
        navigate('/testimonial_list');
      })
      .catch(error => console.error('Error updating testimonial:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Testimonial</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="relationship" className="block text-gray-700 text-sm font-semibold mb-2">Relationship to School</label>
            <select
              id="relationship"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              {relationshipChoices.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 text-sm font-semibold mb-2">Testimonial</label>
            <textarea
              id="text"
              name="text"
              value={form.text}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Rating</label>
            <StarRatings
              rating={form.rating}
              starRatedColor="gold"
              changeRating={(rating) => setForm({ ...form, rating })}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="5px"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="picture" className="block text-gray-700 text-sm font-semibold mb-2">Picture</label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">Date Created</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="approval" className="block text-gray-700 text-sm font-semibold mb-2">Approval Status</label>
            <select
              id="approval"
              name="approval"
              value={form.approval}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              {approvalChoices.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Update Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonialList;
