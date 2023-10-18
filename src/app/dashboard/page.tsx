/* Next imports */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* Components imports */
import BoardCard from "../components/board-card";
import AddBoardButton from "../components/add-board-button";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/* Types imports */
import { type Database } from "../types/database";

export default async function Page() {
  /* Supabase client */
  const supabase = createServerComponentClient<Database>({ cookies });

  /* Gets the user session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* If there is no session redirect to home */
  if (!session) {
    redirect("/");
  }

  /* Gets 5 most recent boards */
  const recentBoards = await supabase
    .from("boards")
    .select()
    .limit(5)
    .order("opened_at", { ascending: false })
    .then((data) => data.data);

  /*  Gets all the boards */
  const allBoards = await supabase
    .from("boards")
    .select()
    .order("title", { ascending: true })
    .then((data) => data.data);

  return (
    <main className="flex min-h-screen w-full flex-col px-8 pt-24">
      {/* Title and board options container */}
      <div className="flex justify-between">
        {/* Title */}
        <h2 className="text-2xl font-medium">Welcome Camilo</h2>
      </div>

      {/* Separator */}
      <div className="h-8" />

      <div>
        {/* Recent boards title */}
        <h3 className="text-lg font-medium">Recent boards</h3>

        {/* Separator */}
        <div className="h-4" />

        {/* Recent boards container */}
        <div className="xs:grid-cols-2 grid w-full gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {recentBoards?.map((board, index) => (
            <BoardCard key={index} data={board} />
          ))}
        </div>

        {/* Separator */}
        <div className="h-8" />

        {/* All boards title */}
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg font-medium">All boards</h3>

          <AddBoardButton />
        </div>

        {/* Separator */}
        <div className="h-4" />

        {/* All boards container */}
        <div className="xs:grid-cols-2 grid w-full gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allBoards?.map((board, index) => (
            <BoardCard key={index} data={board} />
          ))}
        </div>
      </div>
    </main>
  );
}
