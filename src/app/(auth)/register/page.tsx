import Navbar from "@/components/nav";
import React from "react";
import SignUp from "../components/signup/signup";

function page() {
  return (
    <main className="h-screen min-h-screen max-h-screen bg-[#fffffff3]">
      <Navbar />
      <SignUp />
    </main>
  );
}

export default page;
