import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Option } from "@/utils/types";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import ActionButton from "@/components/ActionButton";
import InputField from "@/components/InputField";
import Dropdown from "@/components/Dropdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { showAlert } from "@/components/Alert";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import rust from 'highlight.js/lib/languages/rust';
import ruby from 'highlight.js/lib/languages/ruby';
import r from 'highlight.js/lib/languages/r';
import php from 'highlight.js/lib/languages/php';
import csharp from 'highlight.js/lib/languages/csharp';

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("r", r);
hljs.registerLanguage("php", php);
hljs.registerLanguage("csharp", csharp);

const LANG_EXTENSTION_CONVERTER: Record<string, string> = {Python: "py", JavaScript: "js", C: "c", Cpp: "cpp", Java: "java", Php: "php", R: "R", Rust: "rs", "CSharp": "cs", Ruby: "rb" };
const NON_EMPTY = "Field must not be empty";

interface Language {
    name: string;
    id: number;
}

const OnlineEditor = () => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [tags, setTags] = useState<Option[]>([]);
    const [selectedTags, setSelectedTags] = useState<Option[]>([]);
    const [tagQuery, setTagQuery] = useState("");

    const [title, setTitle] = useState<string>("");
    const [titleError, setTitleError] = useState<boolean>(false);
    const [explanation, setExplanation] = useState<string>("");

    const [languages, setLanguages] = useState<Language[]>([]);
    const [activeLanguage, setActiveLanguage] = useState<string>("");

    const [code, setCode] = useState("");
    const [stdin, setStdin] = useState("");

    const [output, setOutput] = useState("");
    const [codeRunning, setCodeRunning] = useState(false);

    const [activeTab, setActiveTab] = useState("Console");

    const editorRef = useRef<HTMLPreElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const verifyLogin = async () : Promise<boolean> => {
        const response = await fetch("/api/users/verify", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}
        })
        if (!response.ok) {
            const refreshResponse = await fetch("/api/users/refresh", {
                method: "GET"
            })
            const data = await refreshResponse.json();
            if (!refreshResponse.ok) {
                return false;
            }
            else {
                sessionStorage.setItem("accessToken", data.accessToken);
            }
        }
        return true;
    }

    const syncScroll = () => {
        if (textareaRef.current && editorRef.current) {
            editorRef.current.scrollTop = textareaRef.current.scrollTop;
            editorRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const fetchLanguages = async () => {
        try {
            const response = await fetch(`/api/languages`);
            const data = await response.json();
            setLanguages(data);
            console.log(data);
            setActiveLanguage(data[0].name);
        } 
        catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch(`/api/tags`);
            const data = await response.json();
            console.log(data);
            setTags(data);
        }
        catch (error) {
            console.error("Error fetching tags:", error);
        }
    }

    const runCode = async () => {
        const ext = LANG_EXTENSTION_CONVERTER[activeLanguage];
        console.log(ext)
        setCodeRunning(true);
        const response = await fetch(`/api/code/execute`, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: ext,
                code,
                stdin
            }),
        })
        const data = await response.json();
        setCodeRunning(false);
        let outputString = "";
        if (!response.ok) {
            setOutput(data.message);
            return;
        }
        if (data.compilerWarnings) {
            outputString += data.compilerWarnings + "\n";
        }
        if (data.stderr) {
            outputString += data.stderr + "\n";
        }
        if (data.stdout) {
            outputString += data.stdout + "\n";
        }
        setOutput(outputString);
        console.log(outputString);
    }

    const handleCodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        const newCode = target.value;
        setCode(newCode);
        if (editorRef.current) {
            editorRef.current.innerHTML = hljs.highlight(newCode, { language: activeLanguage.toLowerCase() }).value;
        }
    };

    const handleStandardInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        const newStdin = target.value;
        setStdin(newStdin);
    }

    const handleSaveTemplate = async () => {
        if (!verifyLogin) {
            showAlert("Please login again", "error");
            return;
        }
        const languageId = Object.entries(languages).find(([key, val]) => val.name === activeLanguage)?.[1].id || null;
        try {
            const response = await fetch(`/api/code-templates/templates`, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    title,
                    explanation,
                    code,
                    languageId,
                    tagIds: selectedTags.map((tag) => tag.id)
                })
            })

            const data = await response.json();
            if (response.ok) {
                showAlert("Template saved succesfully", "success");
            }
            else {
                showAlert("Template could not be saved", "error");
            }
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleRedirectHome = () => {
        router.push("\home");
    }
    
    useEffect(() => {
        fetchLanguages();
        fetchTags();
        const verifyLoginWrapper = async () => {
            const result = await verifyLogin();
            if (result) {
                setIsLoggedIn(true);
            }
        }
        verifyLoginWrapper();
    }, [])

    return (
        <div className="h-screen w-screen bg-background-light dark:bg-element_background-dark flex flex-col overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="w-[50%] h-fill flex space-x-4 items-center text-text-light dark:text-text-dark md:ml-4">
                    <ActionButton text="Home" onClick={handleRedirectHome} size="small" outlineButton={true}/>
                    <ThemeSwitcher/>
                </div>
                <div className="w-[50%] flex flex-col md:flex-row justify-between">
                    <div className="flex items-center space-x-4 text-hot_pink-darken dark:text-hot_pink-normal">
                        <h3>Choose Language</h3>
                        <Dropdown options={languages.map((lang) => lang.name)} selectedOption={activeLanguage} setSelectedOption={setActiveLanguage} text=""/>
                    </div>
                    <div className="flex items-center space-x-4 text-hot_pink-darken dark:text-hot_pink-normal">
                        {codeRunning && <div className="w-10 h-10 border-4 border-t-transparent border-hot_pink-normal rounded-full animate-spin"></div>}
                        <h3>Run</h3>
                        <button className="p-2 bg-element_background-light dark:bg-background-dark group" onClick={runCode}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-6 h-6 group-hover:fill-green-500 transition-colors duration-200"
                            >
                                <path d="M5 3v18l15-9L5 3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full flex-col md:flex-row md:h-[50%]">
                <div className="relative w-full h-[50%] md:h-full md:w-[50%] text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal overflow-y-auto">
                    <div className={`${isLoggedIn ? `` : `opacity-50 pointer-events-none`} w-full h-full p-4 flex flex-col space-y-4`}>
                        <h2 className="ml-2">Template Details</h2>
                        <div className="w-[50%]">
                            <InputField placeholder="Title" value={title} hasError={titleError} errorMessage={NON_EMPTY} onChangeText={(text: string) => {
                                setTitleError(false);
                                setTitle(text)
                            }}/>
                        </div>
                        <textarea placeholder="Explanation" className="text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-background-dark dark:border-background-light p-4 w-full border-2 h-[40%] rounded-xl overflow-y-auto focus:border-hot_pink-normal dark:focus:border-hot_pink-normal outline-none" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setExplanation(e.target.value);
                        }}>
                        </textarea>
                        <MultiSelectDropdown
                            placeholder="Select tags"
                            searchPlaceholder="Search tags"
                            options={tags}
                            selectedOptions={selectedTags}
                            setSelectedOptions={setSelectedTags}
                            query={tagQuery}
                            onQueryChange={setTagQuery}
                        />
                        <ActionButton text="Save Template" onClick={handleSaveTemplate} size="large" outlineButton={true}/>
                    </div>
                    {!isLoggedIn && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
                        <p className="text-hot_pink-darken font-bold text-xl">Saving is available only for users</p>
                        </div>
                    )}
                </div>
                <div className="relative w-full h-[50%] md:h-full md:w-[50%]">
                    <pre ref={editorRef} className="absolute top-0 left-0 w-full h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark overflow-auto pointer-events-none border rounded border-hot_pink-darken dark:border-hot_pink-normal"></pre>
                    <textarea ref={textareaRef} value={code} onChange={handleCodeInput} onScroll={syncScroll} spellCheck="false" className="absolute top-0 left-0 w-full h-full p-4 font-mono text-transparent caret-text-light dark:caret-text-dark bg-transparent border-transparent focus:border-transparent focus:ring-0 resize-none overflow-auto"></textarea>
                </div>
            </div>
            <div className="w-full h-full md:flex-1">
                <div className="w-full h-[12%] bg-element_background-light dark:bg-background-dark border-b border-hot_pink-darken dark:border-hot_pink-normal flex">
                    <button className="rounded-tr-md border-t-2 border-l-2 border-r-2 border-hot_pink-darken dark:border-hot_pink-normal p-2 w-[20%] md:w-[10%] text-hot_pink-darken dark:text-hot_pink-normal hover:text-hot_pink-normal hover:border-hot_pink-normal dark:hover:text-hot_pink-darken dark:hover:border-hot_pink-darken" onClick={() => setActiveTab("Console")}>Console</button>
                    <button className="rounded-tr-md border-t-2 border-l-2 border-r-2 border-hot_pink-darken dark:border-hot_pink-normal p-2 w-[20%] md:w-[10%] text-hot_pink-darken dark:text-hot_pink-normal hover:text-hot_pink-normal hover:border-hot_pink-normal dark:hover:text-hot_pink-darken dark:hover:border-hot_pink-darken" onClick={() => setActiveTab("Input")}>Input</button>
                </div>
                <div className="w-full h-[88%] bg-element_background-light dark:bg-background-dark text-hot_pink-darken dark:text-hot_pink-normal p-8 overflow-hidden">
                    {activeTab && activeTab == "Console" && (
                        <div className="w-full h-full flex flex-col space-y-2">
                            <h3>Output</h3>
                            <textarea readOnly value={output} className="h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal focus:border-hot_pink-darken dark:focus:border-hot_pink-normal focus:ring-0"></textarea>
                        </div>)}
                    {activeTab && activeTab == "Input" && (
                        <div className="w-full h-full flex flex-col space-y-2">
                            <h3>input.txt</h3>
                            <textarea className="h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark overflow-auto border rounded border-hot_pink-darken dark:border-hot_pink-normal focus:border-hot_pink-darken dark:focus:border-hot_pink-normal focus:ring-0" onChange={handleStandardInput} value={stdin}></textarea>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default OnlineEditor;
