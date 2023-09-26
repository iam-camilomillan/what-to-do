"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Component imports */
import Logo from "@/components/Logo";

/* Supabase imports */
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const supabase = createClientComponentClient();
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return console.log(error);
      }

      setSession(data.session);
    };

    getSession();
  }, []);

  return (
    <header className="absolute w-full border-b border-slate-600 px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center">
        <Link href="/" className="text-xl font-bold">
          <Logo />
        </Link>

        <div className="flex-grow" />

        {session ? (
          <button
            onClick={handleSignOut}
            className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 duration-200 ease-in-out hover:opacity-80"
          >
            Sign out
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-md px-2 py-1 font-medium duration-200 ease-in-out hover:opacity-80"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 duration-200 ease-in-out hover:opacity-80"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
