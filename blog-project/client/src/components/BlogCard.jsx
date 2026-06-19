import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageCircle, Clock } from "lucide-react";
import { formatDate, readTime } from "../lib/utils";

export default function BlogCard({ blog, index = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        to={`/blog/${blog._id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <article
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-cream-border)",
            borderRadius: 16,
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.10)";
            e.currentTarget.style.borderColor = "var(--color-amber-light)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = "var(--color-cream-border)";
          }}
        >
          {/* Image */}
          {blog.image && (
            <div style={{ height: 196, overflow: "hidden", position: "relative" }}>
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              />
              {/* Tag badges over image */}
              {blog.tags?.length > 0 && (
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.07em", textTransform: "uppercase",
                      padding: "3px 9px", borderRadius: 99,
                      backgroundColor: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(6px)",
                      color: "var(--color-amber)",
                      border: "1px solid rgba(184,134,11,0.2)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Body */}
          <div style={{ padding: "22px 24px 24px" }}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
              lineHeight: 1.3, letterSpacing: "-0.02em",
              color: "var(--color-ink)", marginBottom: 10,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {blog.title}
            </h3>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.65,
              color: "var(--color-ink-muted)", marginBottom: 20,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {blog.content}
            </p>

            {/* Footer row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                {blog.author?.profileImage ? (
                  <img
                    src={blog.author.profileImage}
                    alt={blog.author.username}
                    style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--color-cream-border)" }}
                  />
                ) : (
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    backgroundColor: "var(--color-amber-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1.5px solid var(--color-cream-border)",
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "var(--color-amber)" }}>
                      {blog.author?.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-ink)" }}>
                    {blog.author?.username}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-faint)" }}>
                    {formatDate(blog.createdAt)}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-ink-faint)" }}>
                  <Clock size={12} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11 }}>{readTime(blog.content)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-ink-faint)" }}>
                  <MessageCircle size={12} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11 }}>{blog.reviews?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}