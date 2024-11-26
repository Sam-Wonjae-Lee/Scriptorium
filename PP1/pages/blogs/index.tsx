import React, { useState, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import InputField from "@/components/InputField";
import Card from "@/components/Card";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { Option } from "@/utils/types";
import Dropdown from "@/components/Dropdown";
import { BlogType } from "@/utils/types";
import { useRouter } from "next/router";
import { showAlert } from "@/components/Alert";
import ActionButton from "@/components/ActionButton";

const Blogs = () => {
  const router = useRouter();
  const [blogQuery, setBlogQuery] = useState("");

  const [blogs, setBlogs] = useState<BlogType[]>([]);

  // Tags
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [tagQuery, setTagQuery] = useState("");

  // Languages
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [languageQuery, setLanguageQuery] = useState("");

  // Sort by
  const [sortBy, setSortBy] = useState("upvotes");
  const sortTypes = ["upvotes", "downvotes", "controversial"];

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // Delete modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteConfirmationHasError, setDeleteConfirmationHasError] =
    useState(false);

  useEffect(() => {
    fetchTags();
  }, [tagQuery]);

  useEffect(() => {
    fetchLanguages();
  }, [languageQuery]);

  useEffect(() => {
    setBlogs([]);
    setPage(1);
    fetchBlogs(1);
  }, [blogQuery, selectedTags, selectedLanguages, sortBy]);

  useEffect(() => {
    if (page > 1) {
      fetchBlogs(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreBlogs, isFetching]);

  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags?query=${tagQuery}`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      // This pretty much only exists for c++
      const formattedQuery = languageQuery.split("+").join("%2B");
      const response = await fetch(`/api/languages?query=${formattedQuery}`);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchBlogs = async (currentPage: number) => {
    try {
      setIsFetching(true);
      const query = `/api/blog-posts?query=${blogQuery}&page=${currentPage}&tags=${selectedTags
        .map((tag) => tag.id)
        .join(",")}&languages=${selectedLanguages
        .map((language) => language.id)
        .join(",")}&sortBy=${sortBy}`;
      const response = await fetch(query, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();

      setBlogs((prevBlogs) => {
        const newBlogs = [...prevBlogs, ...data.blogPosts];
        const uniqueBlogs = newBlogs.filter(
          (blog, index, self) =>
            index === self.findIndex((b) => b.id === blog.id)
        );
        return uniqueBlogs;
      });
      setHasMoreBlogs(data.pagination.currentPage < data.pagination.totalPages);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleScroll = () => {
    if (isFetching || !hasMoreBlogs) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteConfirmationHasError(false);
    if (deleteConfirmation !== "CONFIRM") {
      setDeleteConfirmationHasError(true);
      return;
    }
    handleCloseDeleteModal();

    try {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to delete a blog", "error");
          return;
        }
        showAlert("Error deleting blog", "error");
        return;
      } else {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        showAlert("Blog deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setDeleteConfirmation("");
    setDeleteBlogId(null);
    setDeleteConfirmationHasError(false);
  };

  const renderDeleteModal = () => {
    return (
      <div
        className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleCloseDeleteModal}
      >
        <div
          className="w-96 bg-background-light dark:bg-background-dark border border-text-light dark:border-text-dark rounded-xl p-6 shadow-lg flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">
            Are you sure you would like to delete this blog?
          </h2>
          <div className="w-10/12 mb-4">
            <InputField
              placeholder="Type CONFIRM to delete this blog"
              value={deleteConfirmation}
              onChangeText={setDeleteConfirmation}
              hasError={deleteConfirmationHasError}
              errorMessage="You must type CONFIRM"
            />
          </div>

          <div className="flex justify-center gap-2">
            <ActionButton
              onClick={() => handleDelete(deleteBlogId!)}
              text="Submit"
              size="small"
            />
            <ActionButton
              onClick={handleCloseDeleteModal}
              text="Cancel"
              size="small"
              secondaryButton
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark box-border">
      <div className="absolute top-0 left-0">
        <ThemeSwitcher />
      </div>
      {deleteModalIsOpen && renderDeleteModal()}

      <div className="max-w-900 w-full px-4 sm:px-6 md:px-8">
        <section className="w-full my-12">
          {/* Page search section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-0">
              Blogs
            </h1>
            {/* Search blogs */}
            <div className="w-full sm:w-72">
              <InputField
                placeholder="Search blogs"
                value={blogQuery}
                onChangeText={setBlogQuery}
              />
            </div>
          </div>
          <h2 className="text-lg mb-4 text-text-light dark:text-text-dark">
            Explore blogs to learn how to code!
          </h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-80">
              <MultiSelectDropdown
                placeholder="Select tags"
                searchPlaceholder="Search tags"
                options={tags}
                selectedOptions={selectedTags}
                setSelectedOptions={setSelectedTags}
                query={tagQuery}
                onQueryChange={setTagQuery}
              />
            </div>
            <div className="w-full sm:w-80">
              <MultiSelectDropdown
                placeholder="Select language"
                searchPlaceholder="Search languages"
                options={languages}
                selectedOptions={selectedLanguages}
                setSelectedOptions={setSelectedLanguages}
                query={languageQuery}
                onQueryChange={setLanguageQuery}
              />
            </div>
            <div className="w-full sm:flex-grow">
              <Dropdown
                options={sortTypes}
                selectedOption={sortBy}
                setSelectedOption={setSortBy}
              />
            </div>
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
                  description={""}
                  tags={blog.tags}
                  type={"blogs"}
                  blog={blog}
                  owned={blog.owned}
                  handleEdit={(id) => router.push(`/blogs/${id}/edit`)}
                  handleDelete={(id) => {
                    setDeleteBlogId(id);
                    setDeleteModalIsOpen(true);
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
