import { useState } from "react";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import { isValidEmail, isPasswordSecure, isValidPhone } from "../utils/validation";

const EMAIL_ERR_MSG : string = "Invalid Email Format";
const USER_EXISTS_MSG : string = "User Already Exists";
const PASS_ERR_MSG : string = "Choose a more secure password";
const PASS_NOTEQUAL_MSG : string = "Passwords do not match";
const FIELD_EMPTY_MSG : string = "Field is empty";
const PHONE_ERR_MSG : string = "Phone number is invalid";
const BACKEND_ERR : string = "User creation failed"

interface SignupFormProps {
    onSignup: Function
}

const SignupForm : React.FC<SignupFormProps> = ({ onSignup }) => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("")

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const [rePassword, setRePassword] = useState("");
    const [rePasswordError, setRePasswordError] = useState(false);
    const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState("");

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("");

    const [globalError, setGlobalError] = useState("");

    const handleSignupClick = async () => {
        if (firstName.length < 1) {
            setFirstNameError(true);
            setFirstNameErrorMsg(FIELD_EMPTY_MSG);
            return;
        }
        if (lastName.length < 1) {
            setLastNameError(true);
            setLastNameErrorMsg(FIELD_EMPTY_MSG);
            return;
        }
        if (!isValidEmail(email)) {
            setEmailError(true);
            setEmailErrorMsg(EMAIL_ERR_MSG);
            return;
        }
        if (!isValidPhone(phone)) {
            setPhoneError(true);
            setPhoneErrorMsg(PHONE_ERR_MSG);
            return;
        }
        if (!isPasswordSecure(password)) {
            setPasswordError(true);
            setPasswordErrorMsg(PASS_ERR_MSG);
            return;
        }
        if (password != rePassword) {
            setPasswordError(true);
            setRePasswordError(true);
            setPasswordErrorMsg(PASS_NOTEQUAL_MSG);
            setRePasswordErrorMsg(PASS_NOTEQUAL_MSG);
            return;
        }
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password, phone})
        })
        const data = await response.json();
        if (!response.ok && data.emailError) {
            setEmailError(true);
            setEmailErrorMsg(USER_EXISTS_MSG);
            console.log(data);
        }
        else if (!response.ok) {
            setGlobalError(BACKEND_ERR);
            console.log(data);
        }
        else {
            onSignup();
        }
    }

    return (
        <div className="w-full space-y-8 text-black md:text-white">
            <div className={`${globalError ? "" : "hidden"} rounded-full text-red-500 bg-background-light h-10 flex items-center justify-center`}>
                <p>{globalError}</p>
            </div>
            <InputField placeholder="First Name" value={firstName} hasError={firstNameError} errorMessage={firstNameErrorMsg} onChangeText={(text: string) => {
                setFirstNameError(false);
                setFirstName(text)
            }}/>
            <InputField placeholder="Last Name" value={lastName} hasError={lastNameError} errorMessage={lastNameErrorMsg} onChangeText={(text: string) => {
                setLastNameError(false);
                setLastName(text)
            }}/>
            <InputField placeholder="Email" value={email} hasError={emailError} errorMessage={emailErrorMsg} onChangeText={(text: string) => {
                setEmailError(false);
                setEmail(text)
            }}/>
            <InputField placeholder="Phone Number" value={phone} hasError={phoneError} errorMessage={phoneErrorMsg} onChangeText={(text: string) => {
                setPhoneError(false);
                setPhone(text)
            }}/>
            <InputField placeholder="Password" value={password} hasError={passwordError} errorMessage={passwordErrorMsg} onChangeText={(text: string) => {
                setPasswordError(false)
                setRePasswordError(false)
                setPassword(text)
            }} secureTextEntry/>
            <InputField placeholder="Password Again" value={rePassword} hasError={rePasswordError} errorMessage={rePasswordErrorMsg} onChangeText={(text: string) => {
                setPasswordError(false)
                setRePasswordError(false)
                setRePassword(text)
            }} secureTextEntry/>
            <ActionButton text="Sign Up" onClick={() => handleSignupClick()}/>
        </div>
    )
}

export default SignupForm;