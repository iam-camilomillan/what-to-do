import "./globals.css";
import type { Metadata } from "next";

/* Component imports */
import Navbar from "@/app/sections/navbar";
import Footer from "@/app/sections/footer";

/* Font import */
import { Poppins } from "next/font/google";

/* Font declaration */
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

/* Metadata declaration */
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
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
