"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  planId: string;
  label: string;
};

export default function CheckoutButton({ planId, label }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (response.status === 401) {
        const callbackUrl = encodeURIComponent("/pricing");
        window.location.assign(`/api/auth/signin?callbackUrl=${callbackUrl}`);
        return;
      }

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.assign(data.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        style={{
          padding: "0.8rem 1.2rem",
          borderRadius: 10,
          border: "1px solid #333",
          background: isLoading ? "#222" : "#fff",
          color: isLoading ? "#aaa" : "#000",
          fontWeight: 600,
          cursor: isLoading ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        {isLoading ? "Redirecting..." : label}
      </button>
      {error ? (
        <p style={{ marginTop: "0.75rem", color: "#ff8b8b" }}>{error}</p>
      ) : null}
    </div>
  );
}
