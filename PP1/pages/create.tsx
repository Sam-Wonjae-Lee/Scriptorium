import { showAlert } from "@/components/Alert";
import ActionButton from "@/components/ActionButton";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";

const Create = () => {

    const router = useRouter();

    const handleOnlineEditorClick = () => {
        router.push("/online-editor");
    }

    const handleBlogCreateClick = async () => {
        const response = await fetch("http://localhost:3000/api/users/verify", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}
        })
        if (!response.ok) {
            const refreshResponse = await fetch("http://localhost:3000/api/users/refresh", {
                method: "GET"
            })
            const data = await refreshResponse.json();
            if (!refreshResponse.ok) {
                showAlert("Visitors cannot create blogs", "error")
                return;
            }
            else {
                sessionStorage.setItem("accessToken", data.accessToken);
            }
        }
        console.log(`Success: ${sessionStorage.getItem("accessToken")}`);
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center bg-background-light dark:bg-background-dark">
            <NavBar />
            <div className="flex h-full w-full">
                <div className="text-black dark:text-text-dark h-full w-[50%] flex flex-col space-y-4 items-center justify-center">
                    <h3>Online Editor</h3>
                    <ActionButton text="Enter" onClick={() => handleOnlineEditorClick()}/>
                </div>
                <div className="h-full w-[50%] border-l-2 border-l-element_background-dark flex flex-col space-y-4 items-center justify-center">
                    <h3>Create Blog</h3>
                    <ActionButton text="Enter" onClick={() => handleBlogCreateClick()}/>
                </div>
            </div>
        </div>
    )

};

export default Create;