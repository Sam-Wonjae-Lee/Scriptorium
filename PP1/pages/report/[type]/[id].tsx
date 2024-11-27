import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { refreshLogin, verifyLogin } from "@/components/refresh";
import { showAlert } from "@/components/Alert";
import MarkdownRenderer from "@/components/MarkdownFormatter";
import ActionButton from "@/components/ActionButton";
import { BlogType, Comment } from "@/utils/types";

interface Report {
  id: number;
  explanation: string;
  report: { message: string };
  user: { id: Number; firstName: string; lastName: string; avatar: string };
}

const Report = () => {
  const router = useRouter();
  const { type, id } = router.query as { type: string; id: string };
  const [pageNotFound, setPageNotFound] = useState(false);
  const reportTypes = ["blog", "comment"];
  const [reports, setReports] = useState<Report[] | null>(null);
  const [isContentFlagged, setIsContentFlagged] = useState(false);

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [comment, setComment] = useState<Comment | null>(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!reportTypes.includes(type)) {
      setPageNotFound(true);
      return;
    }
  }, [type]);

  useEffect(() => {
    if (!router.isReady) return;
    setPage(1);
    setReports([]);
    fetchReport(1);
    fetchContent();
  }, [id, type]);

  useEffect(() => {
    if (page > 1) {
      fetchReport(page);
    }
  }, [page]);

  const render404 = () => {
    return (
      <div className="w-full text-text-light dark:text-text-dark mt-10 flex flex-col gap-2 items-center justify-center">
        <div className="text-3xl font-bold">404</div>
        <div className="text-2xl">Report not found</div>
      </div>
    );
  };

  const fetchContent = async () => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }
      if (type === "blog") {
        const result = await fetch(`/api/blog-posts/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });

        if (result.status !== 200) {
          showAlert("Error fetching blog post.", "error");
          return;
        }
        const data = await result.json();
        setBlog(data);

        getIsContentFlagged(type as "blog" | "comment", Number(id));
      } else {
        const result = await fetch(`/api/comments/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });

        if (result.status !== 200) {
          showAlert("Error fetching comment.", "error");
          return;
        }
        const data = await result.json();
        setComment(data);
        getIsContentFlagged(type as "blog" | "comment", Number(id));
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const fetchReport = async (currentPage: number) => {
    try {
      setIsFetching(true);
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/reports/${type}/${id}?page=${currentPage}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (result.status === 404) {
        setPageNotFound(true);
        return;
      } else if (result.status === 401) {
        showAlert("You are not authorized to view this report.", "error");
      }
      const data = await result.json();
      if (type === "blog") {
        setReports((prevReports) => {
          const newReports = [...(prevReports || []), ...data.blogReports];
          const uniqueReports = newReports.filter(
            (report, index, self) =>
              index === self.findIndex((r) => r.id === report.id)
          );
          return uniqueReports;
        });
      } else {
        setReports((prevReports) => {
          const newReports = [...(prevReports || []), ...data.commentReports];
          const uniqueReports = newReports.filter(
            (report, index, self) =>
              index === self.findIndex((r) => r.id === report.id)
          );
          return uniqueReports;
        });
      }
      setHasMoreContent(
        data.pagination.currentPage < data.pagination.totalPages
      );
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLoading = () => {
    return (
      <div className="w-full text-text-light dark:text-text-dark mt-10 flex flex-col gap-2 items-center justify-center">
        <div className="text-3xl font-bold">Loading...</div>
      </div>
    );
  };

  const getIsContentFlagged = async (type: "blog" | "comment", id: number) => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(`/api/content-monitoring/flag/${type}/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      const data = await result.json();

      if (result.status === 200) {
        setIsContentFlagged(data);
      } else if (result.status === 404) {
        setIsContentFlagged(false);
      } else {
        showAlert("Error fetching flag status.", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFlagBlog = async (blogId: number) => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/flag/blog/${blogId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status === 401) {
        showAlert("You are not authorized to flag this blog.", "error");
      } else if (result.status !== 200) {
        showAlert("Error flagging blog.", "error");
      } else {
        showAlert("Blog has been flagged.", "success");
        setIsContentFlagged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnflagBlog = async (blogId: number) => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/flag/blog/${blogId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status === 401) {
        showAlert("You are not authorized to unflag this blog.", "error");
      } else if (result.status !== 200) {
        showAlert("Error unflagging blog.", "error");
      } else {
        showAlert("Blog has been unflagged.", "success");
        setIsContentFlagged(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFlagComment = async (commentId: number) => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/flag/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status === 401) {
        showAlert("You are not authorized to flag this comment.", "error");
      } else if (result.status !== 200) {
        showAlert("Error flagging comment.", "error");
      } else {
        showAlert("Comment has been flagged.", "success");
        setIsContentFlagged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnflagComment = async (commentId: number) => {
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const result = await fetch(
        `/api/content-monitoring/flag/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status === 401) {
        showAlert("You are not authorized to unflag this comment.", "error");
      } else if (result.status !== 200) {
        showAlert("Error unflagging comment.", "error");
      } else {
        showAlert("Comment has been unflagged.", "success");
        setIsContentFlagged(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderBlogReport = () => {
    if (!blog) return;
    return (
      <div className="text-text-light dark:text-text-dark">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <ActionButton
            text={isContentFlagged ? "Unflag" : "Flag"}
            onClick={() =>
              isContentFlagged
                ? handleUnflagBlog(blog.id)
                : handleFlagBlog(blog.id)
            }
            secondaryButton
          />
        </div>
        <div className="text-text-light dark:text-text-dark mt-4">
          <MarkdownRenderer content={blog.content} />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Reports</h2>
          {renderReports()}
        </div>
      </div>
    );
  };

  const renderCommentReport = () => {
    if (!comment) return;
    return (
      <div className="text-text-light dark:text-text-dark">
        <div className="flex items-center justify-between">
          <div>
            <div
              className="font-bold cursor-pointer hover:underline"
              onClick={() => router.push(`/profile/${comment.user.id}`)}
            >
              {comment.user.firstName} {comment.user.lastName}
            </div>
            <div
              className="text-sm cursor-pointer hover:underline"
              onClick={() => router.push(`/blogs/${comment.blogId}`)}
            >
              {comment.content}
            </div>
          </div>
          <ActionButton
            text={isContentFlagged ? "Unflag" : "Flag"}
            onClick={() =>
              isContentFlagged
                ? handleUnflagComment(comment.id)
                : handleFlagComment(comment.id)
            }
            secondaryButton
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Reports</h2>
          {renderReports()}
        </div>
      </div>
    );
  };

  const renderReports = () => {
    return (
      <div>
        {reports ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="mb-4 p-4 border rounded text-text-light dark:text-text-dark"
            >
              <div className="flex items-center mb-2">
                <div>
                  <div className="font-bold">
                    {report.user.firstName} {report.user.lastName}
                  </div>
                  <div className="text-sm ">{report.explanation}</div>
                </div>
              </div>
              <div className="">{report.report.message}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-text-light dark:text-text-dark">
            No reports found.
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="mt-4 min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark box-border">
      <NavBar />
      <section className="w-full sm:w-11/12 md:w-900 py-10 px-4 sm:px-6 md:px-0">
        {blog
          ? renderBlogReport()
          : comment
          ? renderCommentReport()
          : pageNotFound
          ? render404()
          : renderLoading()}
      </section>
    </main>
  );
};

export default Report;
