"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.text();
        setError(data || "Registration failed");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Registration successful but login failed");
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
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
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
        {isLoading ? "Creating account..." : "CREATE ACCOUNT"}
      </button>
    </form>
  );
}
