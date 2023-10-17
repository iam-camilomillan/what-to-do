import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { FaCog } from "react-icons/fa";
import Board from "@/app/components/board";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("boards")
    .select("*, lists(*, cards(*))")
    .eq("id", params.id);

  console.log(data);

  return (
    <section className="h-screen px-8 pt-20">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">{}</h3>

        <button>
          <FaCog />
        </button>
      </div>

      <Board lists={data ? data[0].lists : []} />
    </section>
  );
}
