import { useState } from "react";
import ActionButton from "../components/ActionButton";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Link from "next/link";

const WelcomePage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const signUpSwitchToLogin = () => {
        setIsLogin((prev) => !prev);
        setIsSignup((prev) => !prev);
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <div className={`h-full w-[50%] bg-hot_pink-normal ${isLogin || isSignup ? "hidden " : ""}`}/>
            <div className={`mr-0 h-full w-[50%] flex flex-col items-center justify-center ${isLogin || isSignup ? "hidden" : ""}`}>
                <h1 className="text-4xl mb-20">Scriptorium</h1>
                <div className="flex flex-row w-[50%] justify-between">
                    <ActionButton text="Login" onClick={() => setIsLogin((prev) => !prev)}/>
                    <ActionButton text="Sign up" onClick={() => setIsSignup((prev) => !prev)}/>
                </div>
                <div className="mt-10">
                    <Link className="hover:underline" href="/">Continue as Guest</Link>
                </div>
            </div>
            <div className={`h-full w-[50%] flex flex-col items-center justify-center ${isLogin ? "" : "hidden"}`}>
                <div className="w-[45%] mb-10 flex justify-between items-center">
                    <h2 className="text-2xl">Login</h2>
                    <button onClick={() => setIsLogin((prev) => !prev)} className="hover:underline">Back</button>
                </div>
                <div className="w-[50%]">
                    <LoginForm/>
                </div>
            </div>
            <div className={`h-full w-[50%] flex flex-col items-center justify-center ${isSignup ? "" : "hidden"}`}>
                <div className="w-[45%] mb-10 flex justify-between items-center">
                    <h2 className="text-2xl">Sign Up</h2>
                    <button onClick={() => setIsSignup((prev) => !prev)} className="hover:underline">Back</button>
                </div>
                <div className="w-[50%]">
                    <SignupForm onSignup={() => signUpSwitchToLogin()}/>
                </div>
            </div>
            <div className={`h-full w-[50%] bg-hot_pink-normal ${isLogin || isSignup ? "" : "hidden"}`}/>
        </div>
    )
}

export default WelcomePage;