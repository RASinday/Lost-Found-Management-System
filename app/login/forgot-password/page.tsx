// app/login/forgot-password/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useState } from "react";

type Errors = { email: string };

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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({ email: "" });
  const [sent, setSent] = useState(false);

  const handleSendReset = () => {
    const newErrors: Errors = { email: "" };

    if (!email.trim()) {
      newErrors.email = "Please fill out this field.";
    } else if (!email.includes("@")) {
      newErrors.email =
        "Please include an '@' in the email address. '" +
        email +
        "' is missing an '@'.";
    }

    setErrors(newErrors);

    if (!newErrors.email) {
      // reset logic here
      setSent(true);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/HNVS.png"
        alt="Forgot password background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-[#2f4a79] px-10 py-10 shadow-2xl">
          <div className="mb-2 flex justify-center">
            <Image
              src="/HNVSearchLogo.png"
              alt="Logo"
              width={112}
              height={112}
              className="object-contain"
            />
          </div>

          <h1 className="mb-2 text-center text-2xl font-light text-white/90">
            Reset Password
          </h1>
          <p className="mb-8 text-center text-l text-white/70">
            Enter your email to receive a password reset link.
          </p>

          {/* Email field (styled like the sample) */}
          <div className="mb-1 rounded-md bg-white/10 p-1">
            <div className="flex items-center gap-2 rounded-md bg-[#E5E7EB] px-3">
              <Mail size={14} className="text-slate-700" />
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-10 w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-500 focus:outline-none ${
                  errors.email ? "text-red-700" : ""
                }`}
              />
            </div>
            {/* border highlight on error */}
            <div
              className={`pointer-events-none -mt-10.5 h-10.5 w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
            />
          </div>

          <ErrorBanner message={errors.email} />

          {/* Align like the screenshot: button centered, back link directly under it */}
          <div className="mt-2 flex flex-col items-center">
            <button
              type="button"
              onClick={handleSendReset}
              className="h-9 w-full rounded-md bg-white text-l font-semibold text-[#2f4a79] shadow hover:bg-orange-400  active:scale-[0.99]"
            >
              Send Reset Link
            </button>

            <Link
              href="/login"
              className="mt-5 text-[13px] text-white/80 hover:text-white"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {sent && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-lg bg-[#2f4a79] px-10 py-10 shadow-2xl">
            <h2 className="text-center text-xl font-light text-white/90">
              Reset link sent
            </h2>
            <p className="mt-3 text-center text-sm text-white/80">
              We sent a password reset link to{" "}
              <span className="font-semibold text-white">{email}</span>.
            </p>

            <button
              type="button"
              onClick={() => {
                setSent(false);
                window.location.href = "/login";
              }}
              className="mt-8 mx-auto block w-36 rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-[#2f4a79] shadow hover:bg-orange-400 active:scale-[0.99]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
