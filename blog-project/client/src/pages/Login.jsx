import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Couldn't sign you in. Check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
        backgroundColor: "var(--color-cream)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "var(--color-white)",
          border: "1px solid var(--color-cream-border)",
          borderRadius: 20,
          padding: "40px 36px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "var(--color-amber-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PenLine size={20} style={{ color: "var(--color-amber)" }} />
          </div>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--color-ink-muted)",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          Sign in to keep reading and writing.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FCA5A5",
              color: "#B91C1C",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 18,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field
            icon={<Mail size={15} />}
            type="email"
            name="email"
            placeholder="you@example.com"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div style={{ position: "relative" }}>
            <Field
              icon={<Lock size={15} />}
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              style={{
                position: "absolute",
                right: 14,
                top: 38,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-ink-faint)",
              }}
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              padding: "12px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "var(--color-ink)",
              color: "var(--color-white)",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: 6,
              transition: "background-color 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--color-ink-soft)")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--color-ink)")}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-ink-muted)",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          New to Inkwell?{" "}
          <Link to="/signup" style={{ color: "var(--color-amber)", fontWeight: 600, textDecoration: "none" }}>
            Create an account
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

function Field({ icon, label, ...props }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--color-ink-soft)",
          marginBottom: 6,
          display: "block",
        }}
      >
        {label}
      </span>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-ink-faint)",
          }}
        >
          {icon}
        </span>
        <input
          {...props}
          style={{
            width: "100%",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            padding: "11px 14px 11px 40px",
            backgroundColor: "var(--color-cream)",
            border: "1px solid var(--color-cream-border)",
            borderRadius: 10,
            color: "var(--color-ink)",
            outline: "none",
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
      </div>
    </label>
  );
}