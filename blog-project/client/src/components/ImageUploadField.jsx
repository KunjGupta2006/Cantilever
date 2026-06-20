import { useState, useRef } from "react";
import { Link2, UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios";

/**
 * Image input that supports either pasting a URL or uploading a file.
 *
 * Backend routes (Cloudinary via multer):
 *   POST /upload/blog    — field name "image",         5MB limit
 *   POST /upload/profile — field name "profileImage",  2MB limit
 * Both return { success, url }.
 */
export default function ImageUploadField({
  value,
  onChange,
  label = "Image",
  maxHeight = 220,
  endpoint = "/upload/blog",
  fieldName = "image",
  maxSizeMB = 5,
}) {
  const [mode, setMode] = useState("url"); // "url" | "upload"
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeMB}MB`);
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, file);

    setUploading(true);
    try {
      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": undefined },
      });
      const url = res.data.url;
      if (!url) throw new Error("No URL in upload response");
      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed — try a URL instead";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <TabButton active={mode === "url"} onClick={() => setMode("url")} icon={<Link2 size={12} />} label="URL" />
        <TabButton active={mode === "upload"} onClick={() => setMode("upload")} icon={<UploadCloud size={12} />} label="Upload" />
      </div>

      {mode === "url" ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          style={{
            width: "100%",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            padding: "10px 12px",
            backgroundColor: "var(--color-cream)",
            border: "1px solid var(--color-cream-border)",
            borderRadius: 8,
            outline: "none",
          }}
        />
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            style={{ display: "none" }}
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              padding: "14px 12px",
              borderRadius: 8,
              border: "1.5px dashed var(--color-cream-border)",
              backgroundColor: "var(--color-cream)",
              color: "var(--color-ink-muted)",
              cursor: uploading ? "default" : "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (uploading) return;
              e.currentTarget.style.borderColor = "var(--color-amber)";
              e.currentTarget.style.color = "var(--color-amber)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-cream-border)";
              e.currentTarget.style.color = "var(--color-ink-muted)";
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <UploadCloud size={14} /> Choose an image (max 5MB)
              </>
            )}
          </label>
        </div>
      )}

      {value && (
        <img
          src={value}
          alt="Preview"
          style={{ marginTop: 12, width: "100%", maxHeight, objectFit: "cover", borderRadius: 10 }}
          onError={(e) => (e.target.style.display = "none")}
          onLoad={(e) => (e.target.style.display = "block")}
        />
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-body)",
        fontSize: 11,
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: 99,
        border: active ? "1.5px solid var(--color-amber)" : "1.5px solid var(--color-cream-border)",
        backgroundColor: active ? "var(--color-amber-bg)" : "var(--color-white)",
        color: active ? "var(--color-amber)" : "var(--color-ink-muted)",
        cursor: "pointer",
        transition: "all 0.18s",
      }}
    >
      {icon} {label}
    </button>
  );
}