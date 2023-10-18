import Link from "next/link";
import { cookies } from "next/headers";

/* Component imports */
import Logo from "@/app/components/logo";
import NavbarNavigationLinks from "@/app/components/navbar-navigation-links";
import NavbarAuthButtons from "@/app/components/navbar-auth-buttons";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/* Types imports */
import { type Database } from "../types/database";

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  /* Gets the user session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* Gets the user boards */
  const { data } = await supabase.from("boards").select();

  return (
    <header className="absolute w-full border-b border-slate-700 px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <Logo />
        </Link>

        {/* Separator */}
        <div className="w-8" />

        {/* Navigation buttons */}
        <NavbarNavigationLinks session={session} boards={data} />

        {/* Separator */}
        <div className="flex-grow" />

        {/* Auth buttons */}
        <NavbarAuthButtons session={session} />
      </div>
    </header>
  );
}
