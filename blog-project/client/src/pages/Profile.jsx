import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Check, X, Clock, MessageCircle, PenLine } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import { formatDate, readTime } from "../lib/utils";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username ?? "");
  const [profileImage, setProfileImage] = useState(user?.profileImage ?? "");
  const [saving, setSaving] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    api
      .get("/blog", { params: { author: user._id, limit: 50 } })
      .then((res) => active && setPosts(res.data.blogs ?? []))
      .catch(() => active && setPosts([]))
      .finally(() => active && setLoadingPosts(false));
    return () => {
      active = false;
    };
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put("/user/me", { username, profileImage });
      updateUser(res.data.user ?? { ...user, username, profileImage });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Couldn't update your profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUsername(user.username ?? "");
    setProfileImage(user.profileImage ?? "");
    setEditing(false);
  };

  return (
    <section style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-cream-border)",
            borderRadius: 20,
            padding: "32px 36px",
            marginBottom: 40,
            boxShadow: "0 12px 40px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {profileImage || user.profileImage ? (
                <img
                  src={editing ? profileImage : user.profileImage}
                  alt={user.username}
                  style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-cream-border)" }}
                />
              ) : (
                <div
                  style={{
                    width: 72, height: 72, borderRadius: "50%",
                    backgroundColor: "var(--color-amber-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--color-amber)" }}>
                    {user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              {!editing ? (
                <div>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
                    {user.username}
                  </h1>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink-faint)" }}>{user.email}</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
                      padding: "8px 12px", borderRadius: 8,
                      border: "1px solid var(--color-cream-border)", outline: "none",
                    }}
                  />
                  <input
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="Profile image URL"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 13,
                      padding: "8px 12px", borderRadius: 8,
                      border: "1px solid var(--color-cream-border)", outline: "none",
                      width: 240,
                    }}
                  />
                </div>
              )}
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                  padding: "8px 14px", borderRadius: 8,
                  border: "1px solid var(--color-cream-border)",
                  backgroundColor: "var(--color-white)", color: "var(--color-ink-soft)",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                <Pencil size={13} /> Edit
              </button>
            ) : (
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    padding: "8px 14px", borderRadius: 8, border: "none",
                    backgroundColor: "var(--color-ink)", color: "var(--color-white)",
                    cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1,
                  }}
                >
                  <Check size={13} /> Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    padding: "8px 14px", borderRadius: 8,
                    border: "1px solid var(--color-cream-border)",
                    backgroundColor: "var(--color-white)", color: "var(--color-ink-soft)",
                    cursor: "pointer",
                  }}
                >
                  <X size={13} /> Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Posts */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--color-ink)" }}>
            Your posts
          </h2>
          <Link
            to="/write"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
              color: "var(--color-amber)", textDecoration: "none",
            }}
          >
            <PenLine size={13} /> New post
          </Link>
        </div>

        {loadingPosts ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{ height: 76, borderRadius: 14, backgroundColor: "var(--color-white)", border: "1px solid var(--color-cream-border)", animation: "pulse 1.5s ease-in-out infinite" }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center", padding: "60px 0",
              backgroundColor: "var(--color-white)", borderRadius: 16,
              border: "1px dashed var(--color-cream-border)",
            }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--color-ink)", marginBottom: 6 }}>
              You haven't published anything yet
            </p>
            <Link to="/write" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-amber)", fontWeight: 600 }}>
              Write your first post →
            </Link>
          </div>
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
                  <h3
                    style={{
                      fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700,
                      color: "var(--color-ink)", marginBottom: 4,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}
                  >
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