import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MarkdownFormatter from "@/components/MarkdownFormatter";
import InputField from "@/components/InputField";
import { Comment } from "@/utils/types";
import CommentRenderer from "@/components/CommentRenderer";
import { get } from "http";
import { getSendIcon } from "@/utils/svg";
import { showAlert } from "@/components/Alert";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: { id: number; firstName: string; lastName: string };
  tags: { id: number; name: string; color: string }[];
  numUpvotes: number;
  numDownvotes: number;
  Templates: { id: number; title: string; languageId: number }[];
}

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog-posts/${id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?blogId=${id}`);
      const data = await response.json();
      for (const comment of data.comments) {
        await fetchReplies(comment);
      }
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
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

  const renderLoading = () => {
    return (
      <div className="text-text-light dark:text-text-dark mt-10">
        Loading...
      </div>
    );
  };

  const renderBlog = (blog: Blog) => {
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
        <div className="flex flex-wrap gap-2 mt-2 mb-6">
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
    if (id) {
      fetchBlog();
      fetchComments();
    }
  }, [id]);

  const handleSendReply = async () => {
    try {
      console.log("Sending reply");
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

  return (
    <main className="min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark box-border">
      <div className="absolute top-0 left-0">
        <ThemeSwitcher />
      </div>
      <section className="w-900 py-10">
        {blog ? renderBlog(blog) : renderLoading()}
        {/* Comment Section */}
        <div className="mt-10 border-t py-5">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Comments
          </h2>
          <div className="mt-4">
            {/* TODO add button in input field */}
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
            {comments && blog ? (
              <CommentRenderer comments={comments} blogId={blog.id} />
            ) : (
              renderLoading()
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
