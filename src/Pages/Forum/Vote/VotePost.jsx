import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const VotePost = ({ postId, currentUpvotes, currentDownvotes }) => {
  const user = useContext(AuthContext);
  const [upvotes, setUpvotes] = useState(currentUpvotes);
  const [downvotes, setDownvotes] = useState(currentDownvotes);
  const navigate = useNavigate();

  const handleVote = async (type) => {
    if (!user) {
      // Redirect to login if user is not logged in
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          voteType: type, // 'up' or 'down'
          userId: user.id,
        }),
      });

      if (response.ok) {
        if (type === "up") {
          setUpvotes(upvotes + 1);
        } else {
          setDownvotes(downvotes + 1);
        }
      } else {
        console.error("Failed to vote");
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="vote-buttons">
      <button
        onClick={() => handleVote("up")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Upvote {upvotes}
      </button>
      <button
        onClick={() => handleVote("down")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Downvote {downvotes}
      </button>
    </div>
  );
};

export default VotePost;
