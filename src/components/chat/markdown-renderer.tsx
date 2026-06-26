"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-mono"
                  style={{
                    background: "var(--background)",
                    color: "var(--foreground-primary)",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="relative my-3">
                <div
                  className="flex items-center justify-between px-4 py-2 rounded-t-md"
                  style={{
                    background: "var(--background)",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
                    {match[1]}
                  </span>
                </div>
                <pre
                  className="p-4 rounded-b-md overflow-x-auto"
                  style={{ background: "#0d0d0d" }}
                >
                  <code className={cn("text-sm font-mono", className)} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          p({ children }) {
            return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-sm">{children}</li>;
          },
          h1({ children }) {
            return (
              <h1
                className="text-xl font-bold mb-2 mt-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2
                className="text-lg font-bold mb-2 mt-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3
                className="text-base font-bold mb-2 mt-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {children}
              </h3>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote
                className="border-l-4 pl-4 italic my-3"
                style={{
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-subtle)",
                }}
              >
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--accent-secondary)" }}
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-3">
                <table
                  className="min-w-full"
                  style={{ border: "1px solid var(--border-subtle)" }}
                >
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th
                className="px-3 py-2 text-left text-sm font-medium"
                style={{
                  border: "1px solid var(--border-subtle)",
                  background: "var(--background)",
                }}
              >
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td
                className="px-3 py-2 text-sm"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
