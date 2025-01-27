import React, { useState, useEffect } from "react";
import { FaCrown } from "react-icons/fa"; // Importing crown icon for badges
import useAuth from "../../../hooks/useAuth";

const ForumPage = () => {
  const [posts, setPosts] = useState([]); // Ensure this is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Set posts per page
  const { user } = useAuth();

  useEffect(() => {
    // Fetch all posts without pagination
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/forums`);
        const data = await response.json();
        console.log(data); // Log the fetched data
        setPosts(data); // Ensure data.posts is always an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
        setPosts([]); // Set empty array if there’s an error
      }
    };

    fetchPosts();
  }, []);

  // Function to render badges based on author role (Admin or Trainer)
  const renderAuthorBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
          <FaCrown className="mr-1" />
          Admin
        </span>
      );
    } else if (role === "trainer") {
      return (
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
          <FaCrown className="mr-1" />
          Trainer
        </span>
      );
    }
    return null; // Return null if no role to display badge
  };

  // Pagination: Slice the posts to display only the ones for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Upvote Handler
  const handleUpvote = async (postId) => {
    if (!user) {
      alert("You need to log in to vote!");
      return;
    }

    try {
      // Send the upvote request to the server
      const response = await fetch(
        `http://localhost:5000/forums/upvote`, // Ensure this is the correct API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // If you're using token-based auth
          },
          body: JSON.stringify({ postId }), // Send postId as part of the request body
        }
      );

      // Check if the response is OK
      if (!response) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        alert("Error upvoting the post.");
        return;
      }

      // Try parsing the response as JSON
      const updatedPost = await response.json();

      // Update the state with the new upvote count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, upvotes: updatedPost.upvotes } : post
        )
      );
    } catch (error) {
      console.error("Error upvoting the post:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Downvote Handler
  const handleDownvote = async (postId) => {
    if (!user) {
      alert("You need to log in to vote!");
      return;
    }

    try {
      // Send the downvote request to the server (assuming you have an API endpoint to handle this)
      const response = await fetch(
        `http://localhost:5000/forums/downvote/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // If you're using token-based auth
          },
        }
      );

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, downvotes: updatedPost.downvotes }
            : post
        )
      );
    } catch (error) {
      console.error("Error downvoting the post:", error);
    }
  };

  return (
    <div className="forum-page container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Forum</h1>

      {/* Post List */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            currentPosts.map((post) => (
              <div
                key={post._id}
                className="post-item p-4 mb-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
                <div className="flex justify-between items-center mt-4">
                  {/* Check if post.author exists before rendering */}
                  <span className="flex items-center">
                    Posted by {post.author ? post.author.name : "Unknown"}{" "}
                    {/* Display author's name */}
                    {post.author && renderAuthorBadge(post.author.role)}{" "}
                    {/* Display badge for admin/trainer */}
                  </span>
                  <div className="votes flex gap-4">
                    <button
                      className="btn"
                      onClick={() => handleUpvote(post._id)}
                    >
                      <span>Upvotes {post.upvotes}</span>
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDownvote(post._id)}
                    >
                      <span>Downvotes {post.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p> // Handle case where no posts are available
          )}

          {/* Pagination Controls */}
          <div className="pagination mt-4 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="btn px-4 py-2 bg-gray-300"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`btn px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="btn px-4 py-2 bg-gray-300"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
