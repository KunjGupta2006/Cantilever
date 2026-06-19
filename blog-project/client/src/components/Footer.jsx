import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--color-cream-border)",
      backgroundColor: "var(--color-white)",
      padding: "32px 24px",
    }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "var(--color-amber-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PenLine size={14} style={{ color: "var(--color-amber)" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
            Inkwell
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { to: "/",        label: "Explore" },
            { to: "/authors", label: "Authors" },
            { to: "/write",   label: "Write" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              color: "var(--color-ink-faint)", textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "var(--color-ink)"}
              onMouseLeave={e => e.target.style.color = "var(--color-ink-faint)"}
            >
              {label}
            </Link>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-faint)" }}>
          © 2025 Inkwell · Built with MERN
        </p>
      </div>
    </footer>
  );
}