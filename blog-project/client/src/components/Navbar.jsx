import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function Navbar() {
  const { user, logout }   = useAuth();
  const navigate            = useNavigate();
  const location            = useLocation();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (!mobileOpen && !dropOpen) return;
    const id = window.setTimeout(() => {
      setMobileOpen(false);
      setDropOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location, mobileOpen, dropOpen]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  const navLinks = [
    { to: "/",        label: "Explore" },
    { to: "/authors", label: "Authors" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: scrolled ? "rgba(250,250,247,0.92)" : "rgba(250,250,247,0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-cream-border)" : "1px solid transparent",
          transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              backgroundColor: "var(--color-amber-light)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PenLine size={16} style={{ color: "var(--color-amber)" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
              color: "var(--color-ink)", letterSpacing: "-0.03em",
            }}>
              Inkwell
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                color: isActive(to) ? "var(--color-amber)" : "var(--color-ink-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
                position: "relative",
              }}
                onMouseEnter={e => { if (!isActive(to)) e.target.style.color = "var(--color-ink)"; }}
                onMouseLeave={e => { if (!isActive(to)) e.target.style.color = "var(--color-ink-muted)"; }}
              >
                {label}
                {isActive(to) && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute", bottom: -2, left: 0, right: 0,
                      height: 2, backgroundColor: "var(--color-amber)", borderRadius: 99,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/write" style={{
                  display: "flex", alignItems: "center", gap: 7,
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                  color: "var(--color-ink)", textDecoration: "none",
                  padding: "8px 16px", borderRadius: 8,
                  border: "1px solid var(--color-cream-border)",
                  backgroundColor: "var(--color-white)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-amber)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-amber-light)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-cream-border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <PenLine size={14} /> Write
                </Link>

                {/* Avatar dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setDropOpen(o => !o)}
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      border: "2px solid var(--color-cream-border)",
                      overflow: "hidden", cursor: "pointer", background: "none", padding: 0,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-amber)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-cream-border)"}
                  >
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "var(--color-amber-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--color-amber)" }}>
                          {user.username?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute", top: "calc(100% + 10px)", right: 0,
                          minWidth: 180,
                          backgroundColor: "var(--color-white)",
                          border: "1px solid var(--color-cream-border)",
                          borderRadius: 12,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                          overflow: "hidden",
                          zIndex: 60,
                        }}
                      >
                        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-cream-border)" }}>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>{user.username}</div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-ink-faint)" }}>{user.email}</div>
                        </div>
                        {[
                          { to: "/profile", icon: <User size={14} />, label: "Profile" },
                        ].map(item => (
                          <Link key={item.to} to={item.to} style={{
                            display: "flex", alignItems: "center", gap: 9,
                            padding: "11px 16px",
                            fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink-soft)",
                            textDecoration: "none",
                            transition: "background 0.15s",
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--color-cream)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            {item.icon} {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          style={{
                            display: "flex", alignItems: "center", gap: 9,
                            width: "100%", padding: "11px 16px",
                            fontFamily: "var(--font-body)", fontSize: 13, color: "#DC2626",
                            background: "none", border: "none", cursor: "pointer",
                            borderTop: "1px solid var(--color-cream-border)",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#FEF2F2"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <LogOut size={14} /> Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                  color: "var(--color-ink-muted)", textDecoration: "none",
                  padding: "8px 16px", borderRadius: 8,
                  border: "1px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--color-ink)"; e.currentTarget.style.borderColor = "var(--color-cream-border)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--color-ink-muted)"; e.currentTarget.style.borderColor = "transparent"; }}
                >
                  Sign in
                </Link>
                <Link to="/signup" style={{
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                  color: "var(--color-white)", textDecoration: "none",
                  padding: "8px 18px", borderRadius: 8,
                  backgroundColor: "var(--color-ink)",
                  transition: "background-color 0.2s, transform 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--color-ink-soft)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--color-ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Join free
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-ink)", padding: 4 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 64, left: 0, right: 0, zIndex: 40,
              backgroundColor: "var(--color-white)",
              borderBottom: "1px solid var(--color-cream-border)",
              padding: "20px 24px 28px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} style={{
                  fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
                  color: isActive(to) ? "var(--color-amber)" : "var(--color-ink)",
                  textDecoration: "none", padding: "10px 0",
                  borderBottom: "1px solid var(--color-cream-border)",
                }}>
                  {label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/write"   style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "var(--color-ink)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--color-cream-border)" }}>Write</Link>
                  <Link to="/profile" style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "var(--color-ink)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--color-cream-border)" }}>Profile</Link>
                  <button onClick={handleLogout} style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#DC2626", background: "none", border: "none", cursor: "pointer", padding: "10px 0", textAlign: "left" }}>Log out</button>
                </>
              ) : (
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <Link to="/login"  style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--color-ink)", textDecoration: "none", padding: "10px", borderRadius: 8, border: "1px solid var(--color-cream-border)" }}>Sign in</Link>
                  <Link to="/signup" style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--color-white)", textDecoration: "none", padding: "10px", borderRadius: 8, backgroundColor: "var(--color-ink)" }}>Join free</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}