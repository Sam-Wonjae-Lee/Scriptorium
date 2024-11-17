import React, { useState, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import InputField from "@/components/InputField";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";

// TODO blog interface
interface Blog {
  id: number;
  title: string;
  content: string;
  author: { id: number; firstName: string; lastName: string };
  tags: { id: number; name: string; color: string }[];
  numUpvotes: number;
  numDownvotes: number;
}

const Blogs = () => {
  const [blogQuery, setBlogQuery] = useState("");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedTags, setSelectedTags] = useState<
    { id: number; name: string }[]
  >([]);
  const [tags, setTags] = useState<
    { id: number; name: string; color: string }[]
  >([]);
  const [tagQuery, setTagQuery] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [blogQuery]);

  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags?query=${tagQuery}`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`/api/blog-posts?query=${blogQuery}`);
      const data = await response.json();
      setBlogs(data.blogPosts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <main className="min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark">
      <div className="absolute top-0 left-0">
        <ThemeSwitcher />
      </div>
      <div className="max-w-900 w-900">
        <section className="w-full my-12">
          {/* Page search section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
              Blogs
            </h1>
            {/* Search blogs */}
            <div className="w-72">
              <InputField
                placeholder="Search blogs"
                value={blogQuery}
                onChangeText={setBlogQuery}
              />
            </div>
          </div>
          <h2 className="text-lg text-text-light dark:text-text-dark">
            Explore blogs to learn how to code!
          </h2>
          <div className="w-48">
            <Dropdown
              options={tags}
              selectedOptions={selectedTags}
              setSelectedOptions={setSelectedTags}
            />
          </div>
        </section>
        <section className="w-full">
          {/* Blogs section */}
          <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <Card
                  id={blog.id}
                  title={blog.title}
                  author={{
                    firstName: blog.author.firstName,
                    lastName: blog.author.lastName,
                    id: blog.author.id,
                  }}
                  description={blog.content}
                  tags={blog.tags}
                  rating={{
                    upvotes: blog.numUpvotes,
                    downvotes: blog.numDownvotes,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Blogs;
