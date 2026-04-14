import { Link, useLocation } from "react-router-dom";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleDark } = useTheme();
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/how-it-works", label: "How It Works" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      background: "var(--glass)", borderBottom: "1px solid var(--border)",
      padding: "0 2rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: 34, height: 34,
          background: "linear-gradient(135deg, var(--ind), var(--ind-light))",
          borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Shield size={18} color="#fff" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--txt)" }}>
          Fake Review Detector
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {links.map((l) => (
          <Link key={l.path} to={l.path} style={{
            fontSize: 13, fontWeight: 400,
            color: location.pathname === l.path ? "var(--ind)" : "var(--txt2)",
            textDecoration: "none",
            borderBottom: location.pathname === l.path ? "2px solid var(--ind)" : "2px solid transparent",
            paddingBottom: 2,
            transition: "color 0.2s",
          }}>
            {l.label}
          </Link>
        ))}
      </div>

      <button onClick={toggleDark} style={{
        background: "var(--bg3)", border: "1px solid var(--border)",
        borderRadius: 8, padding: "7px 10px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6,
        color: "var(--txt2)", fontSize: 12, fontFamily: "var(--font-body)",
        transition: "all 0.2s",
      }}>
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
        {isDark ? "Light" : "Dark"}
      </button>
    </nav>
  );
}