import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Pencil, Trash2, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { formatDate, readTime } from "../lib/utils";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    // schedule state updates async to avoid sync setState inside effect
    Promise.resolve().then(() => {
      if (!active) return;
      setLoading(true);
      setNotFound(false);
    });

    api
      .get(`/blog/${id}`)
      .then((res) => {
        if (!active) return;
        setBlog(res.data.blog ?? res.data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  const isOwner = user && blog?.author && (blog.author._id === user._id || blog.author === user._id);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    setDeleting(true);
    try {
      await api.delete(`/blog/${id}`);
      toast.success("Post deleted");
      navigate("/");
    } catch {
      toast.error("Couldn't delete this post");
      setDeleting(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to leave a comment");
      return navigate("/login");
    }
    if (!comment.trim()) return;

    setPosting(true);
    try {
      const res = await api.post(`/review/${id}`, { comment: comment.trim() });
      setBlog(res.data.blog ?? res.data);
      setComment("");
    } catch {
      toast.error("Couldn't post your comment");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ height: 40, width: "70%", backgroundColor: "var(--color-cream-border)", borderRadius: 8, marginBottom: 20, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: 280, backgroundColor: "var(--color-cream-border)", borderRadius: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-cream)", gap: 14 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--color-ink)" }}>Post not found</p>
        <Link to="/" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-amber)", fontWeight: 600 }}>
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <article style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-ink-faint)",
            textDecoration: "none",
            marginBottom: 28,
          }}
        >
          <ArrowLeft size={14} /> All posts
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 99,
                    backgroundColor: "var(--color-amber-bg)",
                    color: "var(--color-amber)",
                    border: "1px solid rgba(184,134,11,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              marginBottom: 24,
            }}
          >
            {blog.title}
          </h1>

          {/* Author row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {blog.author?.profileImage ? (
                <img
                  src={blog.author.profileImage}
                  alt={blog.author.username}
                  style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--color-cream-border)" }}
                />
              ) : (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-amber-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-amber)" }}>
                    {blog.author?.username?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                  {blog.author?.username}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-faint)" }}>
                  <span>{formatDate(blog.createdAt)}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={11} /> {readTime(blog.content)}
                  </span>
                </div>
              </div>
            </div>

            {isOwner && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => navigate(`/write?edit=${blog._id}`)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    padding: "8px 14px", borderRadius: 8,
                    border: "1px solid var(--color-cream-border)",
                    backgroundColor: "var(--color-white)", color: "var(--color-ink-soft)",
                    cursor: "pointer",
                  }}
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    padding: "8px 14px", borderRadius: 8,
                    border: "1px solid #FCA5A5",
                    backgroundColor: "#FEF2F2", color: "#DC2626",
                    cursor: deleting ? "default" : "pointer",
                    opacity: deleting ? 0.6 : 1,
                  }}
                >
                  <Trash2 size={13} /> {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </div>

          {/* Cover image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              style={{ width: "100%", maxHeight: 440, objectFit: "cover", borderRadius: 18, marginBottom: 36 }}
            />
          )}

          {/* Content */}
          <div className="prose-blog">
            {blog.content.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "var(--color-cream-border)", margin: "48px 0 36px" }} />

        {/* Comments */}
        <div>
          <h3
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
              color: "var(--color-ink)", marginBottom: 22,
            }}
          >
            <MessageCircle size={18} /> {blog.reviews?.length ?? 0} comment{blog.reviews?.length === 1 ? "" : "s"}
          </h3>

          <form onSubmit={handleComment} style={{ display: "flex", gap: 10, marginBottom: 32 }}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={user ? "Add a comment…" : "Sign in to comment"}
              disabled={!user}
              style={{
                flex: 1,
                fontFamily: "var(--font-body)", fontSize: 14,
                padding: "11px 16px",
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-cream-border)",
                borderRadius: 10, outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={posting || !user}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                padding: "11px 18px", borderRadius: 10, border: "none",
                backgroundColor: "var(--color-ink)", color: "var(--color-white)",
                cursor: posting || !user ? "default" : "pointer",
                opacity: posting || !user ? 0.6 : 1,
              }}
            >
              <Send size={13} /> Post
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {(blog.reviews ?? []).map((review, i) => (
              <div key={review._id ?? i} style={{ display: "flex", gap: 12 }}>
                {review.user?.profileImage ? (
                  <img
                    src={review.user.profileImage}
                    alt={review.user.username}
                    style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      backgroundColor: "var(--color-amber-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--color-amber)" }}>
                      {review.user?.username?.[0]?.toUpperCase() ?? "?"}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "var(--color-white)",
                    border: "1px solid var(--color-cream-border)",
                    borderRadius: 12,
                    padding: "12px 16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>
                      {review.user?.username ?? "Anonymous"}
                    </span>
                    {review.createdAt && (
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-faint)" }}>
                        {formatDate(review.createdAt)}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--color-ink-soft)", lineHeight: 1.6 }}>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
            {(!blog.reviews || blog.reviews.length === 0) && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink-faint)" }}>
                No comments yet — be the first to share your thoughts.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}