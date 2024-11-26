import React, { useState, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import InputField from "@/components/InputField";
import Card from "@/components/Card";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { Option } from "@/utils/types";
import { Template } from "@/utils/types";
import { useRouter } from "next/router";
import { showAlert } from "@/components/Alert";
import ActionButton from "@/components/ActionButton";

const Templates = () => {
  const router = useRouter();
  const [templateQuery, setTemplateQuery] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);

  // Tags
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [tagQuery, setTagQuery] = useState("");

  // Languages
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [languageQuery, setLanguageQuery] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMoreTemplates, setHasMoreTemplates] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // Delete modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState<number | null>(null);
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
    setTemplates([]);
    setPage(1);
    fetchTemplates(1);
  }, [templateQuery, selectedTags, selectedLanguages]);

  useEffect(() => {
    if (page > 1) {
      fetchTemplates(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreTemplates, isFetching]);

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

  const fetchTemplates = async (currentPage: number) => {
    try {
      setIsFetching(true);
      const query = `/api/code-templates/templates?query=${templateQuery}&page=${currentPage}&tags=${selectedTags
        .map((tag) => tag.id)
        .join(",")}&languages=${selectedLanguages
        .map((language) => language.id)
        .join(",")}`;

      console.log(query);
      const response = await fetch(query, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();

      console.log(data);
      setTemplates((prevTemplates) => {
        const newTemplates = [...prevTemplates, ...data.templates];
        const uniqueTemplates = newTemplates.filter(
          (template, index, self) =>
            index === self.findIndex((b) => b.id === template.id)
        );
        return uniqueTemplates;
      });
      setHasMoreTemplates(
        data.pagination.currentPage < data.pagination.totalPages
      );
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleScroll = () => {
    if (isFetching || !hasMoreTemplates) return;

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
      const response = await fetch(`/api/code-templates/templates/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to delete a code template", "error");
          return;
        }
        showAlert("Error deleting code template", "error");
        return;
      } else {
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template.id !== id)
        );
        showAlert("Code template deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting code template:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setDeleteConfirmation("");
    setDeleteTemplateId(null);
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
            Are you sure you would like to delete this code template?
          </h2>
          <div className="w-10/12 mb-4">
            <InputField
              placeholder="Type CONFIRM to delete this code template"
              value={deleteConfirmation}
              onChangeText={setDeleteConfirmation}
              hasError={deleteConfirmationHasError}
              errorMessage="You must type CONFIRM"
            />
          </div>

          <div className="flex justify-center gap-2">
            <ActionButton
              onClick={() => handleDelete(deleteTemplateId!)}
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
              Code Templates
            </h1>
            {/* Search Templates */}
            <div className="w-full sm:w-72">
              <InputField
                placeholder="Search templates"
                value={templateQuery}
                onChangeText={setTemplateQuery}
              />
            </div>
          </div>
          <h2 className="text-lg mb-4 text-text-light dark:text-text-dark">
            Explore code templates created by the community!
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
          </div>
        </section>
        <section className="w-full">
          {/* Templates section */}
          <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  handleDelete={(id) => {
                    setDeleteTemplateId(id);
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

export default Templates;
