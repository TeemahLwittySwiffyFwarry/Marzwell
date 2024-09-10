import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Avatar from 'react-avatar';
import { default as EmojiPicker } from 'emoji-picker-react'; // Use default export
import Swal from 'sweetalert2'; // Import SweetAlert

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: '',
    relationship: '',
    picture: null,
    text: '',
    rating: 5,
    showEmojiPicker: false, // Added state for showing the emoji picker
  });
  const [expandedTestimonialIndex, setExpandedTestimonialIndex] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    axios.get('https://teemahlwitty.pythonanywhere.com/api/testimonial/')
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
    // Add current date
    formData.append('date_created', new Date().toISOString());

    axios.post('https://teemahlwitty.pythonanywhere.com/api/testimonial/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        // Add new testimonial to the list
        setTestimonials([...testimonials, response.data]);

        // Reset the form
        setForm({
          name: '',
          relationship: '',
          picture: null,
          text: '',
          rating: 5,
          showEmojiPicker: false,
        });

        // Show SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Testimonial Sent!',
          text: 'Your testimonial has been successfully submitted for approval.',
          confirmButtonText: 'OK',
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
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  };

  const handleEmojiClick = (emoji) => {
    setForm({
      ...form,
      text: form.text + emoji.emoji,
      showEmojiPicker: false
    });
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setExpandedTestimonialIndex(null);
    }
  };

  useEffect(() => {
    if (expandedTestimonialIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedTestimonialIndex]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Testimonials</h1>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
            Here are some testimonials from parents and alumni who have experienced the impact Marzwell School
            </p>
          </div>

          {/* Dynamic Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 text-justify">
            {testimonials
              .filter(testimonial => testimonial.approval === 'Approved') // Filter out unapproved testimonials
              .reverse()
              .map((testimonial, index) => {
                const isExpanded = index === expandedTestimonialIndex;
                const textToShow = isExpanded ? testimonial.testimonial : `${testimonial.testimonial.substring(0, 200)}...`;

                return (
                  <div
                    key={index}
                    ref={isExpanded ? cardRef : null}
                    className="relative bg-cyan-200 rounded-lg shadow-lg overflow-hidden p-6 flex flex-col items-start"
                  >
                    <div className="absolute top-4 left-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full shadow-lg"
                        />
                      ) : (
                        <Avatar
                          name={testimonial.name}
                          size="64"
                          round={true}
                          className=""
                        />
                      )}
                    </div>
                    <div className="ml-20">
                      <h2 className="text-xl font-semibold text-blue-800 mb-2">{testimonial.name}</h2>
                      <p className="text-gray-500 mb-1">{testimonial.relationship_to_school}</p>
                      <div className="mb-2">
                        <StarRatings
                          rating={testimonial.rating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                      </div>
                      <p className="text-gray-600 mb-2" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                        {textToShow}
                      </p>
                      {textToShow !== testimonial.testimonial && (
                        <button
                          onClick={() => setExpandedTestimonialIndex(isExpanded ? null : index)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          {isExpanded ? 'See Less' : 'See More'}
                        </button>
                      )}
                      <p className="text-gray-400 text-sm">{formatDate(testimonial.date_created)}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Form to submit testimonial */}
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
                    <option value="Teacher">Teacher</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Pupils">Pupil</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="picture" className="block text-gray-700">Upload Picture</label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700">Testimonial</label>
                <textarea
                  id="text"
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, showEmojiPicker: !form.showEmojiPicker })}
                  className="mt-2 text-gray-600"
                >
                  {form.showEmojiPicker ? 'Close Emoji Picker' : 'Add Emoji'}
                </button>
                {form.showEmojiPicker && (
                  <div className="mt-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rating</label>
                <StarRatings
                  rating={form.rating}
                  starRatedColor="gold"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="2px"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
