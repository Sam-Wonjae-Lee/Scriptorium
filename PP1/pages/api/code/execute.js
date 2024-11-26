import { exec } from 'child_process';
import { promises as fs} from 'fs';
import { verifyJWT } from '@/utils/auth';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const LANGUAGES = ["py", "cpp", "c", "java", "js", "php", "R", "rb", "cs", "rs"]
// 10 seconds
const PROGRAM_TIMEOUT = 10000;
// 10 MB
const MEMORY_LIMIT = 100000;

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.code || !req.body.language) {
            console.log(req.body);
            return res.status(400).json({"message": "Invalid fields"});
        }
        if (!LANGUAGES.includes(req.body.language)) {
            return res.status(400).json({"message": "Provide a valid language"});
        }
        try {
            const result = verifyJWT(req);
            const identifier = result ? result.id : uuidv4();
            const { stdout, stderr, compilerWarnings, timeout } = await executeCode(req, identifier);
            if (timeout) {
                return res.status(400).json({"message": "Time limit exceeded"});
            }
            return res.status(200).json({stdout, stderr, compilerWarnings});
        }
        catch (error) {
            console.log(error);
            res.status(500).json({"message": "failed to run program"});
        }
    } 
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

async function executeCode(req, identifier) {
    let executableArgs;
    let execProgram = "";
    let compilerWarnings = "";
    let stdout = "";
    let stderr = "";
    let timeout = false;
    console.log(identifier);
    
    await fs.mkdir(`./client_files/${identifier}`);
    const srcPath = `./client_files/${identifier}/${identifier}.${req.body.language}`;
    if (req.body.language == "py") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "python3";
    }
    else if (req.body.language == "php") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "php";
    }
    else if (req.body.language == "R") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "Rscript";
    }
    else if (req.body.language == "rb") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "ruby";
    }
    else if (req.body.language == "cs") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "dotnet script";
    }
    else if (req.body.language == "js") {
        await fs.writeFile(srcPath, req.body.code);
        executableArgs = srcPath;
        execProgram = "node";
    }
    else if (req.body.language == "cpp") {
        await fs.writeFile(srcPath, req.body.code);
        const compileCommand = `g++ -std=c++11 ${srcPath} -o ./client_files/${identifier}/${identifier}`
        try {
            const res = await execPromise(compileCommand, {timeout: PROGRAM_TIMEOUT});
            if (res.stderr) {
                const isCriticalError = res.stderr.toLowerCase().includes("error");
                if (isCriticalError) {
                    await fs.rm(`./client_files/${identifier}`, { recursive: true })
                    return {
                        stdout,
                        stderr,
                        compilerWarnings: res.stderr,
                        timeout
                    }
                }
            }
            compilerWarnings = res.stderr;
            executableArgs = `./client_files/${identifier}/${identifier}`;
        }
        catch (error) {
            await fs.rm(`./client_files/${identifier}`, { recursive: true })
            return {
                stdout: error.stdout,
                stderr: error.stderr,
                compilerWarnings,
                timeout
            }
        }
    }
    else if (req.body.language == "rs") {
        await fs.writeFile(srcPath, req.body.code);
        const compileCommand = `rustc ${srcPath} -o ./client_files/${identifier}/${identifier}`
        try {
            const res = await execPromise(compileCommand, {timeout: PROGRAM_TIMEOUT});
            if (res.stderr) {
                const isCriticalError = res.stderr.toLowerCase().includes("error");
                if (isCriticalError) {
                    await fs.rm(`./client_files/${identifier}`, { recursive: true })
                    return {
                        stdout,
                        stderr,
                        compilerWarnings: res.stderr,
                        timeout
                    }
                }
            }
            compilerWarnings = res.stderr;
            executableArgs = `./client_files/${identifier}/${identifier}`;
        }
        catch (error) {
            await fs.rm(`./client_files/${identifier}`, { recursive: true })
            return {
                stdout: error.stdout,
                stderr: error.stderr,
                compilerWarnings,
                timeout
            }
        }
    }
    else if (req.body.language == "c") {
        await fs.writeFile(srcPath, req.body.code);
        const compileCommand = `gcc -Wall ${srcPath} -o ./client_files/${identifier}/${identifier}`
        try {
            const res = await execPromise(compileCommand, {timeout: PROGRAM_TIMEOUT});
            if (res.stderr) {
                const isCriticalError = res.stderr.toLowerCase().includes("error");
                if (isCriticalError) {
                    await fs.rm(`./client_files/${identifier}`, { recursive: true })
                    return {
                        stdout,
                        stderr,
                        compilerWarnings: res.stderr,
                        timeout
                    }
                }
            }
            compilerWarnings = res.stderr;
            executableArgs = `./client_files/${identifier}/${identifier}`;
        }
        catch (error) {
            await fs.rm(`./client_files/${identifier}`, { recursive: true })
            return {
                stdout: error.stdout,
                stderr: error.stderr,
                compilerWarnings,
                timeout
            }
        }
    }
    else if (req.body.language == "java") {
        await fs.writeFile(srcPath, req.body.code);
        const compileCommand = `javac ${srcPath}`
        try {
            const res = await execPromise(compileCommand, {timeout: PROGRAM_TIMEOUT});
            if (res.stderr) {
                const isCriticalError = res.stderr.toLowerCase().includes("error");
                if (isCriticalError) {
                    await fs.rm(`./client_files/${identifier}`, { recursive: true })
                    return {
                        stdout,
                        stderr,
                        compilerWarnings: res.stderr,
                        timeout
                    }
                }
            }
            compilerWarnings = res.stderr;
            executableArgs = `-cp ./client_files/${identifier} ${srcPath}`;
            execProgram = "java";
        }
        catch (error) {
            await fs.rm(`./client_files/${identifier}`, { recursive: true })
            return {
                stdout: error.stdout,
                stderr: error.stderr,
                compilerWarnings,
                timeout
            }
        }
    }

    let stdinPath;
    if (req.body.stdin) {
        stdinPath = `./client_files/${identifier}/${identifier}.txt`;
        await fs.writeFile(stdinPath, req.body.stdin);
    }

    // UNCOMMENT WHEN TESTING ON LINUX
    // const memoryCommand = `ulimit -v ${MEMORY_LIMIT}`;
    // await execPromise(memoryCommand);

    const command = `${execProgram} ${executableArgs}` + (req.body.stdin ? ` < ${stdinPath}` : ``);
    console.log("Running command: " + command);
    try {
        const result = await execPromise(command, {timeout: PROGRAM_TIMEOUT});
        stdout = result.stdout;
        stderr = result.stderr;
    }
    catch (error) {
        stderr = error.stderr;
        stdout = error.stdout;
        if (error.signal == "SIGTERM") {
            timeout = true;
        }
    }
    finally {
        await fs.rm(`./client_files/${identifier}`, { recursive: true })
    }
    return {
        stdout,
        stderr,
        compilerWarnings,
        timeout
    }
}