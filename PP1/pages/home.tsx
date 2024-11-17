import { useRouter } from "next/router";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";


const Home = () => {
    
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background-light dark:bg-background-dark">
            <NavBar />
            <div className="flex flex-col items-center gap-4 mt-8">

            </div>
        </div>
    )
};

export default Home;