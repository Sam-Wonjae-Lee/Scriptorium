import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MarkdownFormatter from "@/components/MarkdownFormatter";
import InputField from "@/components/InputField";
import { Comment } from "@/utils/types";
import CommentRenderer from "@/components/CommentRenderer";

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
      console.log(data.comments);
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
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-lg text-sm select-none"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Templates */}
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.Templates.map((template) => (
            <span
              key={template.id}
              className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-lg text-sm select-none"
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
            />
            {comments ? (
              <CommentRenderer comments={comments} />
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
