import { useState } from "react";
import { useRouter } from "next/router";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import { isValidEmail } from "../utils/validation";

const EMAIL_ERR_MSG : string = "Invalid Email Format";
const USER_NOTEXISTS_MSG : string = "User Not Found";
const PASS_ERR_MSG : string = "Invalid Password";

const LoginForm = () => {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("")

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleLoginClick = async () => {
        if (!isValidEmail(email)) {
            setEmailError(true);
            setEmailErrorMsg(EMAIL_ERR_MSG);
            return;
        }
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json();
        if (!response.ok && data.passwordError) {
            setPasswordError(true);
            console.log(data);
        }
        if (!response.ok && data.emailError) {
            setEmailError(true);
            setEmailErrorMsg(USER_NOTEXISTS_MSG);
            console.log(data);
        }
        else if (!response.ok) {
            console.log(data);
        }
        else {
            sessionStorage.setItem('accessToken', data.accessToken);
            // timeout for cookies to go in browser 
            setTimeout(() => router.push("/home"), 100); 
        }
    }

    return (
        <div className="w-full space-y-8">
            <InputField placeholder="Email" value={email} hasError={emailError} errorMessage={emailErrorMsg} onChangeText={(text: string) => {
                setEmailError(false);
                setEmail(text)
            }}/>
            <InputField placeholder="Password" value={password} hasError={passwordError} errorMessage={PASS_ERR_MSG} onChangeText={(text: string) => {
                setPasswordError(false)
                setPassword(text)
            }} secureTextEntry/>
            <ActionButton text="Login" onClick={() => handleLoginClick()}/>
        </div>
    )
}

export default LoginForm;