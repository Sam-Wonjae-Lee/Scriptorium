import React from "react";
import { showAlert } from "@/components/Alert";
import { useRouter } from "next/router";
import { BlogType, Rating, Tag } from "@/utils/types";
import BlogRatingSection from "./BlogRatingSection";
import {
  getDeleteIcon,
  getEditIcon,
  getReportIcon,
  getForkIcon,
} from "@/utils/svg";

interface CardProps {
  id: number;
  title: string;
  author: { firstName: string; lastName: string; id: number };
  description: string;
  tags: Tag[];
  type: "blogs" | "templates";
  ratings?: Rating;
  language?: string;
  blog?: BlogType;
  owned?: boolean;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  author,
  description,
  tags,
  type,
  ratings,
  language,
  blog,
  owned,
  handleDelete,
  handleEdit,
}) => {
  const router = useRouter();
  const truncateDescription = (desc: string) => {
    const cutoffLength = language ? 100 : 250;
    return desc.length > cutoffLength
      ? desc.substring(0, cutoffLength) + "..."
      : desc;
  };

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/ratings/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: "upvote",
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to upvote", "error");
        }
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(`/api/ratings/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: "downvote",
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to downvote", "error");
        }
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const getDownvoteIcon = () => {
    return (
      <svg
        fill="currentColor"
        className="text-text-light dark:text-text-dark"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
      </svg>
    );
  };

  const getUpvoteIcon = () => {
    return (
      <svg
        fill="currentColor"
        className="text-text-light dark:text-text-dark"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
      </svg>
    );
  };

  const renderCodeTemplateSection = () => {
    if (!language) return null;
    return (
      <div className="flex justify-between">
        <span>{language}</span>
        <button
          className="border flex gap-1 p-1 rounded border-text-light dark:border-text-dark"
          onClick={() => router.push(`/online-editor?templateId=${id}`)}
        >
          <div className="w-6 h-6">{getForkIcon()}</div>
          <span>Fork template</span>
        </button>
      </div>
    );
  };

  const renderRatingSection = () => {
    return (
      <div className="flex gap-2 absolute bottom-2 right-2">
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-105 transform transition-transform"
            onClick={() => {
              handleUpvote();
            }}
          >
            {getUpvoteIcon()}
          </div>
          <span>{ratings?.upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-105 transform transition-transform"
            onClick={() => {
              handleDownvote();
            }}
          >
            {getDownvoteIcon()}
          </div>
          <span>{ratings?.downvotes}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative rounded p-2 h-56 text-text-light dark:text-text-dark border-2 border-text-light dark:border-text-dark bg-element_background-light dark:bg-element_background-dark">
      {language && renderCodeTemplateSection()}
      <h2
        className="text-xl mb-2 cursor-pointer hover:underline"
        onClick={() => {
          router.push(`/${type}/${id}`);
        }}
      >
        {title}
      </h2>
      <h3 className="text-xs mb-2 hover:underline">
        {/* TODO change this link to a like to the profile page of this user */}
        by{" "}
        <span
          className="cursor-pointer"
        >
          {author.firstName} {author.lastName}
        </span>
      </h3>
      <div className="flex gap-1 mb-2">
        {tags.map((tag, index) => (
          <div
            key={tag.id}
            className="px-2 py-1 rounded-full flex items-center justify-center bg-background_secondary-light dark:bg-background_secondary-dark
            "
          >
            <span className="uppercase text-xs" style={{ color: tag.color }}>
              {tag.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm overflow-hidden">{truncateDescription(description)}</p>

      {owned && handleDelete && handleEdit && (
        <div className="absolute bottom-2 left-2 flex gap-2">
          <div
            className="w-6 h-6 cursor-pointer hover:text-hot_pink-normal hover:scale-110 transform transition-transform"
            onClick={() => handleEdit(id)}
          >
            {getEditIcon()}
          </div>
          <div
            className="w-6 h-6 cursor-pointer hover:text-hot_pink-normal hover:scale-110 transform transition-transform"
            onClick={() => handleDelete(id)}
          >
            {getDeleteIcon()}
          </div>
        </div>
      )}

      {blog && (
        <div className="absolute bottom-2 right-3">
          <BlogRatingSection blog={blog} />
        </div>
      )}

      {blog?.isFlagged && (
        <div
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
          title="This content has been flagged by administrators and is no longer visible to the public"
        >
          {getReportIcon()}
        </div>
      )}
    </div>
  );
};

export default Card;
