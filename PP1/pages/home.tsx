import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: { id: number; firstName: string; lastName: string };
    tags: { id: number; name: string; color: string }[];
    numUpvotes: number;
    numDownvotes: number;
  }

interface Template {
    id: number;
    title: string;
    explanation: string;
    author: { id: number; firstName: string; lastName: string };
    languageId: number;
}

const Home = () => {
    const scrollbarHideClass = "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

    const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
    const [controversialBlogs, setControversialBlogs] = useState<Blog[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    
    // Convert template languageId to language name
    const [languages, setLanguages] = useState<{[key: number]: string}>({});

    const getLanguage = async (langaugeId: number) => {
        try {
            const response = await fetch(`/api/languages/${langaugeId}`);
            const data = await response.json();
            setLanguages((prev) => ({ ...prev, [langaugeId]: data.name }));
        } catch (error) {
            console.error("Error getting language:", error);
        }
    };    

    const getTrendingBlogs = async () => {
        try {
            const response = await fetch('/api/blog-posts?sortBy=upvotes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        });
            const data = await response.json();
            setTrendingBlogs(data.blogPosts);
        } catch (error) {
            console.error("Error getting trending blogs:", error);
        }
    };

    const getControversialBlogs = async () => {
        try {
            const response = await fetch('/api/blog-posts?sortBy=controversial', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            });
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
                        <div className="inline-flex gap-4 pb-4 w-max">
                            {trendingBlogs?.map((blog) => (
                                <div key={blog.id} className="w-[300px] shrink-0">
                                    <Card
                                        id={blog.id}
                                        title={blog.title}
                                        author={blog.author}
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
                    </div>
                </section>


                {/* Controversial Blogs Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Controversial Blogs</h2>
                    <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
                    <div className="inline-flex gap-4 pb-4 w-max">
                            {controversialBlogs?.map((blog) => (
                                <div key={blog.id} className="w-[300px] shrink-0">
                                    <Card
                                        id={blog.id}
                                        title={blog.title}
                                        author={blog.author}
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
                    </div>
                </section>

                {/* Templates Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Templates</h2>
                    <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
                        <div className="inline-flex gap-4 pb-4 w-max">
                        {templates?.map((template) => (
                            <div key={template.id} className="w-[300px] shrink-0">
                                <Card
                                    id={template.id}
                                    title={template.title}
                                    author={template.author}
                                    description={template.explanation}
                                    language={languages[template.languageId]}
                                    tags={[]}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;