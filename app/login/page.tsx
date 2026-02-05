"use client";

import { User, Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleLogin = () => {
    const newErrors = { username: "", password: "" };

    // Validate username
    if (!username.trim()) {
      newErrors.username = "Please fill out this field.";
    } else if (!username.includes("@")) {
      newErrors.username = "Please include an '@' in the email address. '" + username + "' is missing an '@'.";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Please fill out this field.";
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.username && !newErrors.password) {
      // Handle login logic here
      console.log("Login successful");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/HNVS.png"
        alt="Login background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Centered card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-[#2f4a79] px-10 py-10 shadow-2xl">
          {/* Logo */}
          <div className="mb-1 flex justify-center">
            <Image
              src="/HNVSearchLogo.png"
              alt="Logo"
              width={112}
              height={112}
              className="object-contain"
            />
          </div>

          <h1 className="mb-6 text-center text-xl font-light text-white/90">
            Login to your account
          </h1>

          {/* Username */}
          <label className="mb-2 flex items-center gap-2 text-l text-white/90">
            <span aria-hidden className="text-white/90">
              <User size={14} color="orange"/>
            </span>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`mb-1 w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-white/20'} bg-white px-3 py-2 text-l text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40`}
          />
          {errors.username && (
            <div className="mb-4 flex items-center gap-2 rounded bg-orange-100 px-3 py-2 text-sm text-orange-800">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">
                !
              </span>
              {errors.username}
            </div>
          )}
          {!errors.username && <div className="mb-4"></div>}

          {/* Password */}
          <label className="mb-2 flex items-center gap-2 text-l text-white/90">
            <span aria-hidden className="text-white/90">
              <Lock size={14} color="orange"/>
            </span>
            Password
          </label>
          <div className="relative mb-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-white/20'} bg-white px-3 py-2 pr-12 text-l text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-l text-slate-600 hover:bg-slate-100"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div className="mb-4 flex items-center gap-2 rounded bg-orange-100 px-3 py-2 text-sm text-orange-800">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">
                !
              </span>
              {errors.password}
            </div>
          )}
          {!errors.password && <div className="mb-4"></div>}

          {/* Remember / Forgot */}
          <div className="mb-5 flex items-center justify-between text-l text-white/85">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-white/30"
              />
              Remember me
            </label>

            {/* Updated path */}
            <Link
              href="/login/forgot-password"
              className="underline underline-offset-2 hover:text-white"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="button"
            onClick={handleLogin}
            className="mt-10 mx-auto block w-36 rounded-md bg-white px-4 py-2 text-l font-semibold text-[#2f4a79] shadow hover:bg-orange-400  active:scale-[0.99]"
          >
            Login
          </button>

          {/* Signup link (adjust if your route differs) */}
          <p className="mt-6 text-center text-l text-white/85">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Signup now?
            </Link>
          </p>

          {/* Divider */}
          <div className="mt-5 border-t border-white/20"></div>

          {/* Admin Access Button */}
          <Link
            href="/admin"
            className="mt-3 mx-auto flex w-fit items-center justify-center gap-2 text-[13px] text-white/80 hover:text-white"
          >
            <Shield size={15} color="orange"/>
            ADMIN ACCESS
          </Link>
        </div>
      </div>
    </main>
  );
}
