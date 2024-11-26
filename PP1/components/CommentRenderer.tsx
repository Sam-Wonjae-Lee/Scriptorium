import React, { useState, useEffect } from "react";
import { AvatarProps, Comment } from "@/utils/types";
import { showAlert } from "./Alert";
import InputField from "./InputField";
import { getCancelIcon, getReportIcon, getSendIcon } from "@/utils/svg";
import ReportModal from "@/components/ReportModal";

interface CommentRendererProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  blogId: number;
}

const RenderComments: React.FC<CommentRendererProps> = ({
  comments,
  setComments,
  blogId,
}) => {
  const [openedReply, setOpenedReply] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [commentRatings, setCommentRatings] = useState<{
    [key: number]: number;
  }>({});
  const [commentUpvotes, setCommentUpvotes] = useState<{
    [key: number]: number;
  }>({});
  const [commentDownvotes, setCommentDownvotes] = useState<{
    [key: number]: number;
  }>({});

  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [reportingCommentId, setReportingCommentId] = useState<number>(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings: { [key: number]: number } = {};

      const exploreComments = async (comments: Comment[]) => {
        for (const comment of comments) {
          const rating = await getCommentRating(comment.id);
          ratings[comment.id] = rating;
          if (comment.replies && comment.replies.length > 0) {
            await exploreComments(comment.replies);
          }
        }
      };

      await exploreComments(comments);
      setCommentRatings(ratings);
    };

    const fetchUpvotes = async () => {
      const upvotes: { [key: number]: number } = {};

      const exploreComments = async (comments: Comment[]) => {
        for (const comment of comments) {
          const upvote = comment.numUpvotes;
          upvotes[comment.id] = upvote;
          if (comment.replies && comment.replies.length > 0) {
            await exploreComments(comment.replies);
          }
        }
      };

      await exploreComments(comments);
      setCommentUpvotes(upvotes);
    };

    const fetchDownvotes = async () => {
      const downvotes: { [key: number]: number } = {};

      const exploreComments = async (comments: Comment[]) => {
        for (const comment of comments) {
          const downvote = comment.numDownvotes;
          downvotes[comment.id] = downvote;
          if (comment.replies && comment.replies.length > 0) {
            await exploreComments(comment.replies);
          }
        }
      };

      await exploreComments(comments);
      setCommentDownvotes(downvotes);
    };

    fetchUpvotes();
    fetchDownvotes();

    fetchRatings();
  }, [comments]);

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
      const action = commentRatings[id] === 1 ? "remove-upvote" : "upvote";

      const response = await fetch(`/api/ratings/comment/${id}`, {
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
      }

      if (commentRatings[id] === -1) {
        setCommentDownvotes({
          ...commentDownvotes,
          [id]: commentDownvotes[id] - 1,
        });
        setCommentUpvotes({
          ...commentUpvotes,
          [id]: commentUpvotes[id] + 1,
        });
      } else if (commentRatings[id] === 0) {
        setCommentUpvotes({
          ...commentUpvotes,
          [id]: commentUpvotes[id] + 1,
        });
      } else {
        setCommentUpvotes({
          ...commentUpvotes,
          [id]: commentUpvotes[id] - 1,
        });
      }

      setCommentRatings({
        ...commentRatings,
        [id]: commentRatings[id] === 1 ? 0 : 1,
      });
    } catch (error) {
      console.error("Error upvoting:", error);
      showAlert("Error upvoting", "error");
    }
  };

  const handleDownvote = async (id: number) => {
    try {
      const action = commentRatings[id] === -1 ? "remove-downvote" : "downvote";

      const response = await fetch(`/api/ratings/comment/${id}`, {
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
      }

      if (commentRatings[id] === -1) {
        setCommentDownvotes({
          ...commentDownvotes,
          [id]: commentDownvotes[id] - 1,
        });
      } else if (commentRatings[id] === 0) {
        setCommentDownvotes({
          ...commentDownvotes,
          [id]: commentDownvotes[id] + 1,
        });
      } else {
        setCommentDownvotes({
          ...commentDownvotes,
          [id]: commentDownvotes[id] + 1,
        });
        setCommentUpvotes({
          ...commentUpvotes,
          [id]: commentUpvotes[id] - 1,
        });
      }

      setCommentRatings({
        ...commentRatings,
        [id]: commentRatings[id] === -1 ? 0 : -1,
      });
    } catch (error) {
      console.error("Error downvoting:", error);
      showAlert("Error upvoting", "error");
    }
  };

  const getCommentRating = async (id: number) => {
    try {
      const response = await fetch(`/api/ratings/comment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      return data.rating;
    } catch (error) {
      console.error("Error getting comment rating data:", error);
    }
  };

  const renderRatingSection = (comment: Comment) => {
    return (
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-110 transform transition-transform rounded-full"
            onClick={() => {
              handleUpvote(comment.id);
            }}
          >
            {getUpvoteIcon(commentRatings[comment.id])}
          </div>
          <span>{commentUpvotes[comment.id]}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer hover:scale-110 transform transition-transform"
            onClick={() => {
              handleDownvote(comment.id);
            }}
          >
            {getDownvoteIcon(commentRatings[comment.id])}
          </div>
          <span>{commentDownvotes[comment.id]}</span>
        </div>
      </div>
    );
  };

  const handleSendReply = async (comment: Comment) => {
    try {
      const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          content: replyContent,
          blogId: blogId,
          parentCommentId: comment.id,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to reply", "error");
        }
      }

      const newReply = await response.json();
      setComments((prevComments: Comment[]) => {
        const addReplyToComment = (comments: Comment[]): Comment[] => {
          return comments.map((c) => {
            if (c.id === comment.id) {
              return {
                ...c,
                replies: [...(c.replies || []), newReply],
              };
            } else if (c.replies && c.replies.length > 0) {
              return {
                ...c,
                replies: addReplyToComment(c.replies),
              };
            }
            return c;
          });
        };
        return addReplyToComment(prevComments);
      });
      setReplyContent("");
      setOpenedReply(null);
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  const handleCommentReportSubmit = async (
    reportType: string,
    description: string
  ) => {
    try {
      const response = await fetch(`/api/content-monitoring/reports/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          commentId: reportingCommentId,
          reportId: reportType,
          explanation: description,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to report", "error");
          return;
        }

        if (response.status === 409) {
          showAlert("You have already reported this comment", "error");
          return;
        }

        showAlert("Failed to report comment", "error");
        return;
      }
      showAlert("Comment reported successfully", "success");
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  const getAvatarSrc = (avatarData: AvatarProps["avatar"]) => {
    if (!avatarData?.data) return null;
    const base64 = Buffer.from(avatarData.data).toString("base64");
    return `data:image/png;base64,${base64}`;
  };

  const renderReplies = (replies: Comment[]): JSX.Element[] => {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className="ml-6 border-l border-text-light dark:border-text-dark pl-4 mt-2"
      >
        <div className="flex flex-col p-2">
          <div className="w-10 h-10">
            <img
              src={getAvatarSrc(reply.user.avatar)!}
              // alt="User Avatar"
              className="avatar"
            />
          </div>
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
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark py-1 px-2 rounded-full"
              onClick={() => {
                setReportModalIsOpen(true);
                setReportingCommentId(reply.id);
              }}
            >
              <div>{getReportIcon()}</div>
              <span>Report</span>
            </div>
          </div>
        </div>
        {openedReply === reply.id && (
          <div className="mb-2" key={reply.id}>
            <InputField
              placeholder="Write your reply..."
              value={replyContent}
              onChangeText={setReplyContent}
              buttonActions={[
                {
                  icon: getCancelIcon(),
                  label: "Cancel",
                  onClick: () => {
                    setOpenedReply(null);
                    setReplyContent("");
                  },
                },
                {
                  icon: getSendIcon(),
                  label: "Send",
                  onClick: () => {
                    handleSendReply(reply);
                  },
                },
              ]}
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
      <ReportModal
        show={reportModalIsOpen}
        onHide={() => setReportModalIsOpen(false)}
        onSubmit={(reportType, description) => {
          handleCommentReportSubmit(reportType, description);
        }}
      />
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="py-4 text-text-light dark:text-text-dark"
        >
          <div className="flex flex-col p-2">
            <p className="font-bold">
              {comment.user.firstName} {comment.user.lastName}:
            </p>
            <p>{comment.content}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
              {renderRatingSection(comment)}
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark py-1 px-2 rounded-full"
                onClick={() => {
                  setOpenedReply(comment.id);
                }}
              >
                <div>{getChatIcon()}</div>
                <span>Reply</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark py-1 px-2 rounded-full"
                onClick={() => {
                  setReportModalIsOpen(true);
                  setReportingCommentId(comment.id);
                }}
              >
                <div>{getReportIcon()}</div>
                <span>Report</span>
              </div>
            </div>
          </div>
          {openedReply === comment.id && (
            <div className="mb-4" key={comment.id}>
              <InputField
                placeholder="Write your reply..."
                value={replyContent}
                onChangeText={setReplyContent}
                buttonActions={[
                  {
                    icon: getCancelIcon(),
                    label: "Cancel",
                    onClick: () => {
                      setOpenedReply(null);
                      setReplyContent("");
                    },
                  },
                  {
                    icon: getSendIcon(),
                    label: "Send",
                    onClick: () => {
                      handleSendReply(comment);
                    },
                  },
                ]}
              />
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">{renderReplies(comment.replies)}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderComments;
