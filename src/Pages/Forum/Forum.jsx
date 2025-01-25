import React, { useState, useEffect } from "react";
import VotePost from "./Vote/VotePost";

const ForumPage = () => {
  const [posts, setPosts] = useState([]); // Ensure this is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const postsPerPage = 6; // 6 posts per page
  const totalPages = 10; // We’ll set this dynamically based on the total posts count

  useEffect(() => {
    // Fetch posts for the current page
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/posts?page=${currentPage}&limit=${postsPerPage}`
        );
        const data = await response.json();
        setPosts(data.posts || []); // Ensure data.posts is always an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
        setPosts([]); // Set empty array if there’s an error
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="forum-page container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Forum</h1>

      {/* Post List */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? ( // Check if posts is an array and not empty
            posts.map((post) => (
              <div
                key={post._id}
                className="post-item p-4 mb-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <span>Posted by {post.author}</span>
                  <div className="votes">
                    <span>Upvotes: {post.upvotes}</span>
                    <span>Downvotes: {post.downvotes}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p> // Handle case where no posts are available
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination flex justify-center space-x-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {<VotePost />}
    </div>
  );
};

export default ForumPage;
