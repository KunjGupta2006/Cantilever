import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import BlogCard from "../components/BlogCard";
import api from "../lib/axios";

const ALL_TAGS = ["all", "nodejs", "react", "mongodb", "css", "javascript", "security", "webdev", "api", "database", "general"];

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onExplore }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "100px 24px 60px",
      backgroundColor: "var(--color-cream)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Soft background circle */}
      <div style={{
        position: "absolute", top: "35%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 560, height: 280,
        background: "radial-gradient(ellipse, var(--color-amber-light) 0%, transparent 70%)",
        opacity: 0.5, pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}
      >
        <div style={{ width: 24, height: 1.5, backgroundColor: "var(--color-amber)", borderRadius: 99 }} />
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--color-amber)",
        }}>
          A place for ideas
        </span>
        <div style={{ width: 24, height: 1.5, backgroundColor: "var(--color-amber)", borderRadius: 99 }} />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{ textAlign: "center", maxWidth: 720 }}
      >
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(40px, 7vw, 76px)",
          lineHeight: 1.08, letterSpacing: "-0.03em",
          color: "var(--color-ink)", marginBottom: 6,
        }}>
          Words worth
        </h1>

        {/* Italic line with ink-stroke underline — the signature */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(40px, 7vw, 76px)",
            lineHeight: 1.08, letterSpacing: "-0.03em",
            color: "var(--color-amber)",
          }}>
            reading.
          </h1>
          <svg
            viewBox="0 0 440 18" fill="none"
            style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 18 }}
          >
            <path
              className="ink-path"
              d="M4 13 C70 4, 160 17, 220 11 C290 4, 370 15, 436 8"
              stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 300, lineHeight: 1.75,
          color: "var(--color-ink-muted)", maxWidth: 460, textAlign: "center", marginBottom: 40,
        }}
      >
        Developer blogs, ideas, and honest opinions — written by people who actually ship things.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        style={{ display: "flex", gap: 12 }}
      >
        <button
          onClick={onExplore}
          style={{
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
            padding: "12px 28px", borderRadius: 10, border: "none",
            backgroundColor: "var(--color-ink)", color: "var(--color-white)",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--color-ink-soft)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--color-ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Start reading
        </button>
        <button
          onClick={() => window.location.href = "/write"}
          style={{
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
            padding: "12px 28px", borderRadius: 10,
            border: "1px solid var(--color-cream-border)",
            backgroundColor: "var(--color-white)", color: "var(--color-ink-soft)",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-amber)"; e.currentTarget.style.color = "var(--color-amber)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-cream-border)"; e.currentTarget.style.color = "var(--color-ink-soft)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Write a post
        </button>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute", bottom: 32,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "var(--color-ink-faint)",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
            <rect x="1" y="1" width="16" height="22" rx="8" stroke="currentColor" strokeWidth="1.5"/>
            <motion.rect
              x="7.5" y="5" width="3" height="5" rx="1.5" fill="currentColor"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Feed ──────────────────────────────────────────────────────────────────────
function Feed() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [blogs, setBlogs]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [page, setPage]           = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      const loadBlogs = async () => {
        if (!active) return;
        setLoading(true);
        try {
          const params = { page, limit: 9 };
          if (search)                params.search = search;
          if (activeTag !== "all") params.tag    = activeTag;
          const res = await api.get("/blog", { params });
          if (!active) return;
          setBlogs(res.data.blogs);
          setPagination(res.data.pagination);
        } catch {
          if (!active) return;
          setBlogs([]);
        } finally {
          if (active) setLoading(false);
        }
      };

      loadBlogs();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [page, search, activeTag]);

  return (
    <section ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 80px" }}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 36 }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 24 }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700,
            letterSpacing: "-0.03em", color: "var(--color-ink)",
          }}>
            Latest posts
          </h2>
          {pagination && (
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink-faint)" }}>
              {pagination.total} article{pagination.total !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: 380, marginBottom: 20 }}>
          <Search size={15} style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: "var(--color-ink-faint)", pointerEvents: "none",
          }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
            style={{
              width: "100%", fontFamily: "var(--font-body)", fontSize: 14,
              padding: "11px 16px 11px 40px",
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-cream-border)",
              borderRadius: 10, color: "var(--color-ink)", outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={e => { e.target.style.borderColor = "var(--color-amber)"; e.target.style.boxShadow = "0 0 0 3px var(--color-amber-light)"; }}
            onBlur={e => { e.target.style.borderColor = "var(--color-cream-border)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Tag pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: 99, cursor: "pointer",
                border: activeTag === tag ? "1.5px solid var(--color-amber)" : "1.5px solid var(--color-cream-border)",
                backgroundColor: activeTag === tag ? "var(--color-amber-bg)" : "var(--color-white)",
                color: activeTag === tag ? "var(--color-amber)" : "var(--color-ink-muted)",
                transition: "all 0.18s",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "var(--color-cream-border)", marginBottom: 36 }} />

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              height: 340, borderRadius: 16, backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-cream-border)",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-ink)", marginBottom: 8 }}>
            No posts found
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink-faint)" }}>
            Try a different search term or tag.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {blogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 56 }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
              padding: "9px 18px", borderRadius: 8,
              border: "1px solid var(--color-cream-border)",
              backgroundColor: page === 1 ? "var(--color-cream)" : "var(--color-white)",
              color: page === 1 ? "var(--color-ink-faint)" : "var(--color-ink)",
              cursor: page === 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <ChevronLeft size={15} /> Prev
          </button>

          <div style={{ display: "flex", gap: 6 }}>
            {[...Array(pagination.totalPages)].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                    border: page === p ? "1.5px solid var(--color-amber)" : "1px solid var(--color-cream-border)",
                    backgroundColor: page === p ? "var(--color-amber-bg)" : "var(--color-white)",
                    color: page === p ? "var(--color-amber)" : "var(--color-ink-muted)",
                    cursor: "pointer", transition: "all 0.18s",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(p => p + 1)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
              padding: "9px 18px", borderRadius: 8,
              border: "1px solid var(--color-cream-border)",
              backgroundColor: !pagination.hasNextPage ? "var(--color-cream)" : "var(--color-white)",
              color: !pagination.hasNextPage ? "var(--color-ink-faint)" : "var(--color-ink)",
              cursor: !pagination.hasNextPage ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const feedRef = useRef(null);
  const scrollToFeed = () => feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <Hero onExplore={scrollToFeed} />
      <div ref={feedRef}>
        <Feed />
      </div>
    </>
  );
}