import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";

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

const Profile = () => {
    const scrollbarHideClass = "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

    const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    // Convert template languageId to language name
    const [languages, setLanguages] = useState<{[key: number]: string}>({});

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
        getTemplates();
    }, []);

    const [showEditProfile, setShowEditProfile] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleEditProfile = () => {
        console.log("Profile updated:", firstName, lastName);
        setShowEditProfile(false);
    };

    const getProfileSvg = () => {
        return (
          <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.4493 31.2999L27.4498 25.7504C27.4501 22.6851 24.9652 20.1999 21.8998 20.1999H7.10092C4.03598 20.1999 1.55126 22.6844 1.55092 25.7493L1.55029 31.2999M20.0503 7.24995C20.0503 10.3151 17.5655 12.7999 14.5003 12.7999C11.4351 12.7999 8.95029 10.3151 8.95029 7.24995C8.95029 4.18477 11.4351 1.69995 14.5003 1.69995C17.5655 1.69995 20.0503 4.18477 20.0503 7.24995Z" 
              stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      };
    
    return (
        <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark">
            <NavBar />

            <div className="flex-grow flex flex-col items-center justify-center space-y-4 mt-16">
                <div className="flex items-center space-x-4">
            
                    <button 
                        className="bg-background-light border-2 border-black w-20 h-20 rounded-full border-none flex items-center justify-center p-2 cursor-pointer"
                    >
                        {getProfileSvg()}
                    </button>
                    <button 
                        className="bg-pink-200 w-40 h-10 rounded-full border-none flex items-center justify-center p-2 cursor-pointer text-black"
                        onClick={() => setShowEditProfile(true)}
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Edit Profile Popup */}
                {showEditProfile && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-pink-200 p-6 rounded-lg w-1/3">
                            <h3 className="text-xl mb-4">Edit Profile</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input 
                                    type="text" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input 
                                    type="text" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button 
                                    onClick={() => setShowEditProfile(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleEditProfile}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Trending Blogs Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Your Blogs</h2>
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

                {/* Templates Section */}
                <section className="w-full p-4 bg-pink-200">
                    <h2 className="text-xl font-bold mb-4">Your Templates</h2>
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

export default Profile;