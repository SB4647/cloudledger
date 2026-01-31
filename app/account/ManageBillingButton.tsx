"use client";

import { useState } from "react";

type ManageBillingButtonProps = {
  disabled?: boolean;
};

export default function ManageBillingButton({ disabled }: ManageBillingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (isLoading || disabled) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/billing/create-portal-session", {
        method: "POST",
      });

      if (response.status === 401) {
        const callbackUrl = encodeURIComponent("/account");
        window.location.assign(`/api/auth/signin?callbackUrl=${callbackUrl}`);
        return;
      }

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to open billing portal.");
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
        disabled={isLoading || disabled}
        style={{
          padding: "0.75rem 1.2rem",
          borderRadius: 10,
          border: "1px solid #333",
          background: disabled ? "#1a1a1a" : "#fff",
          color: disabled ? "#666" : "#000",
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Opening..." : "Manage billing"}
      </button>
      {error ? (
        <p style={{ marginTop: "0.75rem", color: "#ff8b8b" }}>{error}</p>
      ) : null}
    </div>
  );
}
