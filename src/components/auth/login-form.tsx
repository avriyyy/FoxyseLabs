"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="p-3 text-sm rounded-md"
          style={{
            background: "#ff000020",
            color: "#ff6b6b",
            border: "1px solid #ff000040",
          }}
        >
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground-primary)" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full h-10 px-3 text-sm rounded-md outline-none"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--border-subtle)",
            color: "var(--foreground-primary)",
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: "var(--foreground-primary)" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full h-10 px-3 text-sm rounded-md outline-none"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--border-subtle)",
            color: "var(--foreground-primary)",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 font-mono text-sm font-semibold tracking-wider text-white"
        style={{
          background: "var(--accent-primary)",
          borderRadius: "var(--radius-sm)",
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? "Signing in..." : "SIGN IN"}
      </button>
    </form>
  );
}
