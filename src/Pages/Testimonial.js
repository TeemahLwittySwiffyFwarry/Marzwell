import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: '',
    relationship: '',
    picture: null,
    text: '',
    rating: 0
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/testimonial/')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, picture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRatingChange = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('relationship_to_school', form.relationship);
    formData.append('testimonial', form.text);
    formData.append('rating', form.rating);
    if (form.picture) {
      formData.append('image', form.picture);
    }

    axios.post('http://127.0.0.1:8000/api/testimonial/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setTestimonials([...testimonials, response.data]);
        setForm({
          name: '',
          relationship: '',
          picture: null,
          text: '',
          rating: 0
        });
      })
      .catch(error => {
        console.error('Error submitting testimonial:', error);
      });
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Testimonials</h1>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Here are some testimonials from parents who have experienced the impact of Marzwell.
            </p>
          </div>

          {/* Hard-coded cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_1.png"
                alt="Testimonial Image 1"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_2.png"
                alt="Testimonial Image 1"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_3.png"
                alt="Testimonial Image 1"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_4.png"
                alt="Testimonial Image 1"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_5.png"
                alt="Testimonial Image 5"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            <div className="shadow-lg overflow-hidden bg-cyan-200 rounded-md">
              <img
                src="/review/review_6.png"
                alt="Testimonial Image 1"
                className=" mt-8 mb-8 border-1 border-cyan-200 shadow-lg"
              />
            </div>
            
          </div>

          {/* Dynamic Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-cyan-200 rounded-lg shadow-lg overflow-hidden p-6 flex flex-col items-start">
                <div className="absolute top-4 left-4">
                  <img
                    src={testimonial.image ? `${testimonial.image}` : '/marz_logo_1.png'}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="ml-20">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">{testimonial.name}</h2>
                  <p className="text-gray-500 mb-1">{testimonial.relationship_to_school}</p>
                  <div className="mb-2">
                    <StarRatings
                      rating={testimonial.rating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      name='rating'
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                  <p className="text-gray-600 mb-2">{testimonial.testimonial}</p>
                  <p className="text-gray-400 text-sm">{formatDate(testimonial.date_created)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Add Your Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="relationship" className="block text-gray-700">Relationship to School</label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={form.relationship}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>Select your relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700">Rating</label>
                <StarRatings
                  rating={form.rating}
                  starRatedColor="gold"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name='rating'
                  starDimension="30px"
                  starSpacing="5px"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="picture" className="block text-gray-700">Upload Picture (Optional)</label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700">Testimonial</label>
                <textarea
                  id="text"
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
