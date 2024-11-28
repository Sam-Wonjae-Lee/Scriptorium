import { useState } from "react";
import ActionButton from "../components/ActionButton";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const WelcomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const signUpSwitchToLogin = () => {
    setIsLogin((prev) => !prev);
    setIsSignup((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <div className="absolute">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
      <div
        className={`h-full flex-1 bg-hot_pink-normal ${
          isLogin || isSignup ? "hidden" : ""
        }`}
      />
      <div
        className={`h-full flex-1 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark ${
          isLogin || isSignup ? "hidden" : ""
        }`}
      >
        <h1 className="text-4xl mb-20 text-text-light dark:text-text-dark">
          Scriptorium
        </h1>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-[50%] justify-between">
          <ActionButton text="Login" onClick={() => setIsLogin((prev) => !prev)} />
          <ActionButton text="Sign up" onClick={() => setIsSignup((prev) => !prev)} />
        </div>
        <div className="mt-10">
          <Link
            className="hover:underline text-text-light dark:text-text-dark"
            href="/home"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
      <div
        className={`h-full flex-1 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark ${
          isLogin ? "" : "hidden"
        }`}
      >
        <div className="w-[45%] mb-10 flex justify-between items-center">
          <h2 className="text-2xl text-text-light dark:text-text-dark">Login</h2>
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="hover:underline text-text-light dark:text-text-dark"
          >
            Back
          </button>
        </div>
        <div className="w-[50%]">
          <LoginForm />
        </div>
      </div>
      <div
        className={`h-full flex-1 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark ${
          isSignup ? "" : "hidden"
        }`}
      >
        <div className="w-[45%] mb-10 flex justify-between items-center">
          <h2 className="text-2xl text-text-light dark:text-text-dark">Sign Up</h2>
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="hover:underline text-text-light dark:text-text-dark"
          >
            Back
          </button>
        </div>
        <div className="w-[50%]">
          <SignupForm onSignup={() => signUpSwitchToLogin()} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;