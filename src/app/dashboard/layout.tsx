import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* Components imports */
import DashboardAside from "@/components/DashboardAside";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/");
    }
  };

  getSession();

  return (
    <section className="flex h-screen pt-16">
      <DashboardAside />

      {children}
    </section>
  );
}
