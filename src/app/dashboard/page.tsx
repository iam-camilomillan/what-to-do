/* Next imports */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Page() {
  /* Supabase client */
  const supabase = createServerComponentClient({ cookies });

  /* Gets the user session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* If there is no session redirects to home */
  if (!session) {
    redirect("/");
  }

  return <main>Dashboard</main>;
}
