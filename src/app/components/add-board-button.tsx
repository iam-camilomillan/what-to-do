"use client";
/* Next imports */
import { useRouter } from "next/navigation";

/* Supabase imports */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/* Types imports */
import { type Database } from "../types/database";

export default function AddBoardButton() {
  /* Router */
  const router = useRouter();

  /* Supabase client */
  const supabase = createClientComponentClient<Database>();

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

  return (
    <button
      onClick={handleNewBoard}
      className="rounded-md bg-purple-300 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
    >
      <span className="font-medium text-slate-900">New board</span>
    </button>
  );
}
