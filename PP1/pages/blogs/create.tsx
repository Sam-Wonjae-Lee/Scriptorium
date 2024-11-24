import MarkdownRenderer from "@/components/MarkdownFormatter";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { useState, useRef, useEffect } from "react";
import InputField from "@/components/InputField";
import ActionButton from "@/components/ActionButton";
import { Option } from "@/utils/types";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { showAlert } from "@/components/Alert";
import { getInfoIcon } from "@/utils/svg";
import { useRouter } from "next/router";

const CreateBlog = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"markdown" | "preview">(
    "markdown"
  );
  const [helpModalIsOpen, setHelpModalIsOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [titleHasError, setTitleHasError] = useState<boolean>(false);
  const titleError = "Title cannot be empty";

  const [markdown, setMarkdown] = useState<string>("");
  // Tags
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [tagQuery, setTagQuery] = useState("");

  // Templates
  const [selectedTemplates, setSelectedTemplates] = useState<Option[]>([]);
  const [templates, setTemplates] = useState<Option[]>([]);
  const [templateQuery, setTemplateQuery] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTabSwitch = (tab: "markdown" | "preview") => {
    setActiveTab(tab);
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags?query=${tagQuery}`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `/api/code-templates/templates?query=${templateQuery}`
      );
      const data = await response.json();
      const transformedTemplates = data.templates.map((template: any) => ({
        ...template,
        name: template.title,
      }));
      console.log(transformedTemplates);
      setTemplates(transformedTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleCreateBlog = async () => {
    setTitleHasError(false);
    if (!title) {
      setTitleHasError(true);
      return;
    }

    const tagIds = selectedTags.map((tag) => tag.id);
    const templateIds = selectedTemplates.map((template) => template.id);
    try {
      const response = await fetch("/api/blog-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          title,
          content: markdown,
          tagIds,
          templateIds,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to create a blog", "error");
          return;
        }
        showAlert("Error creating blog", "error");
        return;
      }
      showAlert("Blog created successfully", "success");
      const data = await response.json();
      router.push(`/blogs/${data.id}`);
    } catch (error) {
      console.error("Error creating blog:", error);
      showAlert("Error creating blog", "error");
    }
  };

  useEffect(() => {
    fetchTags();
  }, [tagQuery]);

  useEffect(() => {
    fetchTemplates();
  }, [templateQuery]);

  const renderHelpModal = () => {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          helpModalIsOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setHelpModalIsOpen(false)}
        ></div>
        <div className="bg-background-light dark:bg-background-dark rounded-lg p-6 z-10 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Help
          </h2>
          <p className="text-text-light dark:text-text-dark mb-4">
            Here you can find some useful information about how to write your
            blog using Markdown.
          </p>
          <ul className="list-disc list-inside text-text-light dark:text-text-dark mb-4">
            <li>
              Use <code>#</code>, <code>##</code>, and <code>###</code> for
              headings
            </li>
            <li>
              Use <code>```language print('hello world')```</code> or{" "}
              <code>`inline code`</code> for code blocks
            </li>
            <li>
              Use <code>**bold**</code>, <code>*italic*</code> or{" "}
              <code>***both***</code> for text formatting
            </li>
            <li>
              Use <code>__underline__</code> for underlined text
            </li>
            <li>
              Use <code>[link text](url)</code> for links
            </li>
          </ul>
          <div className="flex justify-end">
            <ActionButton
              text="Close"
              onClick={() => setHelpModalIsOpen(false)}
              size="small"
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
      {renderHelpModal()}
      <div className="max-w-3xl mx-auto p-4 w-900">
        <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">
          Create Blog
        </h1>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl mb-4 text-text-light dark:text-text-dark">
            Name your blog
          </h2>
          <InputField
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            hasError={titleHasError}
            errorMessage={titleError}
          />
        </div>

        {/* Tags */}
        <div className="flex gap-5">
          <div className="w-80">
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
          <div className="w-80">
            <MultiSelectDropdown
              placeholder="Select templates"
              searchPlaceholder="Search templates"
              options={templates}
              selectedOptions={selectedTemplates}
              setSelectedOptions={setSelectedTemplates}
              query={templateQuery}
              onQueryChange={setTemplateQuery}
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl  text-text-light dark:text-text-dark">
            Write your blog
          </h2>
          <div
            className="w-5 h-5 cursor-pointer"
            onClick={() => setHelpModalIsOpen(true)}
          >
            {getInfoIcon()}
          </div>
        </div>
        <div className="flex mb-4 border-b border-text-light dark:border-text-dark">
          <button
            className={`flex-1 py-2 rounded-t-22 text-center text-sm font-medium ${
              activeTab === "markdown"
                ? "text-white bg-hot_pink-normal"
                : "text-text-light dark:text-text-dark hover:text-hot_pink-normal dark:hover:text-hot_pink-normal"
            }`}
            onClick={() => handleTabSwitch("markdown")}
          >
            Markdown
          </button>
          <button
            className={`flex-1 py-2 rounded-t-22 text-center text-sm font-medium ${
              activeTab === "preview"
                ? "text-white bg-hot_pink-normal"
                : "text-text-light dark:text-text-dark hover:text-hot_pink-normal dark:hover:text-hot_pink-normal"
            }`}
            onClick={() => handleTabSwitch("preview")}
          >
            Preview
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "markdown" ? (
          <div className="flex border border-text-light dark:border-text-dark rounded-lg overflow-hidden">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
              className="flex-1 p-2 resize-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-hot_pink-normal bg-background_secondary-light dark:bg-background_secondary-dark text-text-light dark:text-text-dark"
              style={{ lineHeight: "1.5" }}
              rows={20}
              cols={80}
              placeholder="Write your markdown here..."
            />
          </div>
        ) : (
          <div className="text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded-lg p-4 bg-background_secondary-light dark:bg-background_secondary-dark">
            <MarkdownRenderer content={markdown} />
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ActionButton text="Create Blog" onClick={handleCreateBlog} />
        </div>
      </div>
    </main>
  );
};

export default CreateBlog;