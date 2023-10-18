"use client";

/* Next imports */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Supabase imports */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/* Icons imports */
import { IconLogout } from "@tabler/icons-react";

/* Types imports */
import { type Session } from "@supabase/auth-helpers-nextjs";

export default function NavbarAuthButtons({
  session,
}: {
  session: Session | null;
}) {
  /* Supabase client */
  const supabase = createClientComponentClient();

  /* Router */
  const router = useRouter();

  /* Sign out handler */
  const handleSignOut = async () => {
    try {
      /* Signs out the user */
      await supabase.auth.signOut();

      /* Refresh the route */
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return session ? (
    /* Log out button */
    <button
      onClick={handleSignOut}
      className="rounded-md bg-purple-300 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
    >
      <IconLogout className="text-slate-900" />
    </button>
  ) : (
    <div className="flex gap-2">
      {/* Log in link */}
      <Link
        href="/login"
        className="rounded-md px-2 py-1 transition-colors duration-200 ease-in-out hover:text-slate-50/80"
      >
        <span className="font-medium">Log in</span>
      </Link>

      {/* Sign up link */}
      <Link
        href="/signup"
        className="rounded-md bg-purple-300 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
      >
        <span className="font-medium text-slate-900">Sign up</span>
      </Link>
    </div>
  );
}
