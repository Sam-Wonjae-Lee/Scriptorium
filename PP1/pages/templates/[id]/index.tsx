import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MarkdownFormatter from "@/components/MarkdownFormatter";
import { Template } from "@/utils/types";
import { showAlert } from "@/components/Alert";
import { getForkIcon } from "@/utils/svg";
import NavBar from "@/components/NavBar";

const TemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [template, setTemplate] = useState<Template | null>(null);
  const [templateExists, setTemplateExists] = useState(true);

  const fetchTemplate = async () => {
    try {
      if (isNaN(Number(id))) {
        setTemplateExists(false);
        return;
      }

      const response = await fetch(`/api/code-templates/templates/${id}`);
      const data = await response.json();
      if (!response.ok) {
        if (response.status == 404) {
          setTemplateExists(false);
          return;
        }
        showAlert("Error fetching code template", "error");
        return;
      }
      setTemplate(data);
    } catch (error) {
      console.error("Error fetching code template:", error);
    }
  };

  const render404 = () => {
    return (
      <div className="w-full text-text-light dark:text-text-dark mt-10 flex flex-col gap-2 items-center justify-center">
        <div className="text-3xl font-bold">404</div>
        <div className="text-2xl">Code template not found</div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className="text-text-light dark:text-text-dark mt-10">
        Loading...
      </div>
    );
  };

  const renderTemplate = (template: Template) => {
    return (
      <div className="text-text-light dark:text-text-dark">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-3xl font-bold">{template.title}</h1>
          <div
            className="h-8 px-3 py-6 cursor-pointer flex items-center gap-2 border border-text-light dark:border-text-dark hover:border-hot_pink-normal hover:dark:border-hot_pink-normal rounded-full mt-4 md:mt-0"
            onClick={() => router.push(`/online-editor?templateId=${id}`)}
          >
            <div className="h-8 w-8">{getForkIcon()}</div>
            <p>Fork this template</p>
          </div>
        </div>
        <div className="mb-4">
          <p
            className="text-md cursor-pointer hover:underline mb-4 inline"
            onClick={() => {
              router.push(`/profile/${template.author.id}`);
            }}
          >
            By {template.author.firstName} {template.author.lastName}{" "}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 rounded-lg text-sm select-none"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Templates */}
        <div className="flex flex-wrap gap-2 mt-2 pb-4 mb-2 border-b border-text-light dark:border-text-dark">
          <h2>Blogs that mention this template</h2>
          {template.Blogs.map((blog) => (
            <span
              key={blog.id}
              className="bg-element_background-light dark:bg-element_background-dark px-2 py-1 rounded-lg text-sm select-none cursor-pointer hover:"
              onClick={() => {
                router.push(`/blogs/${blog.id}`);
              }}
            >
              {blog.title}
            </span>
          ))}
        </div>
        {template.language.name === "C++" ? (
          <MarkdownFormatter
            content={`\`\`\`${"cpp"}\n${template.code}\n\`\`\``}
          />
        ) : (
          <MarkdownFormatter
            content={`\`\`\`${template.language.name.toLowerCase()}\n${
              template.code
            }\n\`\`\``}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      fetchTemplate();
    }
  }, [id]);

  return (
    <main className="mt-4 min-h-screen relative w-full flex flex-col items-center bg-background-light dark:bg-background-dark box-border p-3">
      <NavBar />
      <section className="w-full sm:w-11/12 md:w-900 py-10">
        {template
          ? renderTemplate(template)
          : templateExists
          ? renderLoading()
          : render404()}
      </section>
    </main>
  );
};

export default TemplatePage;
