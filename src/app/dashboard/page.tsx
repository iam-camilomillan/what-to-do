import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import BoardCard from "../components/board-card";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("boards")
    .select()
    .order("opened_at", { ascending: false });

  if (!session) {
    redirect("/");
  }

  console.log(data);

  return (
    <main className="flex min-h-screen w-full flex-col px-8 pt-24">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Welcome Camilo</h2>
      </div>

      <div>
        <h3>Recent boards</h3>

        <div className="grid w-full grid-cols-4 gap-x-4 gap-y-2">
          {data?.map((board) => <BoardCard data={board} />)}
        </div>

        <h3>All boards</h3>

        <div className="grid w-full grid-cols-4 gap-x-4 gap-y-2">
          {data?.map((board) => <BoardCard data={board} />)}
        </div>
      </div>
    </main>
  );
}
