import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ImagePlus, X, Send } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios";
import { readTime } from "../lib/utils";
import ImageUploadField from "../components/ImageUploadField";

const SUGGESTED_TAGS = ["nodejs", "react", "mongodb", "css", "javascript", "security", "webdev", "api", "database", "general"];

export default function WriteBlog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(!!editId);

  // If editing, load existing post
  useEffect(() => {
    if (!editId) return;
    api
      .get(`/blog/${editId}`)
      .then((res) => {
        const blog = res.data.blog ?? res.data;
        setTitle(blog.title ?? "");
        setContent(blog.content ?? "");
        setImage(blog.image ?? "");
        setTags(blog.tags ?? []);
      })
      .catch(() => toast.error("Couldn't load that post for editing"))
      .finally(() => setLoadingDraft(false));
  }, [editId]);

  const addTag = (raw) => {
    const t = raw.trim().toLowerCase();
    if (!t || tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Give your post a title and some content first");
      return;
    }

    setSubmitting(true);
    const payload = { title: title.trim(), content, tags };
    if (image.trim()) payload.image = image.trim();

    try {
      const res = editId
        ? await api.put(`/blog/${editId}`, payload)
        : await api.post("/blog", payload);
      const blog = res.data.blog ?? res.data;
      toast.success(editId ? "Post updated" : "Post published");
      navigate(`/blog/${blog._id ?? editId}`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Couldn't publish — try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDraft) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-cream)" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-ink-faint)" }}>Loading…</p>
      </div>
    );
  }

  return (
    <section style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              marginBottom: 6,
            }}
          >
            {editId ? "Edit your post" : "Write something worth reading"}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink-muted)", marginBottom: 36 }}>
            {readTime(content)} · {content.trim() ? content.trim().split(/\s+/).length : 0} words
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 700,
              color: "var(--color-ink)",
              border: "none",
              borderBottom: "2px solid var(--color-cream-border)",
              backgroundColor: "transparent",
              outline: "none",
              padding: "8px 0",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-amber)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-cream-border)")}
          />

          {/* Cover image url */}
          <div
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px dashed var(--color-cream-border)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--color-ink-soft)",
                marginBottom: 10,
              }}
            >
              <ImagePlus size={14} /> Cover image (optional)
            </label>
            <ImageUploadField
              value={image}
              onChange={setImage}
              label="cover"
              maxHeight={220}
              endpoint="/upload/blog"
              fieldName="image"
              maxSizeMB={5}
            />
          </div>

          {/* Tags */}
          <div>
            <label
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--color-ink-soft)",
                marginBottom: 10,
                display: "block",
              }}
            >
              Tags
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "5px 10px",
                    borderRadius: 99,
                    backgroundColor: "var(--color-amber-bg)",
                    color: "var(--color-amber)",
                    border: "1px solid rgba(184,134,11,0.2)",
                  }}
                >
                  {t}
                  <X size={11} style={{ cursor: "pointer" }} onClick={() => removeTag(t)} />
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
              style={{
                width: "100%",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                padding: "10px 12px",
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-cream-border)",
                borderRadius: 8,
                outline: "none",
                marginBottom: 10,
              }}
            />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => addTag(t)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 99,
                    border: "1px solid var(--color-cream-border)",
                    backgroundColor: "var(--color-cream)",
                    color: "var(--color-ink-faint)",
                    cursor: "pointer",
                  }}
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story…"
            rows={16}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ink-soft)",
              border: "1px solid var(--color-cream-border)",
              borderRadius: 14,
              backgroundColor: "var(--color-white)",
              padding: "20px 22px",
              outline: "none",
              resize: "vertical",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-amber)";
              e.target.style.boxShadow = "0 0 0 3px var(--color-amber-light)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-cream-border)";
              e.target.style.boxShadow = "none";
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 22px",
                borderRadius: 10,
                border: "1px solid var(--color-cream-border)",
                backgroundColor: "var(--color-white)",
                color: "var(--color-ink-soft)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: 10,
                border: "none",
                backgroundColor: "var(--color-ink)",
                color: "var(--color-white)",
                cursor: submitting ? "default" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              <Send size={14} /> {submitting ? "Publishing…" : editId ? "Save changes" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}