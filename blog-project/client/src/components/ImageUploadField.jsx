import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios";

/**
 * File-upload-only image field.
 * Uploads to Cloudinary via the backend and calls onChange(url).
 * The field is optional — user can skip it entirely.
 *
 * Backend routes:
 *   POST /upload/blog    — field name "image",        5 MB limit
 *   POST /upload/profile — field name "profileImage", 2 MB limit
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
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const fileInputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeMB} MB`);
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, file);

    setUploading(true);
    try {
      const res = await api.post(endpoint, formData);
      const url = res.data?.url;
      if (!url) throw new Error("No URL returned from upload");
      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed — please try again";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e) => upload(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    upload(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const clearImage = (e) => {
    e.stopPropagation();
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={`file-upload-${label}`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        style={{ display: "none" }}
      />

      {/* Drop zone — shown whenever there's no image yet */}
      {!value && (
        <label
          htmlFor={`file-upload-${label}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "28px 16px",
            borderRadius: 12,
            border: `1.5px dashed ${dragOver ? "var(--color-amber)" : "var(--color-cream-border)"}`,
            backgroundColor: dragOver ? "var(--color-amber-bg)" : "var(--color-cream)",
            color: dragOver ? "var(--color-amber)" : "var(--color-ink-muted)",
            cursor: uploading ? "default" : "pointer",
            transition: "border-color 0.2s, background-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (uploading) return;
            e.currentTarget.style.borderColor = "var(--color-amber)";
            e.currentTarget.style.color = "var(--color-amber)";
          }}
          onMouseLeave={(e) => {
            if (dragOver) return;
            e.currentTarget.style.borderColor = "var(--color-cream-border)";
            e.currentTarget.style.color = "var(--color-ink-muted)";
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={22} style={{ animation: "spin 1s linear infinite" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
                Uploading…
              </span>
            </>
          ) : (
            <>
              <UploadCloud size={22} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
                Click to upload or drag & drop
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, opacity: 0.7 }}>
                JPG, PNG, WebP — max {maxSizeMB} MB &nbsp;·&nbsp; optional
              </span>
            </>
          )}
        </label>
      )}

      {/* Preview — shown once an image URL exists */}
      {value && (
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight,
              objectFit: "cover",
              borderRadius: 10,
              border: "1px solid var(--color-cream-border)",
              display: "block",
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />

          {/* Remove button */}
          <button
            type="button"
            onClick={clearImage}
            title="Remove image"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(26,26,26,0.65)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(26,26,26,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(26,26,26,0.65)")}
          >
            <X size={14} />
          </button>

          {/* Replace button */}
          <label
            htmlFor={`file-upload-${label}`}
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: 8,
              backgroundColor: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(4px)",
              border: "1px solid var(--color-cream-border)",
              color: "var(--color-ink-soft)",
              cursor: uploading ? "default" : "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-cream-border)")}
          >
            {uploading
              ? <><Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} /> Uploading…</>
              : <><UploadCloud size={11} /> Replace</>
            }
          </label>
        </div>
      )}
    </div>
  );
}