"use client";

import { useMemo, useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const errorMap: Record<string, string> = {
  login_required: "Please log in first.",
  unauthorized: "This account is not allowed to access the admin panel.",
};

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryError = useMemo(() => {
    const error = searchParams.get("error");
    return error ? errorMap[error] ?? "Unable to continue." : "";
  }, [searchParams]);

  const errorText = localError || queryError;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLocalError(error.message || "Invalid email or password.");
      setIsLoading(false);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
          <LockKeyhole className="h-5 w-5 text-white/75" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/45">
            Sign in to access your admin panel
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-white/65">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {errorText && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
            {errorText}
          </div>
        )}
      </form>
    </div>
  );
}