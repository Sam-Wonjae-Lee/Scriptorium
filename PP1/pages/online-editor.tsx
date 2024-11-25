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

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("java", java);

const LANG_EXTENSTION_CONVERTER: Record<string, string> = {Python: "py", Javascript: "js", C: "c", Cpp: "cpp", Java: "java"};
const NON_EMPTY = "Field must not be empty";

interface CursorPosition {
    start: number;
    end: number;
}

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

    const editorRef = useRef(null);
    const lastCursorPosition = useRef<CursorPosition>({ start: 0, end: 0 });

    const verifyLogin = async () : Promise<boolean> => {
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
                return false;
            }
            else {
                sessionStorage.setItem("accessToken", data.accessToken);
            }
        }
        return true;
    }

    const getCursorPosition = (): CursorPosition => {
        const selection = window.getSelection();
        if (!selection?.rangeCount || !editorRef.current) {
            return { start: 0, end: 0 };
        }

        const range = selection.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(editorRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;

        return {
            start,
            end: start + range.toString().length
        };
    };

    const setCursorPosition = (positions: CursorPosition) => {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = window.getSelection();
        const range = document.createRange();

        let currentPos = 0;
        let startNode: Node | null = null;
        let startOffset = 0;
        let endNode: Node | null = null;
        let endOffset = 0;

        const findPosition = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const length = node.textContent?.length || 0;
                
                if (currentPos <= positions.start && currentPos + length >= positions.start) {
                    startNode = node;
                    startOffset = positions.start - currentPos;
                }
                if (currentPos <= positions.end && currentPos + length >= positions.end) {
                    endNode = node;
                    endOffset = positions.end - currentPos;
                }
                currentPos += length;
            } else {
                for (const child of Array.from(node.childNodes)) {
                    findPosition(child);
                }
            }
        };

        findPosition(editor);

        if (startNode && endNode) {
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);
            selection?.removeAllRanges();
            selection?.addRange(range);
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
            outputString += data.compilerWarnings;
        }
        if (data.stderr) {
            outputString += "\n" + data.stderr;
        }
        if (data.stdout) {
            outputString += "\n" + data.stdout;
        }
        setOutput(outputString);
    }

    const handleCodeInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const newCode = target.innerText;
        const currentCursorPos = getCursorPosition();

        setCode(newCode);

        const charAtCursor = newCode[currentCursorPos.start]; 
        console.log(currentCursorPos);
        if (charAtCursor === "\n" || charAtCursor === "\t") {
            lastCursorPosition.current = currentCursorPos;
            return;
        }

        target.innerHTML = hljs.highlight(newCode, { language: activeLanguage.toLowerCase() }).value;

        if (lastCursorPosition.current.start !== 0 || lastCursorPosition.current.end !== 0) {
            setCursorPosition({ start: currentCursorPos.start + 1, end: currentCursorPos.end + 1 });
            lastCursorPosition.current = { start: 0, end: 0 };
        } else {
            setCursorPosition(currentCursorPos);
        }
    };

    const handleStandardInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const newStdin = target.innerText;
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
            console.log(data);
        }
        catch (error) {

        }
        console.log(title);
        console.log(explanation);
        console.log(languageId);
        console.log(selectedTags);
        console.log(code);
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

    useEffect(() => {
        //console.log(code);
    }, [code])

    return (
        <div className="h-screen w-screen bg-background-light dark:bg-element_background-dark flex flex-col">
            <div className="flex justify-between">
                <div className="w-[50%] h-fill flex space-x-4 items-center text-text-light dark:text-text-dark ml-4">
                    <ActionButton text="Home" onClick={handleRedirectHome} size="small" outlineButton={true}/>
                    <ThemeSwitcher/>
                </div>
                <div className="w-[50%] flex justify-between">
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
            <div className="flex h-[50%] w-full justify-between">
                <div className="relative w-[50%] h-full">
                    <div className={`${isLoggedIn ? `` : `opacity-50 pointer-events-none`} w-full h-full p-4 text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal flex flex-col space-y-4`}>
                        <h2 className="ml-2">Template Details</h2>
                        <div className="w-[50%]">
                            <InputField placeholder="Title" value={title} hasError={titleError} errorMessage={NON_EMPTY} onChangeText={(text: string) => {
                                setTitleError(false);
                                setTitle(text)
                            }}/>
                        </div>
                        <textarea placeholder="Explanation" className="text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-background-dark dark:border-background-light p-4 w-full border-2 h-[30%] rounded-xl overflow-y-auto focus:border-hot_pink-normal dark:focus:border-hot_pink-normal outline-none" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <pre className="w-[50%] h-full">
                    <code className="w-full h-full">
                        <div ref={editorRef}
                        contentEditable="true"
                        onInput={handleCodeInput}
                        onPaste={handleCodeInput}
                        spellCheck="false"
                        className="w-full h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal overflow-auto outline-none">
                        </div>
                    </code>
                </pre>
            </div>
            <div className="w-full flex-1">
                <div className="w-full h-[12%] bg-element_background-light dark:bg-background-dark border-b border-hot_pink-darken dark:border-hot_pink-normal flex">
                    <button className="rounded-tr-md border-t-2 border-l-2 border-r-2 border-hot_pink-darken dark:border-hot_pink-normal p-2 w-[10%] text-hot_pink-darken dark:text-hot_pink-normal hover:text-hot_pink-normal hover:border-hot_pink-normal dark:hover:text-hot_pink-darken dark:hover:border-hot_pink-darken" onClick={() => setActiveTab("Console")}>Console</button>
                    <button className="rounded-tr-md border-t-2 border-l-2 border-r-2 border-hot_pink-darken dark:border-hot_pink-normal p-2 w-[10%] text-hot_pink-darken dark:text-hot_pink-normal hover:text-hot_pink-normal hover:border-hot_pink-normal dark:hover:text-hot_pink-darken dark:hover:border-hot_pink-darken" onClick={() => setActiveTab("Input")}>Input</button>
                </div>
                <div className="w-full h-[88%] bg-element_background-light dark:bg-background-dark text-hot_pink-darken dark:text-hot_pink-normal p-8">
                    {activeTab && activeTab == "Console" && (
                        <div className="w-full h-full flex flex-col space-y-2">
                            <h3>Output</h3>
                            <div className="h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal overflow-auto outline-none overflow-x-auto">{output}</div>
                        </div>)}
                    {activeTab && activeTab == "Input" && (
                        <div className="w-full h-full flex flex-col space-y-2">
                            <h3>input.txt</h3>
                            <div contentEditable="true" className="h-full p-4 font-mono text-text-light dark:text-text-dark bg-element_background-light dark:bg-background-dark border rounded border-hot_pink-darken dark:border-hot_pink-normal overflow-auto outline-none" onInput={handleStandardInput}></div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default OnlineEditor;
