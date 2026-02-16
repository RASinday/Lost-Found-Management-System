// app/login/signup/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, User } from "lucide-react";
import { useState } from "react";

type Errors = {
  username: string;
  password: string;
  confirmPassword: string;
};

function ErrorBanner({ message }: { message: string }) {
  if (!message) return <div className="mb-4" />;
  return (
    <div className="mb-4 flex items-center gap-2 rounded bg-orange-100 px-3 py-2 text-sm text-orange-800">
      <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">
        !
      </span>
      {message}
    </div>
  );
}

function FieldLabel({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <label className="mb-2 flex items-center gap-2 text-l text-white/90">
      <span aria-hidden className="text-white/90">
        {icon}
      </span>
      {text}
    </label>
  );
}

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = () => {
    const newErrors: Errors = { username: "", password: "", confirmPassword: "" };

    // Username (email-like) validation to match your login behavior
    if (!username.trim()) {
      newErrors.username = "Please fill out this field.";
    } else if (!username.includes("@")) {
      newErrors.username =
        "Please include an '@' in the email address. '" +
        username +
        "' is missing an '@'.";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Please fill out this field.";
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please fill out this field.";
    } else if (password && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password && !newErrors.confirmPassword) {
      // signup logic here
      console.log("Signup successful");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/HNVS1.png"
        alt="Signup background"
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
            Create an account
          </h1>

          {/* Username */}
          <FieldLabel
            icon={<User size={14} color="orange" />}
            text="Username"
          />
          <input
            type="text"
            placeholder="Enter your password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`mb-1 w-full rounded-md border ${
              errors.username ? "border-red-500" : "border-white/20"
            } bg-white px-3 py-2 text-l text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40`}
          />
          <ErrorBanner message={errors.username} />

          {/* Password */}
          <FieldLabel
            icon={<Lock size={14} color="orange" />}
            text="Password"
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-1 w-full rounded-md border ${
              errors.password ? "border-red-500" : "border-white/20"
            } bg-white px-3 py-2 text-l text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40`}
          />
          <ErrorBanner message={errors.password} />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mb-1 w-full rounded-md border ${
              errors.confirmPassword ? "border-red-500" : "border-white/20"
            } bg-white px-3 py-2 text-l text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40`}
          />
          <ErrorBanner message={errors.confirmPassword} />

          {/* Sign up button */}
          <button
            type="button"
            onClick={handleSignup}
            className="mt-10 mx-auto block w-36 rounded-md bg-white px-4 py-2 text-l font-semibold text-[#2f4a79] shadow hover:bg-orange-400 active:scale-[0.99]"
          >
            Sign up
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-l text-white/85">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              Login now!
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
