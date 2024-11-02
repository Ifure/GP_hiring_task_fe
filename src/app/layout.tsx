"use client";

import { ToastContainer } from "react-toastify";
import { ContextProvider } from "@/contexts/ContextProvider";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "./hooks/useAuth";
import { TitleContextProvider } from "@/contexts/TitleContextProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ContextProvider>
            <TitleContextProvider>{children}</TitleContextProvider>
          </ContextProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
