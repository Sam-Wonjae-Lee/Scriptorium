import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";
import { BlogType, Template } from "@/utils/types";
import { showAlert } from "@/components/Alert";

const Home = () => {
  const router = useRouter();
  const scrollbarHideClass =
    "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

  const [trendingBlogs, setTrendingBlogs] = useState<BlogType[]>([]);
  const [controversialBlogs, setControversialBlogs] = useState<BlogType[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  // Convert template languageId to language name
  const [languages, setLanguages] = useState<{[key: number]: string}>({});

  const fetchLanguages = async () => {
    try {
        const response = await fetch(`/api/languages`);
        const data = await response.json();
        console.log(data[0].name)
        setLanguages(data);
    } 
    catch (error) {
        console.error("Error fetching languages:", error);
    }
  };

  const getTrendingBlogs = async () => {
    try {
      const response = await fetch("/api/blog-posts?sortBy=upvotes");
      const data = await response.json();
      setTrendingBlogs(data.blogPosts);
    } catch (error) {
      console.error("Error getting trending blogs:", error);
    }
  };

  const getControversialBlogs = async () => {
    try {
      const response = await fetch("/api/blog-posts?sortBy=controversial");
      const data = await response.json();
      setControversialBlogs(data.blogPosts);
    } catch (error) {
      console.error("Error getting controversial blogs:", error);
    }
  };

  const getTemplates = async () => {
    try {
        const response = await fetch('/api/code-templates/templates', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        });
        const data = await response.json();
        setTemplates(data.templates);
    } catch (error) {
        console.error("Error getting templates:", error);
    }
  };

  useEffect(() => {
    getTrendingBlogs();
  }, []);

  useEffect(() => {
    getControversialBlogs();
  }, []);

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background-light dark:bg-background-dark">
      <NavBar />
      <div className="flex flex-col items-center gap-4 mt-8 w-full">
        {/* Trending Blogs Section */}
        <section className="w-full p-4 bg-pink-200">
          <h2 className="text-xl font-bold mb-4">Trending Blogs</h2>
          <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
            {trendingBlogs && trendingBlogs.length > 0 ? (
              <div className="inline-flex gap-4 pb-4 w-max">
              {trendingBlogs?.map((blog) => (
                <div key={blog.id} className="w-[300px] shrink-0">
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
                  />
                </div>
              ))}
            </div>
            ) : ( <p> Trending blogs cannot be found </p>
            )}
          </div>
        </section>

        {/* Controversial Blogs Section */}
        <section className="w-full p-4 bg-pink-200">
          <h2 className="text-xl font-bold mb-4">Controversial Blogs</h2>
          <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
            {controversialBlogs && controversialBlogs.length > 0 ? (
            <div className="inline-flex gap-4 pb-4 w-max">
              {controversialBlogs?.map((blog) => (
                <div key={blog.id} className="w-[300px] shrink-0">
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
                  />
                </div>
              ))}
            </div>
            ) : ( <p> Controversial blogs cannot be found </p>
            )}
          </div>
        </section>

        {/* Templates Section */}
        <section className="w-full p-4 bg-pink-200">
          <h2 className="text-xl font-bold mb-4">Templates</h2>
          <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
            {templates && templates.length > 0 ? (
            <div className="inline-flex gap-4 pb-4 w-max">
              {templates.map((template) => (
                <div key={template.id}>
                  <Card
                    id={template.id}
                    title={template.title}
                    language={template.language.name}
                    author={{
                      firstName: template.author.firstName,
                      lastName: template.author.lastName,
                      id: template.author.id,
                    }}
                    description={template.explanation}
                    tags={template.tags}
                    type={"templates"}
                    owned={template.owned}
                    handleEdit={(id) => router.push(`/online-editor?templateId=${id}&edit=true`)}
                  />
                </div>
              ))}
            </div>
            ) : ( <p> Templates cannot be found </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;