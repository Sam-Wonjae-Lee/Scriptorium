import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: { id: number; firstName: string; lastName: string };
  tags: { id: number; name: string; color: string }[];
  numUpvotes: number;
  numDownvotes: number;
}

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog-posts/${id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default Blog;
