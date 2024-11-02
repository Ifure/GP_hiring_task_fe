import Navbar from "@/components/nav";
import React from "react";
import LoginForm from "../components/login/Login";

function page() {
  return (
    <div className="h-screen min-h-screen max-h-screen bg-blue-main">
      <Navbar />
      <LoginForm />
    </div>
  );
}

export default page;
