"use client";
/* React imports */
import { useState } from "react";

/* Next imports */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Supabase imports */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/* Hooks imports */
import useOutsideClick from "../hooks/useClickOutside";

/* Icons imports */
import { IconChevronDown } from "@tabler/icons-react";

/* Types imports */
import { type MouseEvent } from "react";
import { type Session } from "@supabase/auth-helpers-nextjs";
import { type Database } from "../types/database";

/* Boards type */
type Board = Database["public"]["Tables"]["boards"]["Row"];

export default function NavbarNavigationLinks({
  session,
  boards,
}: {
  session: Session | null;
  boards: Board[] | null;
}) {
  /* Show boards state */
  const [showBoards, setShowBoards] = useState(false);

  /* Router */
  const router = useRouter();

  /* Supabase client */
  const supabase = createClientComponentClient<Database>();

  /* Show boards handler */
  const handleShowBoards = (event: MouseEvent<HTMLButtonElement>) => {
    setShowBoards(!showBoards);

    event.stopPropagation();
  };

  /* Click outside handler */
  const handleClickOutside = () => {
    setShowBoards(false);
  };

  /* Ref for outsideClick */
  const ref = useOutsideClick(handleClickOutside);

  /* Add new board handler */
  const handleNewBoard = async () => {
    try {
      /* Gets the user boards */
      const { data, error } = await supabase
        .from("boards")
        .insert({})
        .select("id");

      /* If there is an error will send it to the catch */
      if (error) {
        throw new Error(error.message);
      }

      /* If there is data and a board will push to the board link */
      if (data?.[0]) {
        router.push(`/dashboard/${data[0].id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return session ? (
    <nav className="hidden items-center gap-x-1 sm:flex">
      {/* Link to dashboard */}
      <Link
        href="/dashboard"
        className="rounded-md px-2 py-1 hover:bg-slate-800"
      >
        <span className="font-medium text-slate-300">Dashboard</span>
      </Link>

      {/* Show boards container */}
      <div ref={ref} className="relative">
        {/* Show boards button */}
        <button
          onClick={handleShowBoards}
          className="flex items-center gap-x-1 rounded-md px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-slate-800"
        >
          <span className="text-slate-300">Boards</span>
          <IconChevronDown className="text-slate-300" />
        </button>

        {/* Boards container */}
        <div
          className={`absolute left-0 top-14 ${
            showBoards ? "flex" : "hidden"
          } max-h-64 w-40 flex-col rounded-md border border-slate-700 bg-slate-800 p-2 transition-colors duration-200 ease-in-out`}
        >
          {/* Boards mapping */}
          {boards?.[0] ? (
            boards.map((board: Board, index: number) => (
              <Link
                key={index}
                href={`/dashboard/${board.id}`}
                className="rounded-md p-2 transition-colors duration-200 ease-in-out hover:bg-slate-700"
              >
                <span className="text-sm font-medium text-slate-300">
                  {board.title}
                </span>
              </Link>
            ))
          ) : (
            <span className="text-sm font-medium text-slate-300">
              No boards to show.
            </span>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="w-1" />

      {/* New board button */}
      <button
        onClick={handleNewBoard}
        className="rounded-md bg-purple-300 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
      >
        <span className="font-medium text-slate-900">New board</span>
      </button>
    </nav>
  ) : null;
}
