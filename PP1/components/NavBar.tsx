import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { showAlert } from "./Alert";
import { BlogType, Option, Template } from "@/utils/types";
import { refreshLogin, verifyLogin } from "./refresh";

interface Content {
  id: number;
  title: string;
  tags: Option[];
  language?: { id: number; name: string };
}

const NavBar = () => {
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.id) {
        const fetchUserAvatar = async () => {
            try {
                const response = await fetch(`/api/users/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setAvatarUrl(`data:image/png;base64,${Buffer.from(data.avatar).toString('base64')}`);
                } else {
                    console.error("Failed to fetch user avatar:", data);
                }
            } catch (error) {
                console.error("Error fetching user avatar:", error);
            }
        };
        console.log("HERE\n");
        fetchUserAvatar();
    }
}, [router.query]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [contentType, setContentType] = useState("templates");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const typeDropdownRef = useRef(null);

  const [tags, setTags] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  const [languages, setLanguages] = useState<Option[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);

  const [content, setContent] = useState<Content[]>([]);

  const [showProfileDropdown, setProfileShowDropdown] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const checkIsAdmin = async () => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch("/api/users/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!result.ok) {
        showAlert("Error checking admin status", "error");
        return;
      }

      const data = await result.json();

      setIsAdmin(data.result.role === "ADMIN");
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const fetchContent = async (currentPage: number) => {
    try {
      setIsFetching(true);
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      if (contentType === "templates") {
        const response = await fetch(
          `/api/code-templates/saved-templates?query=${searchQuery}&languages=${selectedLanguages
            .map((lang) => lang.id)
            .join(",")}&tags=${selectedTags
            .map((tag) => tag.id)
            .join(",")}&page=${currentPage}`,
          {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          showAlert("Error fetching content", "error");
          return;
        }

        const data = await response.json();
        if (data.templates) {
          setContent((prevContent) => {
            const newContent = [...prevContent, ...data.templates];
            const uniqueContent = newContent.filter(
              (content, index, self) =>
                index === self.findIndex((c) => c.id === content.id)
            );
            return uniqueContent;
          });
        }
        setHasMoreContent(
          data.pagination.currentPage < data.pagination.totalPages
        );
      } else {
        const response = await fetch(
          `/api/blog-posts?own=true&query=${searchQuery}&tags=${selectedTags
            .map((tag) => tag.id)
            .join(",")}&languages=${selectedLanguages
            .map((lang) => lang.id)
            .join(",")}&
            page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          showAlert("Error fetching content", "error");
          return;
        }

        const data = await response.json();
        if (data.blogPosts) {
          setContent((prevContent) => {
            const newContent = [...prevContent, ...data.blogPosts];
            const uniqueContent = newContent.filter(
              (content, index, self) =>
                index === self.findIndex((c) => c.id === content.id)
            );
            return uniqueContent;
          });
          setHasMoreContent(
            data.pagination.currentPage < data.pagination.totalPages
          );
        }
      }

      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleProfile = async () => {
    const response = await fetch("/api/users/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const data1 = await response.json();
    if (!response.ok) {
      const refreshResponse = await fetch("/api/users/refresh", {
        method: "GET",
      });
      const data = await refreshResponse.json();
      if (!refreshResponse.ok) {
        showAlert("Please sign in", "error");
        return;
      } else {
        sessionStorage.setItem("accessToken", data.accessToken);
        const response2 = await fetch("/api/users/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        const data2 = await response2.json();
        router.push(`/profile/${data2.result.id}`);
        return;
      }
    }
    router.push(`/profile/${data1.result.id}`);
    return;
  };

  useEffect(() => {
    fetchTags();
    fetchLanguages();
    setCurrentPage(1);
    setContent([]);
    fetchContent(1);
    checkIsAdmin();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !(searchRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        typeDropdownRef.current &&
        !(typeDropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    fetchTags();
    fetchLanguages();
    setCurrentPage(1);
    setContent([]);
    fetchContent(1);
  }, [searchQuery, selectedTags, contentType, selectedLanguages]);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const getProfileSvg = () => {
    return (
      <svg
        width="29"
        height="33"
        viewBox="0 0 29 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.4493 31.2999L27.4498 25.7504C27.4501 22.6851 24.9652 20.1999 21.8998 20.1999H7.10092C4.03598 20.1999 1.55126 22.6844 1.55092 25.7493L1.55029 31.2999M20.0503 7.24995C20.0503 10.3151 17.5655 12.7999 14.5003 12.7999C11.4351 12.7999 8.95029 10.3151 8.95029 7.24995C8.95029 4.18477 11.4351 1.69995 14.5003 1.69995C17.5655 1.69995 20.0503 4.18477 20.0503 7.24995Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getSearchSvg = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-light dark:text-text-dark"
      >
        <path
          d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      // This pretty much only exists for c++
      const response = await fetch(`/api/languages`);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const getDropDownSvg = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-light dark:text-text-dark"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderContent = () => {
    return (
      <div className="max-h-96 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {content.map((item) => (
          <div
            key={`content-${item.id}`}
            onClick={() => router.push(`/${contentType}/${item.id}`)}
            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          >
            <h3 className="text-sm font-medium">
              {item.title}
              {item.language && (
                <span className="text-sm font-medium">
                  {" - "}
                  {item.language.name}
                </span>
              )}
            </h3>

            <div className="flex flex-wrap gap-1 mt-1">
              {item.tags.map((tag) => (
                <span
                  key={`content-tag-${tag.id}`}
                  className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        {content.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            No {contentType} found
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mb-8">
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between h-14 px-2 sm:px-4 bg-light_pink-darken border-b z-10">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
            onClick={toggleSideBar}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isSideBarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="ml-4 flex items-center">
            <span
              className="text-base sm:text-sm md:text-base lg:text-xl font-bold text-black-600 cursor-pointer"
              onClick={() => router.push("/home")}
            >
              Scriptorium
            </span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4 relative" ref={searchRef}>
          <div className="flex">
            <button
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className="px-1 sm:px-2 py-1 sm:py-2 border-l-0 border rounded-l-full bg-element_background-light dark:bg-element_background-dark hover:bg-hover-light dark:hover:bg-hover-dark flex items-center gap-2"
            >
              <span className="text-text-light dark:text-text-dark capitalize">
                {contentType}
              </span>
              {getDropDownSvg()}
            </button>

            <div className="flex flex-1 items-center border px-1 sm:px-2 bg-element_background-light dark:bg-element_background-dark">
              <input
                type="text"
                placeholder={`Search ${contentType}...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full p-1 sm:p-2 bg-transparent outline-none ml-2 text-text-light dark:text-text-dark"
              />
            </div>

            <button className="px-2 sm:px-4 border-l-0 border rounded-r-full bg-element_background-light dark:bg-element_background-dark">
              {getSearchSvg()}
            </button>
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="absolute mt-1 w-full text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark rounded-lg shadow-lg border border-gray-200 z-40">
              {/* Tags Filter */}
              <div className="p-2 border-b dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={`selected-tag-${tag.id}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-hot_pink-darken text-hot_pink-normal dark:text-blue-200"
                    >
                      <span className="mr-1">#</span>
                      {tag.name}
                      <button
                        onClick={() =>
                          setSelectedTags((tags) =>
                            tags.filter((t) => t !== tag)
                          )
                        }
                        className="ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] overflow-x-auto gap-1 mt-1">
                  {tags
                    .filter((tag: Option) => !selectedTags.includes(tag))
                    .map((tag: Option) => (
                      <button
                        key={`tag-btn-${tag.id}`}
                        onClick={() =>
                          setSelectedTags((tags) => [...tags, tag])
                        }
                        className="px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600 hover:border-hot_pink-normal hover:text-hot_pink-normal dark:hover:text-hot_pink-normal whitespace-nowrap"
                      >
                        {tag.name}
                      </button>
                    ))}
                </div>

                <div className="my-2 border-t border-gray-300 dark:border-gray-600"></div>
                {/* Languages Filter */}

                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((language) => (
                    <span
                      key={`selected-tag-${language.id}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-hot_pink-darken text-hot_pink-normal dark:text-blue-200"
                    >
                      <span className="mr-1">#</span>
                      {language.name}
                      <button
                        onClick={() =>
                          setSelectedLanguages((languages) =>
                            languages.filter((l) => l !== language)
                          )
                        }
                        className="ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] overflow-x-auto gap-1 mt-1">
                  {languages
                    .filter(
                      (language: Option) => !selectedTags.includes(language)
                    )
                    .map((language: Option) => (
                      <button
                        key={`language-btn-${language.id}`}
                        onClick={() =>
                          setSelectedLanguages((languages) => [
                            ...languages,
                            language,
                          ])
                        }
                        className="px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600 hover:border-hot_pink-normal hover:text-hot_pink-normal dark:hover:text-hot_pink-normal whitespace-nowrap"
                      >
                        {language.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Results List */}
              {renderContent()}
            </div>
          )}

          {/* Type Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute mt-1 w-48 text-text-light dark:text-text-dark bg-white dark:bg-element_background-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <button
                onClick={() => {
                  setContentType("templates");
                  setIsTypeDropdownOpen(false);
                  setSelectedTags([]);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-lg"
              >
                Templates
              </button>
              <button
                onClick={() => {
                  setContentType("blogs");
                  setIsTypeDropdownOpen(false);
                  setSelectedTags([]);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-b-lg"
              >
                Blogs
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 relative">
          <ThemeSwitcher />
          <button
            className="bg-background-light w-12 h-12 rounded-full border-none flex items-center justify-center p-2 cursor-pointer"
            onClick={() => setProfileShowDropdown(!showProfileDropdown)}
          >
            {avatarUrl ? (
                        <img src={avatarUrl} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        getProfileSvg()
                    )}
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-element_background-dark rounded-md shadow-lg py-1 z-50">
              <div
                className="block px-4 py-2 text-sm text-text-light dark:text-text-dark"
                onClick={handleProfile}
              >
                Profile
              </div>
              {isAdmin && (
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    router.push("/report");
                  }}
                >
                  Reports
                </div>
              )}

              <button
                onClick={() => {
                  sessionStorage.clear();
                  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  router.push("/welcome");
                  setProfileShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark cursor-pointer"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Side Bar */}
      {isSideBarOpen && (
        <div className="fixed left-0 top-14 h-full w-64 bg-element_background-light dark:bg-element_background-dark dark:text-text-dark shadow-lg z-20">
          <div className="p-4">
            <div
              onClick={() => router.push("/home")}
              className="flex items-center px-4 py-3 hover:bg-light_pink-darken cursor-pointer"
            >
              <svg
                className="h-6 w-6 mr-3 text-text-light dark:text-text-dark"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </div>
            <div
              onClick={() => router.push("/templates")}
              className="flex items-center px-4 py-3 hover:bg-light_pink-darken cursor-pointer"
            >
              <svg
                className="h-6 w-6 mr-3 text-text-light dark:text-text-dark"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Templates
            </div>
            <div
              onClick={() => router.push("/blogs")}
              className="flex items-center px-4 py-3 hover:bg-light_pink-darken cursor-pointer"
            >
              <svg
                className="h-6 w-6 mr-3 text-text-light dark:text-text-dark"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Blogs
            </div>
            <div
              className="flex items-center px-4 py-3 hover:bg-light_pink-darken cursor-pointer"
              onClick={() => {
                router.push("/create");
              }}
            >
              <svg
                className="h-6 w-6 mr-3 text-text-light dark:text-text-dark"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
