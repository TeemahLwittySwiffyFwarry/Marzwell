import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GrLike } from "react-icons/gr";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import Modal from 'react-modal';
import {
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';



const Blog = () => {
  const [posts, setPosts] = useState([]);
  const videoRef = useRef(null); // Ref to track the video iframe
  const [selectedPostId, setSelectedPostId] = useState(null); // Track selected post for commenting
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [commentData, setCommentData] = useState({
    poster_name: '',
    poster_comment: ''
  });


  // New state for comments visibility

  const [showAllComments, setShowAllComments] = useState({}); // Track visibility for each post's comments

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://marzwellblogbackend.pythonanywhere.com/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle YouTube video play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Play the video when it's in the viewport
              playVideo(video);
            } else {
              // Pause the video when it's out of the viewport
              pauseVideo(video);
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the video is visible
      );

      observer.observe(video);

      // Cleanup observer when the component unmounts
      return () => {
        observer.unobserve(video);
      };
    }
  }, []);

  // YouTube Player API play/pause functions
  const playVideo = (video) => {
    video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  };

  const pauseVideo = (video) => {
    video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  };


  // Function to format date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date'; // Return a fallback if the date is invalid
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12'; // Adjust '0' hour to '12'

    return `Date: ${year}-${month}-${day} || Time: ${hours}:${minutes} ${ampm}`;
  };



  // Handle form data change
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Open modal and set the selected post
  const openModal = (id) => {
    setSelectedPostId(id);
    setModalOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setModalOpen(false);
    setCommentData({
      poster_name: '',
      poster_comment: ''
    });
  };


  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentData.poster_name || !commentData.poster_comment) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required!',
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      // Fetch the post details by the slug to get the post ID
      const postResponse = await axios.get(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${selectedPostId}/`);
      const postId = postResponse.data.id; // Get the post's ID from the response

      const commentPayload = {
        poster_name: commentData.poster_name,
        poster_comment: commentData.poster_comment,
        post: postId,  // Use the post's ID here
      };

      // Submit the comment with the post ID
      const response = await axios.post(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${selectedPostId}/comments/`, commentPayload);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Comment added!',
          timer: 1500,
          showConfirmButton: false,
        });
        // Append the new comment to the posts state
        setPosts((prevPosts) => prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        ));



        closeModal();
      }
    } catch (error) {
      console.error('Error adding comment:', error.response ? error.response.data : error);
      Swal.fire({
        icon: 'error',
        title: 'Error adding comment!',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Handle Like Feature
  const handleLike = async (slug) => {
    // Get the liked posts from localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];

    // Check if the current post has already been liked
    if (likedPosts.includes(slug)) {
      Swal.fire({
        icon: 'error',
        title: 'You have already liked this post!',
        timer: 1500,
        showConfirmButton: false,
      });
      return; // Exit early if already liked
    }

    try {
      const response = await axios.post(`https://marzwellblogbackend.pythonanywhere.com/api/posts/${slug}/like/`);

      if (response.status === 200) {
        // Add the post to the likedPosts array and store it in localStorage
        likedPosts.push(slug);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

        // Update the post's like count in the state
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.slug === slug ? { ...post, likes: response.data.likes } : post
          )
        );

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Post liked!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error liking post!',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };



  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://marzwellblogbackend.pythonanywhere.com/api/posts/');
      setPosts(response.data);  // Ensure comments are included in the post data
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const toggleShowAllComments = (postId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId] // Toggle the visibility for this post
    }));
  };






  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Latest Blog Posts</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-blue-700">{post.title}</h2>
              <div className="text-gray-600 mt-2 text-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              {/* w-full mt-4 max-w-screen-lg mx-auto h-auto */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className=" rounded-md shadow-md mt-4"
                />
              )}


              {/* Embed YouTube Video */}
              {post.video_url && (
                <div className="mt-4">
                  <iframe
                    ref={videoRef}
                    width="100%"
                    height="315"
                    src={post.video_url.replace('watch?v=', 'embed/') + '?enablejsapi=1'}  // Enable YouTube API
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}


              {/* Likes Feature */}
              <div className="mt-4">
                <div className="mt-4 flex justify-between items-center">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.slug)}
                    className="bg-cyan-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <GrLike className="mr-2" />
                    {post.likes}
                  </button>

                  {/* Comment Button and Count */}
                  <button
                    onClick={() => toggleShowAllComments(post.id)}
                    className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <FaCommentDots className="mr-2" />Comments ({post.comments.length})
                  </button>

                  {/* Share Button (you can implement share functionality later) */}


                  <div className="flex items-center mt-4">
                    <FaShare className="mr-2"/>
                    {/* WhatsApp Share */}
                    <WhatsappShareButton
                      url={`https://marzwellschools.com/blog/${post.slug}`}
                      title={post.title}
                      separator=":: "
                      className="mr-2"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    {/* Facebook Share */}
                    <FacebookShareButton
                      url={`https://marzwellschools.com/blog/${post.slug}`}
                      quote={post.title}
                      className="mr-2"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    {/* Twitter Share */}
                    <TwitterShareButton
                      url={`https://marzwellschools.com/blog/${post.slug}`}
                      title={post.title}
                      className="mr-2"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    {/* Instapaper Share */}
                    <InstapaperShareButton
                      url={`https://marzwellschools.com/blog/${post.slug}`}
                      title={post.title}
                      className="mr-2"
                    >
                      <InstapaperIcon size={32} round />
                    </InstapaperShareButton>
                  </div>

                </div>
              </div>


              <p className="text-blue-600 text-xs italic mt-4">
                By {post.author} | {formatDate(post.created_at)}
              </p>



              {/* Comment Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="mt-4 w-full flex justify-center md:justify-end">
                  <div className="w-full md:w-3/4 bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Comments:</h3>
                    {/* Display only the latest 3 comments */}
                    {post.comments.reverse().slice(0, showAllComments[post.id] ? post.comments.length : 3).reverse().map((comment) => (
                      <div key={comment.id} className="mb-4 p-3 bg-white rounded-md shadow-md">
                        <p><strong>{comment.poster_name}</strong>: {comment.poster_comment}</p>
                        <p className="text-blue-600 text-xs italic mt-4">{formatDate(comment.created_at)}</p>
                      </div>
                    ))}
                    {post.comments.length > 5 && (
                      <button
                        onClick={() => toggleShowAllComments(post.id)}
                        className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                      >
                        {showAllComments[post.id] ? 'Hide comments' : 'View all comments'}
                      </button>
                    )}
                  </div>
                </div>
              )}


              {/* Add Comment Button */}
              {/* Add Comment Button */}
              <div className="text-right"> {/* Align container to the right */}
                <button
                  onClick={() => openModal(post.slug)}
                  className="bg-cyan-400 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                >
                  Add Comment
                </button>
              </div>


            </div>

          ))
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-800">Coming Soon</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're excited to launch our blog soon! Stay tuned for insightful articles, updates, and news about Marzwell and our community.
            </p>
            <img
              src="others/coming_soon.jpg" // Replace with the path to your coming soon image
              alt="Coming Soon"
              className="h-auto rounded-md shadow-md"
            />
            <p className="text-gray-600 mt-6">
              While we prepare our blog, explore our other pages and learn more about what we have to offer.
            </p>
          </div>
        )}
      </div>

      {/* Comment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="poster_name"
                  value={commentData.poster_name}
                  onChange={handleCommentChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Comment</label>
                <textarea
                  name="poster_comment"
                  value={commentData.poster_comment}
                  onChange={handleCommentChange}
                  rows="3"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>

  );
};

export default Blog;
