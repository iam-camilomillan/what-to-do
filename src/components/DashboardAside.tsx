"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { FaHome, FaPlus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const DashboardAside = () => {
  const [boards, setBoards] = useState<any[] | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("boards").select();

      if (error != null) {
        return console.log(error);
      }

      setBoards(data);
    };

    getData();
  }, []);

  return (
    <aside className="py-4">
      <div className="flex h-full flex-col gap-y-2 border-r border-slate-600 px-4">
        {/* Dashboard home button */}
        <Link
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 p-2 text-lg font-bold transition-opacity duration-200 ease-in-out hover:opacity-80"
        >
          <FaHome />
        </Link>

        {/* Separator */}
        <div className="h-px w-full bg-slate-600" />

        {/* Boards */}
        {boards != null ? (
          boards.map((board) => (
            <Link
              key={board.id}
              href={`/dashboard/${board.id}`}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 p-2 font-bold transition-opacity duration-200 ease-in-out hover:opacity-80"
            >
              {board.title[0]}
            </Link>
          ))
        ) : (
          <div className="flex h-10 w-10 items-center justify-center">
            <ClipLoader
              color={"#d8b4fe"}
              loading={true}
              size={24}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        {/* Add board */}
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800 p-2 text-lg font-bold transition-opacity duration-200 ease-in-out hover:opacity-80">
          <FaPlus />
        </button>
      </div>
    </aside>
  );
};

export default DashboardAside;
