"use client";
import { useState } from "react";
import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", password);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[420px] bg-white/10 border-2 border-black/50 backdrop-blur-xl rounded-xl text-black p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl text-center font-bold">Movie Island</h1>

          <div className="relative my-8">
            <input
              type="email"
              id="email"
              placeholder="Email"
              aria-label="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[45px] bg-transparent border border-black rounded-full text-black text-lg font-bold px-4 outline-none"
            />
            <FaUserAlt
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
              aria-hidden="true"
            />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              id="password"
              placeholder="Password"
              aria-label="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[45px] bg-transparent border border-black rounded-full text-black text-lg font-bold px-4 outline-none"
            />
            <FaLock
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
              aria-hidden="true"
            />
          </div>
          <Link href="http://localhost:4000/">
            <button
              type="submit"
              onClick={() => console.log("Bouton cliqué !")}
              className="w-full h-[45px] bg-transparent border border-black rounded-full text-black text-lg font-bold transition-all duration-200 hover:bg-black hover:text-white"
            >
              Log in
            </button>
          </Link>

          <div className="text-center text-sm mt-5">
            <hr className="border-black w-1/2 mx-auto mb-5" />
            <p>
              No account?&nbsp;{" "}
              <a href="/register" className="font-semibold hover:underline">
                Sign up here
              </a>
            </p>
            <p>
              Forgot your password?&nbsp;{" "}
              <a
                href="/resetPassword"
                className="font-semibold hover:underline"
              >
                Reset it
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
