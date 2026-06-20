import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import api from "../lib/axios";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .get("/user")
      .then((res) => active && setAuthors(res.data.users ?? res.data))
      .catch(() => active && setAuthors([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              marginBottom: 8,
            }}
          >
            Authors
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-ink-muted)", marginBottom: 44 }}>
            The people writing on Inkwell.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: 120,
                  borderRadius: 16,
                  backgroundColor: "var(--color-white)",
                  border: "1px solid var(--color-cream-border)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : authors.length === 0 ? (
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink-faint)" }}>
            No authors to show yet.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {authors.map((author, i) => (
              <motion.div
                key={author._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  to={`/authors/${author._id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "20px",
                    backgroundColor: "var(--color-white)",
                    border: "1px solid var(--color-cream-border)",
                    borderRadius: 16,
                    textDecoration: "none",
                    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "var(--color-amber-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "var(--color-cream-border)";
                  }}
                >
                  {author.user?.profileImage ? (
                    <img
                      src={author.user.profileImage}
                      alt={author.user.username}
                      style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                        backgroundColor: "var(--color-amber-light)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--color-amber)" }}>
                        {author.user?.username?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-ink)" }}>
                      {author.user?.username}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-faint)" }}>
                      <PenLine size={11} /> {author.blogCount ?? 0} posts
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}