import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons from react-icons
import Swal from "sweetalert2"; // Import SweetAlert2
import { Link } from "react-router-dom"; // Import Link for navigation
import AdminNavbar from "../Components/AdminNavbar";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://marzwellblogbackend.pythonanywhere.com/api/posts/");
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (slug) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${slug}/`);
        setPosts(posts.filter(post => post.slug !== slug));
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        );
      } catch (err) {
        Swal.fire(
          'Error!',
          'There was an error deleting the post.',
          'error'
        );
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Blog Posts</h1>
        
        <Link to="/add_blog_post">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all">
            Create Blog Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
      <AdminNavbar/>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className = 'bg-blue-800 text-white'>
            <tr className="text-start">
            <th className="py-3 px-4 border-b text-start">S/N</th>
              <th className="py-3 px-4 border-b text-start">Title</th>
              <th className="py-3 px-4 border-b text-start">Slug</th>
              <th className="py-3 px-4 border-b text-start">Author</th>
              <th className="py-3 px-4 border-b text-sart">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice().reverse().map((post, index) => (
              <tr key={post.slug} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{post.title}</td>
                <td className="py-3 px-4 border-b">{post.slug}</td>
                <td className="py-3 px-4 border-b">{post.author}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <Link to={`/edit_blog_post/${post.slug}`}>
                    <button className="text-blue-500 hover:text-blue-700 text-center">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
