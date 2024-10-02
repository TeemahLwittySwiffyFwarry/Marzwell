import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const EditBlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    content: "",
    image_url: "",
    video_url: "",
  });

  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${slug}/`);
        setFormData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error fetching post",
          text: "There was an error retrieving the blog post.",
        });
      }
    };

    fetchPost();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append existing form data
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Append new image if a new file is selected
    if (newImageFile) {
      formDataToSend.append("image_url", newImageFile);
    } else {
      // If no new file is selected, append an empty file or keep the existing URL
      formDataToSend.append("image_url", formData.image_url); // Assuming backend can handle this case
    }

    try {
      await axios.put(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${slug}/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your blog post has been updated successfully.",
      });
      navigate("/blog");
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating the blog post.",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file); // Store the new file object
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

      {/* Display the current image name */}
      {formData.image_url && (
        <div className="mb-4">
          <p className="text-gray-700">Current Image: {formData.image_url.split('/').pop()}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Slug Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Author Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Content Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        {/* Image Upload Field */}
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold mb-2">Upload New Image (Optional)</label>
          <input
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Video URL Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Video URL</label>
          <input
            type="url"
            name="video"
            value={formData.video_url}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Update Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPost;
