"use client";

import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { AuthGuard } from "@/app/hooks/useAuth";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <main className="w-screen max-w-screen bg-[#ffffffe0] text-gray-100 pb-10 md:pb-0  font-mulish">
        <div className="w-full max-w-screen-xl flex flex-col md:flex-row mx-auto">
          <div className="md:h-screen w-full md:w-1/3 bg-blue-main">
            <Sidebar />
          </div>
          <div className="w-full md:w-2/3 px-5 md:px-10 pt-20 bg-[#ffffffe0] max-h-screen overflow-y-auto md:pb-10 md:scrollbar-hide">
            {children}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default DashboardLayout;
