import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MarkdownFormatter from "@/components/MarkdownFormatter";
import InputField from "@/components/InputField";
import { Comment } from "@/utils/types";
import CommentRenderer from "@/components/CommentRenderer";
import { getReportIcon, getSendIcon } from "@/utils/svg";
import { showAlert } from "@/components/Alert";
import BlogRatingSection from "@/components/BlogRatingSection";
import { BlogType } from "@/utils/types";
import ReportModal from "@/components/ReportModal";
import Dropdown from "@/components/Dropdown";

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [blogExists, setBlogExists] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");

  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);

  const [commentSortBy, setCommentSortBy] = useState("upvotes");

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchBlog = async () => {
    try {
      if (isNaN(Number(id))) {
        setBlogExists(false);
        return;
      }

      const response = await fetch(`/api/blog-posts/${id}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status == 404) {
          setBlogExists(false);
          return;
        }
        showAlert("Error fetching blog", "error");
        return;
      }
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchComments = async (currentPage: number) => {
    if (!id) {
      return;
    }

    if (isNaN(Number(id))) {
      setBlogExists(false);
      return;
    }
    try {
      setIsFetching(true);
      const response = await fetch(
        `/api/comments?blogId=${id}&page=${currentPage}&sortBy=${commentSortBy}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status !== 404) {
          showAlert("Error fetching comments", "error");
        }
        return;
      }

      for (const comment of data.comments) {
        await fetchReplies(comment);
      }
      setComments((prevComments) => [...prevComments, ...data.comments]);
      setHasMoreComments(
        data.pagination.currentPage < data.pagination.totalPages
      );
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleScroll = () => {
    if (!hasMoreComments || isFetching) {
      return;
    }

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchReplies = async (comment: Comment): Promise<Comment> => {
    comment.replies = [];

    for (const reply of comment.Comments) {
      const replyData = await fetchSingleComment(reply.id);
      const nestedReply = await fetchReplies(replyData);
      comment.replies.push(nestedReply);
    }

    return comment;
  };

  const fetchSingleComment = async (commentId: number) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  };

  const render404 = () => {
    return (
      <div className="w-full text-text-light dark:text-text-dark mt-10 flex flex-col gap-2 items-center justify-center">
        <div className="text-3xl font-bold">404</div>
        <div className="text-2xl">Blog not found</div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className="text-text-light dark:text-text-dark mt-10">
        Loading...
      </div>
    );
  };

  const renderBlog = (blog: BlogType) => {
    return (
      <div className="text-text-light dark:text-text-dark">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p
          className="text-md cursor-pointer hover:underline mb-4"
          onClick={() => {
            router.push(`/profile/${blog.author.id}`);
          }}
        >
          By {blog.author.firstName} {blog.author.lastName}{" "}
        </p>
        <div className="flex gap-2 mb-4">
          <BlogRatingSection blog={blog} />
          <div
            className="flex gap-2 p-2 rounded-full cursor-pointer hover:bg-background_secondary-light dark:hover:bg-background_secondary-dark"
            onClick={() => setReportModalIsOpen(true)}
          >
            <div>{getReportIcon()}</div>
            <span>Report</span>
          </div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 rounded-lg text-sm select-none"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Templates */}
        <div className="flex flex-wrap gap-2 mt-2 pb-4 mb-2  border-b border-text-light dark:border-text-dark">
          <h2>Linked Code Templates</h2>
          {blog.Templates.map((template) => (
            <span
              key={template.id}
              className="bg-element_background-light dark:bg-element_background-dark px-2 py-1 rounded-lg text-sm select-none cursor-pointer hover:"
              onClick={() => {
                router.push(`/templates/${template.id}`);
              }}
            >
              {template.title}
            </span>
          ))}
        </div>

        <MarkdownFormatter content={blog.content} />
      </div>
    );
  };

  useEffect(() => {
    console.log("fetching comments");
    setComments([]);
    setPage(1);
    fetchComments(1);
  }, [commentSortBy]);

  useEffect(() => {
    if (id) {
      fetchBlog();
      fetchComments(page);
    }
  }, [id]);

  useEffect(() => {
    if (page > 1) {
      fetchComments(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreComments, isFetching]);

  const handleSendReply = async () => {
    try {
      const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: commentInput,
          blogId: id,
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

  const handleBlogReportSubmit = async (
    reportType: string,
    description: string
  ) => {
    try {
      const response = await fetch(`/api/content-monitoring/reports/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          blogId: id,
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
          showAlert("You have already reported this blog", "error");
          return;
        }

        showAlert("Failed to report blog", "error");
        return;
      }
      showAlert("Blog reported successfully", "success");
    } catch (error) {
      console.error("Error reporting blog:", error);
    }
  };

  return (
    <main className="min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark box-border">
      <ReportModal
        show={reportModalIsOpen}
        onHide={() => setReportModalIsOpen(false)}
        onSubmit={(reportType, description) => {
          handleBlogReportSubmit(reportType, description);
        }}
      />
      <div className="absolute top-0 left-0">
        <ThemeSwitcher />
      </div>
      <section className="w-900 py-10">
        {blog ? renderBlog(blog) : blogExists ? renderLoading() : render404()}
        {/* Comment Section */}
        <div className="mt-10 border-t py-5">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Comments
          </h2>
          <div className="mt-4">
            <InputField
              placeholder="Write a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
              buttonActions={[
                {
                  icon: getSendIcon(),
                  label: "Send",
                  onClick: () => {
                    handleSendReply();
                  },
                },
              ]}
            />
            <div className="mt-4">
              <Dropdown
                options={["upvotes", "downvotes", "controversial"]}
                selectedOption={commentSortBy}
                setSelectedOption={setCommentSortBy}
              />
            </div>
            {comments && blog ? (
              <CommentRenderer comments={comments} blogId={blog.id} />
            ) : blogExists ? (
              renderLoading()
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
