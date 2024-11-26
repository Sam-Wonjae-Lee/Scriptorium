import React, { useEffect, useState } from "react";
import { showAlert } from "./Alert";
import { BlogType } from "@/utils/types";
import { refreshLogin, verifyLogin } from "@/components/refresh";
import { verify } from "crypto";

interface BlogRatingSectionProps {
  blog: BlogType;
}

const BlogRatingSection: React.FC<BlogRatingSectionProps> = ({ blog }) => {
  const [blogUpvotes, setBlogUpvotes] = useState<number>(0);
  const [blogDownvotes, setBlogDownvotes] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    setBlogUpvotes(blog.numUpvotes);
    setBlogDownvotes(blog.numDownvotes);
    getBlogRating(blog.id);
  }, []);

  const getBlogRating = async (id: number) => {
    try {
      const response = await fetch(`/api/ratings/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      setRating(data.rating);
    } catch (error) {
      console.error("Error getting comment rating data:", error);
    }
  };

  const getDownvoteIcon = (rating: number) => {
    return (
      <svg
        fill="currentColor"
        className={`${
          rating == -1 ? "text-red-500" : "text-text-light dark:text-text-dark"
        }`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
      </svg>
    );
  };

  const getUpvoteIcon = (rating: number) => {
    return (
      <svg
        fill="currentColor"
        className={`${
          rating == 1 ? "text-green-500" : "text-text-light dark:text-text-dark"
        }`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
      </svg>
    );
  };

  const handleUpvote = async (id: number) => {
    try {
      const action = rating === 1 ? "remove-upvote" : "upvote";

      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const response = await fetch(`/api/ratings/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          action: action,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to upvote", "error");
          return;
        }
        showAlert("Error upvoting", "error");
        return;
      }

      if (rating === -1) {
        setBlogDownvotes(blogDownvotes - 1);
        setBlogUpvotes(blogUpvotes + 1);
      } else if (rating === 0) {
        setBlogUpvotes(blogUpvotes + 1);
      } else {
        setBlogUpvotes(blogUpvotes - 1);
      }

      setRating(rating === 1 ? 0 : 1);
    } catch (error) {
      console.error("Error upvoting:", error);
      showAlert("Error upvoting", "error");
    }
  };

  const handleDownvote = async (id: number) => {
    try {
      const action = rating === -1 ? "remove-downvote" : "downvote";

      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const response = await fetch(`/api/ratings/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          action: action,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to downvote", "error");
          return;
        }
        showAlert("Error upvoting", "error");
        return;
      }

      if (rating === -1) {
        setBlogDownvotes(blogDownvotes - 1);
      } else if (rating === 0) {
        setBlogDownvotes(blogDownvotes + 1);
      } else {
        setBlogDownvotes(blogDownvotes + 1);
        setBlogUpvotes(blogUpvotes - 1);
      }

      setRating(rating === -1 ? 0 : -1);
    } catch (error) {
      console.error("Error downvoting:", error);
      showAlert("Error upvoting", "error");
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-1">
        <div
          className="h-5 w-5 cursor-pointer hover:scale-110 transform transition-transform rounded-full"
          onClick={() => {
            handleUpvote(blog.id);
          }}
        >
          {getUpvoteIcon(rating)}
        </div>
        <span>{blogUpvotes}</span>
      </div>
      <div className="flex items-center gap-1">
        <div
          className="h-5 w-5 cursor-pointer hover:scale-110 transform transition-transform"
          onClick={() => {
            handleDownvote(blog.id);
          }}
        >
          {getDownvoteIcon(rating)}
        </div>
        <span>{blogDownvotes}</span>
      </div>
    </div>
  );
};

export default BlogRatingSection;
