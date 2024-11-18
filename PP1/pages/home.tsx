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
    content: string;
    author: { id: number; firstName: string; lastName: string };
    tags: { id: number; name: string; color: string }[];
    numUpvotes: number;
    numDownvotes: number;
    language: string;
}

const Home = () => {
    const scrollbarHideClass = "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

    const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
    const [trendingTemplates, setTrendingTemplates] = useState<Template[]>([]);

    const [controversialBlogs, setControversialBlogs] = useState<Blog[]>([]);
    const [controversialTemplates, setControversialTemplates] = useState<Template[]>([]);

    const getTrendingBlogs = async () => {
        try {
            const response = await fetch('/api/blog-posts?sortBy=upvotes');
            const data = await response.json();
            setTrendingBlogs(data.blogPosts);
        } catch (error) {
            console.error("Error getting trending blogs:", error);
        }
    };

    const getControversialBlogs = async () => {
        try {
            const response = await fetch('/api/blog-posts?sortBy=controversial');
            const data = await response.json();
            setControversialBlogs(data.blogPosts);
        } catch (error) {
            console.error("Error getting controversial blogs:", error);
        }
    };

    useEffect(() => {
        getTrendingBlogs();
    }, []);

    useEffect(() => {
        getControversialBlogs();
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

                {/* Trending Templates Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Trending Templates</h2>
                    <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
                        <div className="inline-flex gap-4 pb-4 w-max">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="w-[300px] shrink-0">
                                    <Card
                                        id={index}
                                        title="Trapping Rainwater"
                                        author={{ firstName: "John", lastName: "Smith", id: 1 }}
                                        description="lorem ipsum dolor sit amet"
                                        tags={[
                                            { name: "hard", color: "#FF0000", id: 1 },
                                            { name: "array", color: "#00FF00", id: 2 },
                                        ]}
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

                {/* Controversial Templates Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Controversial Templates</h2>
                    <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
                        <div className="inline-flex gap-4 pb-4 w-max">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="w-[300px] shrink-0">
                                    <Card
                                        id={index}
                                        title="Trapping Rainwater"
                                        author={{ firstName: "John", lastName: "Smith", id: 1 }}
                                        description="lorem ipsum dolor sit amet"
                                        tags={[
                                            { name: "hard", color: "#FF0000", id: 1 },
                                            { name: "array", color: "#00FF00", id: 2 },
                                        ]}
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