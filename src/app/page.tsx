/* Next imports */
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

/* Components imports */
import Logo from "@/app/components/logo";

/* Supabase imports */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  /* Supabase client */
  const supabase = createServerComponentClient({ cookies });

  /* Gets the user session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* If there is a session redirect to dashboard */
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      {/* Home section */}
      <section className="h-screen w-full px-8 pt-32">
        <div className="mx-auto flex max-w-7xl justify-center gap-x-8">
          {/* Left side */}
          <div className="max-w-lg">
            {/* Main text */}
            <p className="text-2xl font-medium">
              The application that helps you organize and plan{" "}
              <span className="text-4xl font-bold">
                <Logo />
              </span>
            </p>

            {/* Separator */}
            <div className="h-4" />

            {/* Secondary text */}
            <p>
              Make boards, create lists and add thing to do! Orgnize your
              schedule, goals and tasks as easy as that.
            </p>

            {/* Separator */}
            <div className="h-8" />

            {/* Link button */}
            <Link
              href="/signup"
              className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 transition-opacity duration-200 ease-in-out hover:opacity-80"
            >
              Register now
            </Link>
          </div>

          {/* Right side */}
          <Image
            src="/images/hero_image.png"
            alt="Hero image"
            width={768}
            height={480}
            priority
            className="hidden max-w-[60%] rounded-3xl shadow-xl shadow-slate-950 md:flex lg:max-w-lg"
          />
        </div>
      </section>
    </main>
  );
}
