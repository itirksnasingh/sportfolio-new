import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("athlete");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${role}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top center, rgba(255,77,0,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(255,0,85,0.10), transparent 60%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          background: "var(--card-bg)",
          borderRadius: "var(--border-radius)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>Welcome to Sportfolio</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Role selector */}
          <div style={{ marginBottom: "2.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              Continue as
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {[
                { key: "athlete", label: "Athlete" },
                { key: "coach", label: "Coach" },
                { key: "org", label: "Organization" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setRole(item.key)}
                  style={{
                    padding: "0.55rem",
                    borderRadius: "8px",
                    border:
                      role === item.key
                        ? "1px solid var(--accent-primary)"
                        : "1px solid var(--border-color)",
                    background:
                      role === item.key
                        ? "var(--accent-glow)"
                        : "transparent",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.85rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.85rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
