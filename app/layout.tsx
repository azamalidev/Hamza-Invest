'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // ✅ check spelling (was Navbra before)
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const router = typeof window !== "undefined" ? require("next/navigation").useRouter() : null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const publicRoutes = ["/login", "/signup"];
      // Always redirect new users (no token) to /login
      if (!token && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
        window.location.href = "/login";
      }
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Navbar at top */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 ">{children}</main>

        {/* Footer at bottom */}
        <Footer />
      </body>
    </html>
  );
}
