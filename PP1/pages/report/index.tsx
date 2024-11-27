import { showAlert } from "@/components/Alert";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { refreshLogin, verifyLogin } from "@/components/refresh";
import ReportCard from "@/components/ReportCard";
import { use, useEffect, useState } from "react";

interface BlogReport {
  id: number;
  title: string;
  author: { firstName: string; lastName: string; id: number };
  numReports: number;
}

interface CommentReport {
  id: number;
  blogId: number;
  content: string;
  user: { firstName: string; lastName: string; id: number };
  numReports: number;
}

const Reports = () => {
  const [filterType, setFilterType] = useState<"blog" | "comment">("blog");
  const [blogs, setBlogs] = useState<BlogReport[]>([]);
  const [comments, setComments] = useState<CommentReport[]>([]);
  const [reportQuery, setReportQuery] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setBlogs([]);
    setComments([]);
    setPage(1);
    fetchReports(1);
  }, [filterType]);

  useEffect(() => {
    setBlogs([]);
    setComments([]);
    setPage(1);
    fetchReports(1);
  }, [reportQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchReports(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreContent, isFetching]);

  const handleScroll = () => {
    if (isFetching || !hasMoreContent) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchReports = async (currentPage: number) => {
    try {
      setIsFetching(true);
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/reports/${filterType}?query=${reportQuery}&page=${currentPage}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status == 401 || result.status == 403) {
        showAlert("You are not authorized to view this page.", "error");
      } else if (result.status == 200) {
        const data = await result.json();
        if (filterType === "blog") {
          setBlogs((prevBlogs) => {
            const newBlogs = [...prevBlogs, ...data.blogs];
            const uniqueBlogs = newBlogs.filter(
              (blog, index, self) =>
                index === self.findIndex((b) => b.id === blog.id)
            );
            return uniqueBlogs;
          });
        } else {
          setComments((prevComments) => {
            const newComments = [...prevComments, ...data.comments];
            const uniqueComments = newComments.filter(
              (comment, index, self) =>
                index === self.findIndex((c) => c.id === comment.id)
            );
            return uniqueComments;
          });
        }
        setHasMoreContent(
          data.pagination.currentPage < data.pagination.totalPages
        );
      } else {
        showAlert("An error occurred while fetching reports.", "error");
      }
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBlogReports = () => {
    if (!blogs) return;
    return blogs.map((blog) => (
      <div key={blog.id}>
        <ReportCard
          contentType={"blog"}
          contentId={blog.id}
          author={blog.author}
          content={blog.title}
          numReports={blog.numReports}
        />
      </div>
    ));
  };

  const renderCommentReports = () => {
    if (!comments) return;
    return comments.map((comment) => (
      <div key={comment.id}>
        <ReportCard
          contentType={"comment"}
          contentId={comment.id}
          author={comment.user}
          content={comment.content}
          numReports={comment.numReports}
          blogId={comment.blogId}
        />
      </div>
    ));
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark p-4">
      <NavBar />

      {/* Blogs & Comments Filter Dropdown */}
      <div className="mt-8 mb-6 flex items-center justify-between gap-4">
        <Dropdown
          options={["blog", "comment"]}
          selectedOption={filterType}
          setSelectedOption={(option: string) =>
            setFilterType(option as "blog" | "comment")
          }
          text="Filter by:"
        />

        <div className="w-96">
          <InputField
            placeholder="Search reports"
            value={reportQuery}
            onChangeText={setReportQuery}
          />
        </div>
      </div>

      {/* Hardcoded reported cards */}
      <div className="space-y-4">
        {filterType === "blog" ? renderBlogReports() : renderCommentReports()}
      </div>
    </div>
  );
};

export default Reports;
