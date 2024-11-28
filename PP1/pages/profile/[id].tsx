import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";
import { BlogType, Template } from "@/utils/types";
import { showAlert } from "@/components/Alert";
import { verifyLogin, refreshLogin } from "@/components/refresh";

const Profile = () => {
  const router = useRouter();
  const scrollbarHideClass =
    "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";


    const [ownBlogs, setOwnBlogs] = useState<BlogType[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    // Convert template languageId to language name
    const [languages, setLanguages] = useState<{ id: number, name: string }[]>([]);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [signedIn, setIsSignedIn] = useState(false);

    const [fullname, setFullname] = useState<string>("");
  
  // Delete modal
  const [deleteBlogModalIsOpen, setDeleteBlogModalIsOpen] = useState(false);
  const [deleteTemplateModalIsOpen, setDeleteTemplateModalIsOpen] =
    useState(false);
  const [deleteContentId, setDeleteContentId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteConfirmationHasError, setDeleteConfirmationHasError] =
    useState(false);

  const getOwnBlogs = async () => {
    try {
      const response = await fetch("/api/blog-posts?own=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data.blogPosts);
      setOwnBlogs(data.blogPosts);
    } catch (error) {
      console.error("Error getting trending blogs:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`/api/languages`);
      const data = await response.json();
      console.log(data[0].name);
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

//HERE  const getOwnTemplates = async () => {
    try {
      const response = await fetch("/api/code-templates/saved-templates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setTemplates(data.templates);
      console.log(data.templates);
    } catch (error) {
      console.error("Error getting templates:", error);
    }
  };

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [signedIn, setIsSignedIn] = useState(false);
//HERE
    const handleProfileClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    updateAvatar(file);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch("/api/users/verify", {
                method: "GET",
                headers: {
                  authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
              });
              const data = await response.json();
              if (!response.ok) {
                console.log("Error");
              }
              else {
                setFullname(data.result.firstName + " " + data.result.lastName);
              }
        }
        const signIn = async () => {
            if (!(await verifyLogin())) {
                await refreshLogin();
            }
            if (!(await verifyLogin())) {
                router.push("/welcome");
            }
            else {
                getDetails();
                setIsSignedIn(true);
            }
        }
        signIn();
    }, []);
//HERE
  const handleCloseDeleteModal = () => {
    setDeleteBlogModalIsOpen(false);
    setDeleteTemplateModalIsOpen(false);
    setDeleteConfirmation("");
    setDeleteContentId(null);
    setDeleteConfirmationHasError(false);
  };

  const handleDeleteBlog = async (id: number) => {
    setDeleteConfirmationHasError(false);
    if (deleteConfirmation !== "CONFIRM") {
      setDeleteConfirmationHasError(true);
      return;
    }
    handleCloseDeleteModal();

    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const response = await fetch(`/api/blog-posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

//HERE
      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to delete a blog", "error");
          return;
//HERE
        try {
            const response = await fetch(`/api/users/${router.query.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ firstName }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("First name updated:", data);
                sessionStorage.setItem("accessToken", data.accessToken);
                setFullname(data.result.firstName + " " + data.result.lastName);
            } else {
                console.error("Error updating first name:", data);
            }
        } catch (err) {
            console.error("Error updating first name:", err);
//HERE
        }
        showAlert("Error deleting blog", "error");
        return;
      } else {
        setOwnBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        showAlert("Blog deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleDeleteTemplate = async (id: number) => {
    setDeleteConfirmationHasError(false);
    if (deleteConfirmation !== "CONFIRM") {
      setDeleteConfirmationHasError(true);
      return;
    }
    handleCloseDeleteModal();

//HERE
    try {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }

      const response = await fetch(`/api/code-templates/templates/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert("You must be logged in to delete a template", "error");
          return;
 // HERE
        try {
            const response = await fetch(`/api/users/${router.query.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ lastName }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Last name updated:", data);
                sessionStorage.setItem("accessToken", data.accessToken);
                setFullname(data.result.firstName + " " + data.result.lastName);
            } else {
                console.error("Error updating last name:", data);
            }
        } catch (err) {
            console.error("Error updating last name:", err);
//HERE
        }
        showAlert("Error deleting template", "error");
        return;
      } else {
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template.id !== id)
        );
        showAlert("Template deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleProfileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateAvatar(file);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    const signIn = async () => {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }
      if (!(await verifyLogin())) {
        router.push("/welcome");
      } else {
        setIsSignedIn(true);
      }
    };
    signIn();
  }, []);

  useEffect(() => {
    if (signedIn) {
      getOwnBlogs();
      getOwnTemplates();
      fetchLanguages();
    }
  }, [signedIn]);

  useEffect(() => {
    if (router.query.id && signedIn) {
      const fetchUserAvatar = async () => {
        try {
          const response = await fetch(`/api/users/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setAvatarUrl(
              `data:image/png;base64,${Buffer.from(data.avatar).toString(
                "base64"
              )}`
            );
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
  }, [router.query, signedIn]);

  useEffect(() => {
    console.log(avatarUrl);
  }, [avatarUrl]);

  const updateFirstName = async () => {
    if (!router.query.id) {
      console.error("User ID not found.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${router.query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ firstName }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("First name updated:", data);
      } else {
        console.error("Error updating first name:", data);
      }
    } catch (err) {
      console.error("Error updating first name:", err);
    }
  };

  const updateLastName = async () => {
    if (!router.query.id) {
      console.error("User ID not found.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${router.query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Last name updated:", data);
      } else {
        console.error("Error updating last name:", data);
      }
    } catch (err) {
      console.error("Error updating last name:", err);
    }
  };

  const updateAvatar = async (file: File) => {
    if (!router.query.id) {
      console.error("User ID not found.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        // console.log("Base64 Avatar Data:", base64data); // Add logging to confirm the data format

        const response = await fetch(`/api/users/${router.query.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            avatar: base64data,
          }),
        });

        console.log("\nPOKAWPOKDW\n");

        const data = await response.json();

        if (response.ok) {
          console.log("Avatar updated");
          setAvatarUrl(`${reader.result}`);
        } else {
          console.log("POKAPWOKD");
        }
      };
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleEditProfile = async () => {
    try {
      await updateFirstName();
      await updateLastName();
      console.log("Profile updated:", firstName, lastName);
      setShowEditProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getProfileSvg = () => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark">
            <NavBar />

            <div className="flex-grow flex flex-col items-center justify-center space-y-4 mt-16">
                <div>
                    {fullname}
                </div>
                <div className="flex items-center space-x-4">
            
                    <button 
                        className="bg-background-light border-2 border-black w-20 h-20 rounded-full flex items-center justify-center p-2 cursor-pointer"
                        onClick={handleProfileClick}
                    >
                        {avatarUrl ? (
                        <img src={avatarUrl} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        getProfileSvg()
                    )}
                    </button>
                    
                    <button 
                        className="bg-pink-200 w-40 h-10 rounded-full border-none flex items-center justify-center p-2 cursor-pointer text-black"
                        onClick={() => setShowEditProfile(true)}
                    >
                        Edit Profile
                    </button>
                </div>


  const renderDeleteBlogModal = () => {
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
            Are you sure you would like to delete this blog?
          </h2>
          <div className="w-10/12 mb-4">
            <InputField
              placeholder="Type CONFIRM to delete this blog"
              value={deleteConfirmation}
              onChangeText={setDeleteConfirmation}
              hasError={deleteConfirmationHasError}
              errorMessage="You must type CONFIRM"
            />
          </div>

          <div className="flex justify-center gap-2">
            <ActionButton
              onClick={() => handleDeleteBlog(deleteContentId!)}
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

  const renderDeleteTemplateModal = () => {
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
            Are you sure you would like to delete this template?
          </h2>
          <div className="w-10/12 mb-4">
            <InputField
              placeholder="Type CONFIRM to delete this template"
              value={deleteConfirmation}
              onChangeText={setDeleteConfirmation}
              hasError={deleteConfirmationHasError}
              errorMessage="You must type CONFIRM"
            />
          </div>

          <div className="flex justify-center gap-2">
            <ActionButton
              onClick={() => handleDeleteTemplate(deleteContentId!)}
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
    <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark">
      <NavBar />
      {deleteBlogModalIsOpen && renderDeleteBlogModal()}
      {deleteTemplateModalIsOpen && renderDeleteTemplateModal()}
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 mt-16 text-text-light dark:text-text-dark">
        <div className="flex items-center space-x-4">
          <button
            className="bg-background-light border-2 border-black w-20 h-20 rounded-full flex items-center justify-center p-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getProfileSvg()
            )}
          </button>

          <button
            className=" w-40 h-10 rounded-full border-none flex items-center justify-center p-2 cursor-pointer text-black"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Profile Popup */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className=" p-6 rounded-lg w-1/3">
              <h3 className="text-xl mb-4">Edit Profile</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
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

        {/* Own Blogs Section */}
        <section className="w-full p-4 ">
          <h2 className="text-xl font-bold mb-4">Your Blogs</h2>
          <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
            <div className="inline-flex gap-4 pb-4 w-max">
              {ownBlogs?.map((blog) => (
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
                    handleDelete={(id) => {
                      setDeleteContentId(id);
                      setDeleteBlogModalIsOpen(true);
                      setDeleteTemplateModalIsOpen(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full p-4 ">
          <h2 className="text-xl font-bold mb-4">Your Templates</h2>
          <div className={`w-full overflow-x-auto ${scrollbarHideClass}`}>
            <div className="inline-flex gap-4 pb-4 w-max">
              {languages.length > 0 &&
                templates?.map((template) => (
                  <div key={template.id} className="w-[300px] shrink-0">
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
                      owned={true}
                      handleEdit={(id) =>
                        router.push(`/online-editor?templateId=${id}&edit=true`)
                      }
                      handleDelete={(id) => {
                        setDeleteContentId(id);
                        setDeleteTemplateModalIsOpen(true);
                        setDeleteBlogModalIsOpen(false);
                      }}
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
