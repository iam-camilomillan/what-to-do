import type { Metadata } from "next";
import "./globals.css";

/* Component imports */
import Navbar from "./sections/navbar";
import Footer from "@/app/sections/footer";

/* Font import */
import { Poppins } from "next/font/google";

/* Font declaration */
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

/* Metadata */
export const metadata: Metadata = {
  title: "WhatToDo",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-gradient-to-br from-slate-900 to-slate-950 text-slate-50`}
      >
        {/* Navbar */}
        <Navbar />

        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
