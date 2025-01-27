import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const AddNewForum = () => {
  const { user } = useAuth();
  const [role] = useUserRole();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (role !== "admin" && role !== "trainer")) {
      toast.error("Access denied!");
      navigate("/");
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill out all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/forums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author: {
            name: user.displayName,
            role: role,
          },
          createdAt: new Date().toISOString(),
        }),
      });

      if (response) {
        toast.success("Forum added successfully!");
        navigate("/");
      } else {
        toast.error("Failed to add forum. Please try again later.");
        console.error("Error response:", await response.json());
      }
    } catch (error) {
      console.error("Error adding forum:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Forum</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Forum Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="Enter forum title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="Write your content here"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Forum"}
        </button>
      </form>
    </div>
  );
};

export default AddNewForum;
