import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddBlogPost = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    content: "",
    image_url: "",
    video_url: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field based on input name
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    // Create a new FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("author", formData.author);
    const formattedContent = formData.content.replace(/\n/g, '<br/>');
    formDataToSend.append("content", formattedContent);
    formDataToSend.append("image_url", formData.image_url);  // Add the image file
    formDataToSend.append("video_url", formData.video_url);
  
    try {
      // Replace this URL with your actual API endpoint for adding a blog post
      const response = await axios.post("https://marzwellblogbackend.pythonanywhere.com/api/posts/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        // SweetAlert2 success message
        Swal.fire({
          icon: "success",
          title: "Blog post created successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
  
        // Reset form fields
        setFormData({
          title: "",
          slug: "",
          author: "",
          content: "",
          image_url: "",
          video_url: "",
        });
      }
    } catch (error) {
      // SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error creating the blog post.",
      });
    }
  };
    
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image_url: file });
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 my-20">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        Create a New Blog Post
      </h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data"className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter the blog title"
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Slug Field */}
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="Enter a URL-friendly slug"
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Author Field */}
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Content Field */}
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Write your blog content here..."
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          ></textarea>
        </div>

        {/* Image URL Field */}
        {/* Image Upload Field */}
<div className="flex flex-col">
  <label className="block text-lg font-medium text-gray-800 mb-2">
    Upload Image
  </label>
  <input
    type="file"
    name="image_url"
    
    accept="image/*"
    onChange={(e) => handleFileChange(e)}
    className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
  />
</div>


        {/* Video URL Field */}
        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Video URL
          </label>
          <input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-4 rounded-lg shadow-lg font-bold hover:bg-indigo-600 transition-all"
          >
            Submit Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPost;
