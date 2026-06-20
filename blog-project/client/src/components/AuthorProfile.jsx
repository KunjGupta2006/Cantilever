import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import api from "../lib/axios";
import { formatDate, readTime } from "../lib/utils";

export default function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.get(`/user/${id}`),
      api.get("/blog", { params: { author: id, limit: 50 } }),
    ])
      .then(([userRes, blogRes]) => {
        if (!active) return;
        setAuthor(userRes.data.user ?? userRes.data);
        setPosts(blogRes.data.blogs ?? []);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ height: 100, backgroundColor: "var(--color-cream-border)", borderRadius: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    );
  }

  if (notFound || !author) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-cream)", gap: 14 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--color-ink)" }}>Author not found</p>
        <Link to="/authors" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-amber)", fontWeight: 600 }}>
          ← Back to authors
        </Link>
      </div>
    );
  }

  return (
    <section style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link
          to="/authors"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
            color: "var(--color-ink-faint)", textDecoration: "none", marginBottom: 28,
          }}
        >
          <ArrowLeft size={14} /> All authors
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex", alignItems: "center", gap: 18,
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-cream-border)",
            borderRadius: 20, padding: "28px 32px", marginBottom: 40,
          }}
        >
          {author.profileImage ? (
            <img src={author.profileImage} alt={author.username} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "var(--color-amber-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--color-amber)" }}>
                {author.username?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
              {author.username}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink-faint)", marginBottom: author.bio ? 6 : 0 }}>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
            {author.bio && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--color-ink-soft)", lineHeight: 1.5, maxWidth: 420 }}>
                {author.bio}
              </p>
            )}
          </div>
        </motion.div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-ink)", marginBottom: 18 }}>
          Posts
        </h2>

        {posts.length === 0 ? (
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink-faint)" }}>
            Nothing published yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post._id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  padding: "18px 20px",
                  backgroundColor: "var(--color-white)",
                  border: "1px solid var(--color-cream-border)",
                  borderRadius: 14, textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-amber-light)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-cream-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-ink)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.title}
                  </h3>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-faint)" }}>
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-ink-faint)" }}>
                    <Clock size={12} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11 }}>{readTime(post.content)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-ink-faint)" }}>
                    <MessageCircle size={12} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11 }}>{post.reviews?.length ?? 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}