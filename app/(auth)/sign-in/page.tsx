"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.805 12.23c0-.71-.064-1.397-.182-2.057H12v3.893h5.498a4.7 4.7 0 0 1-2.04 3.085v2.526h3.304c1.934-1.78 3.043-4.402 3.043-7.447Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.763 0 5.08-.916 6.773-2.486l-3.304-2.526c-.917.615-2.087.98-3.469.98-2.667 0-4.93-1.802-5.74-4.226H2.844v2.606A10.23 10.23 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.26 13.742A6.15 6.15 0 0 1 5.938 12c0-.605.11-1.193.322-1.742V7.652H2.844A10.23 10.23 0 0 0 1.75 12c0 1.568.376 3.05 1.094 4.348l3.416-2.606Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.032c1.503 0 2.852.517 3.914 1.53l2.936-2.936C17.076 2.916 14.763 2 12 2a10.23 10.23 0 0 0-9.156 5.652l3.416 2.606C7.07 7.834 9.333 6.032 12 6.032Z"
      />
    </svg>
  );
}

export default function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { redirectTo: "/dashboard" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border bg-muted/40">
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3 4.5 6v5.5c0 4.7 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.8 7.5-9.5V6L12 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12 2 2 4-4"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-lg font-semibold tracking-tight">
                Sign in
              </h2>

              <p className="text-sm text-muted-foreground">
                Use your Google account to get started.
              </p>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full gap-3 rounded-xl border-border bg-background font-medium shadow-none transition-all duration-200 hover:bg-muted/60 hover:shadow-sm active:scale-[0.99]"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}

              <span>
                {isLoading
                  ? "Signing in..."
                  : "Continue with Google"}
              </span>
            </Button>

            {/* Terms */}
            <p className="text-center text-xs leading-5 text-muted-foreground">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your account is protected with secure authentication.
        </p>
      </div>
    </div>
  );
}