/* Next imports */
import { cookies } from "next/headers";

/* Components imports */
import Board from "@/app/components/board";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/* Icons imports */
import { IconSettings } from "@tabler/icons-react";

/* Types imports */
import { type Database } from "@/app/types/database";

export default async function Page({ params }: { params: { id: string } }) {
  /* Supabase client */
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("boards")
    .select("*, lists(*, cards(*))")
    .eq("id", params.id);

  if (data?.[0]?.title) {
    await supabase
      .from("boards")
      .update({ opened_at: new Date().toISOString() })
      .eq("id", data?.[0]?.id);
  }

  return (
    <section className="h-screen px-8 pt-20">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">{data?.[0]?.title}</h3>

        <button>
          <IconSettings />
        </button>
      </div>

      <Board data={data?.[0]?.lists ?? []} />
    </section>
  );
}
