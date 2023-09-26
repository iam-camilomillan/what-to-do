"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Component imports */
import Logo from "@/components/Logo";

/* Supabase imports */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Page = () => {
  /* Data state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      return console.log(error);
    }

    router.push("/dashboard");
  };
  const handleLoginWithGoogle = () => {};

  return (
    <section className="flex h-screen justify-center px-8 pt-24">
      <div className="flex w-full max-w-7xl flex-col items-center">
        <h2 className="text-2xl">
          Login to{" "}
          <span className="font-bold">
            <Logo />
          </span>
        </h2>

        <div className="h-8" />

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xs flex-col rounded-2xl p-4 shadow shadow-slate-600"
        >
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md p-1 text-slate-900"
          />

          <div className="h-4" />

          <label className="font-medium">Password</label>
          <input
            type="password"
            placeholder="examplepassword"
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md p-1 text-slate-900"
          />

          <div className="h-2" />

          <label className="font-medium">Confirm password</label>
          <input
            type="password"
            placeholder="examplepassword"
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded-md p-1 text-slate-900"
          />

          <div className="h-8" />

          <button
            type="submit"
            className="rounded-md bg-purple-300 px-2 py-1 font-medium text-slate-900 duration-200 ease-in-out hover:opacity-80"
          >
            Sign up
          </button>

          <div className="h-4" />

          <div className="flex items-center gap-2">
            <div className="h-1 flex-grow rounded-full bg-slate-600" />
            <div className="h-2 w-2 rounded-full bg-slate-600" />
            <div className="h-1 flex-grow rounded-full bg-slate-600" />
          </div>

          <div className="h-4" />

          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="rounded-md bg-slate-50 px-2 py-1 font-medium text-slate-900 duration-200 ease-in-out hover:opacity-80"
          >
            Login with Google
          </button>
        </form>

        <div className="h-4" />

        <p>
          <span className="opacity-80">Already have an account?</span>{" "}
          <Link
            href="/login"
            className="transition-opacity duration-200 ease-in-out hover:opacity-80"
          >
            Log in!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;
