import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import NavBar from "@/components/NavBar";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: { id: number; firstName: string; lastName: string };
    tags: { id: number; name: string; color: string }[];
    numUpvotes: number;
    numDownvotes: number;
  }

const Profile = () => {


    
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background-light dark:bg-background-dark">
            <NavBar />
        </div>
    );
};

export default Profile;