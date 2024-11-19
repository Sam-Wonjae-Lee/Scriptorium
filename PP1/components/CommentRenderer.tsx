import React, { useState, useEffect } from "react";
import { Comment } from "@/utils/types";
import { showAlert } from "./Alert";
import InputField from "./InputField";

interface CommentRendererProps {
  comments: Comment[];
}

const RenderComments: React.FC<CommentRendererProps> = ({ comments }) => {
  const [openedReply, setOpenedReply] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  useEffect(() => {
    console.log("open reply " + openedReply);
  }, [openedReply]);

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

  const getChatIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>
    );
  };

  const handleUpvote = async (id: number) => {
    try {
      const response = await fetch(`/api/ratings/comment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 2, // TODO: Replace with actual user id
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

  const handleDownvote = async (id: number) => {
    try {
      const response = await fetch(`/api/ratings/comment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 2, // TODO: Replace with actual user id
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

  const renderRatingSection = (comment: Comment) => {
    return (
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-105 transform transition-transform hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark rounded-full"
            onClick={() => {
              handleUpvote(comment.id);
            }}
          >
            {getUpvoteIcon()}
          </div>
          <span>{comment.numUpvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-105 transform transition-transform"
            onClick={() => {
              handleDownvote(comment.id);
            }}
          >
            {getDownvoteIcon()}
          </div>
          <span>{comment.numDownvotes}</span>
        </div>
      </div>
    );
  };

  const handleSendReply = async (comment: Comment) => {
    try {
      const response = await fetch(`/api/comments/${comment.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 2, // TODO: Replace with actual user id
          content: "This is a reply",
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to reply", "error");
        }
      }
      const data = response.json();
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  const renderReplies = (replies: Comment[]): JSX.Element[] => {
    return replies.map((reply) => (
      <div key={reply.id} className="ml-6 border-l border-gray-300 pl-4 mt-2">
        <div className="flex flex-col p-4">
          <p className="font-semibold">
            {reply.user.firstName} {reply.user.lastName}:
          </p>
          <p>{reply.content}</p>
          <div className="flex items-center gap-2 text-sm mt-2">
            {renderRatingSection(reply)}
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark py-1 px-2 rounded-full"
              onClick={() => {
                setOpenedReply(reply.id);
              }}
            >
              <div>{getChatIcon()}</div>
              <span>Reply</span>
            </div>
          </div>
        </div>
        {openedReply === reply.id && (
          <div className="mt-2" key={reply.id}>
            <InputField
              placeholder="Write your reply..."
              value={replyContent}
              onChangeText={setReplyContent}
            />
          </div>
        )}
        {reply.replies &&
          reply.replies.length > 0 &&
          renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="py-4 text-text-light dark:text-text-dark"
        >
          <div className="flex flex-col p-4">
            <p className="font-bold">
              {comment.user.firstName} {comment.user.lastName}:
            </p>
            <p>{comment.content}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
              {renderRatingSection(comment)}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark py-1 px-2 rounded-full">
                <div>{getChatIcon()}</div>
                <span>Reply</span>
              </div>
            </div>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">{renderReplies(comment.replies)}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderComments;
