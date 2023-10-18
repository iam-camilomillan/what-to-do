"use client";

/* React imports */
import { useState } from "react";

/* Next imports */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Components imports */
import Logo from "@/app/components/logo";

/* Supabase imports */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/* Icons imports */
import { IconBrandGoogle } from "@tabler/icons-react";

/* Types imports */
import { type FormEvent } from "react";

export default function Page() {
  /* Data states */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Router */
  const router = useRouter();

  /* Supabase client */
  const supabase = createClientComponentClient();

  /* Submit form handler */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      /* Validates if the passwords match */
      if (password !== confirmPassword) {
        throw new Error("Passwords doesn't match.");
      }

      /* Signs up the user */
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/auth/callback",
        },
      });

      /* If there is an error will send it to the catch */
      if (error) {
        throw new Error(error.message);
      }

      /* Sends to the dashboard page */
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  /* Log in with google handler */
  const handleLoginWithGoogle = () => {
    try {
      console.log("Logged in with google");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section className="flex h-screen justify-center px-8 pt-24">
        <div className="flex w-full max-w-7xl flex-col items-center">
          {/* Sign up title */}
          <h2 className="text-2xl">
            Sign up to{" "}
            <span className="font-bold">
              <Logo />
            </span>
          </h2>

          {/* Separator */}
          <div className="h-8" />

          {/* Sign up form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xs flex-col rounded-2xl p-4 shadow shadow-slate-600"
          >
            {/* Email */}
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-md px-2 py-1 text-slate-900"
            />

            {/* Separator */}
            <div className="h-4" />

            {/* Password */}
            <label className="font-medium">Password</label>
            <input
              type="password"
              placeholder="examplepassword"
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-md px-2 py-1 text-slate-900"
            />

            {/* Separator */}
            <div className="h-4" />

            {/* Confirm password */}
            <label className="font-medium">Confirm password</label>
            <input
              type="password"
              placeholder="examplepassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-md px-2 py-1 text-slate-900"
            />

            {/* Separator */}
            <div className="h-8" />

            {/* Submit button */}
            <button
              type="submit"
              className="rounded-md bg-purple-300 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-purple-300/80"
            >
              <span className="font-medium text-slate-900">Create account</span>
            </button>

            {/* Separator */}
            <div className="h-4" />

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="h-1 flex-grow rounded-full bg-slate-700" />
              <div className="h-2 w-2 rounded-full bg-slate-700" />
              <div className="h-1 flex-grow rounded-full bg-slate-700" />
            </div>

            {/* Separator */}
            <div className="h-4" />

            {/* Google log in button */}
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="flex items-center justify-center gap-x-2 rounded-md bg-slate-50 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-slate-50/80"
            >
              <IconBrandGoogle className="text-slate-900" />
              <span className="font-medium text-slate-900">
                Login with Google
              </span>
            </button>
          </form>

          {/* Separator */}
          <div className="h-4" />

          {/* Already have account */}
          <p className="text-slate-50/80">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-slate-50 transition-colors duration-200 ease-in-out hover:text-slate-50/80"
            >
              Log in!
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
