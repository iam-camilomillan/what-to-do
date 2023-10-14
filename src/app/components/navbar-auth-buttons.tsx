"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Supabase imports */
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

/* Icons imports */
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function NavbarAuthButtons({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return session ? (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
    >
      Log out
    </button>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="rounded-md px-2 py-1 font-medium transition-colors duration-200 ease-in-out hover:text-slate-50/80"
      >
        Log in
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
      >
        Sign up
      </Link>
    </div>
  );
}
