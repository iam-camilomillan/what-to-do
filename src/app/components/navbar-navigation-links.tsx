"use client";
import Link from "next/link";

/* Supabase imports */
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

/* Utils imports */
import useOutsideClick from "../hooks/useClickOutside";
import { useRouter } from "next/navigation";

export default function NavbarNavigationLinks({
  session,
  boards,
}: {
  session: Session | null;
  boards: any;
}) {
  const [showBoards, setShowBoards] = useState(false);

  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleShowBoards = async (event: any) => {
    setShowBoards(!showBoards);

    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setShowBoards(false);
  };

  const handleNewBoard = async () => {
    try {
      const { data } = await supabase.from("boards").insert({}).select();

      if (data) {
        console.log(data[0].id);

        router.push(`/dashboard/${data[0].id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ref = useOutsideClick(handleClickOutside);

  return session ? (
    <nav className="flex items-center gap-x-1">
      <Link
        href="/dashboard"
        className="rounded-md px-2 py-1 font-medium text-slate-300 hover:bg-slate-800"
      >
        Dashboard
      </Link>

      <div ref={ref} className="relative ">
        <button
          onClick={handleShowBoards}
          className="flex items-center gap-x-1 rounded-md px-2 py-1 text-slate-300 transition-colors duration-200 ease-in-out hover:bg-slate-800"
        >
          <span>Boards</span>
          <span>
            <FaChevronDown />
          </span>
        </button>

        {/* Boards container */}
        <div
          className={`absolute left-0 top-14 ${
            showBoards ? "flex" : "hidden"
          } flex-col rounded-md border border-slate-700 bg-slate-800 p-2 transition-colors duration-200 ease-in-out`}
        >
          {boards.map((board: any) => (
            <Link
              href={`/dashboard/${board.id}`}
              className="rounded-md p-2 font-medium text-slate-300 transition-colors duration-200 ease-in-out hover:bg-slate-700"
            >
              {board.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="w-1" />

      {/* New board button */}
      <button
        onClick={handleNewBoard}
        className="rounded-md bg-purple-300  px-2 py-1 font-medium text-slate-950 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
      >
        New board
      </button>
    </nav>
  ) : null;
}
