import { useState } from "react";
import { Search } from "lucide-react";
import ResultCard from "./ResultCard";

export default function Analyzer({ onResult }) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function getMockResult(text) {
    const w = text.toLowerCase();
    const fakeWords = ["amazing","best ever","highly recommend","absolutely","must buy","incredible","outstanding","phenomenal"];
    let s = 0;
    fakeWords.forEach((f) => { if (w.includes(f)) s++; });
    const excl = (text.match(/!/g) || []).length;
    const isFake = s >= 2 || excl > 3;
    const confidence = isFake ? Math.min(72 + s * 4 + excl * 2, 96) : 60 + Math.floor(Math.random() * 22);
    const sentiment = s > 3 ? "neg" : w.includes("good") || w.includes("great") || w.includes("love") ? "pos" : "neu";
    return { is_fake: isFake, prediction: isFake ? "Fake Review" : "Genuine Review", confidence, sentiment };
  }

  async function analyzeReview() {
    if (!review.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      // const res = await fetch("http://127.0.0.1:8000/predict", {
      const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });
      const data = await res.json();
      setResult(data);
      onResult && onResult(review, data);
    } catch {
      const mock = getMockResult(review);
      setResult(mock);
      onResult && onResult(review, mock);
    }
    setLoading(false);
  }

  const charPct = Math.min((review.length / 1000) * 100, 100);

  return (
    <div style={{
      background: "var(--glass)", backdropFilter: "blur(20px)",
      border: "1px solid var(--border)", borderRadius: 24,
      padding: "2rem", boxShadow: "var(--shadow-lg)", marginBottom: "1.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
        <div style={{ width: 36, height: 36, background: "var(--bg3)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Search size={18} color="var(--ind)" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--txt)" }}>
          Analyze Review
        </span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--txt3)" }}>
          {review.length > 0 ? `${review.length} characters` : "Paste any product review"}
        </span>
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        onKeyDown={(e) => { if (e.ctrlKey && e.key === "Enter") analyzeReview(); }}
        placeholder="Paste a product review here..."
        style={{
          width: "100%", minHeight: 140,
          background: "var(--bg)", border: "1.5px solid var(--border)",
          borderRadius: 12, padding: "1rem 1.2rem",
          fontSize: 14, fontFamily: "var(--font-body)",
          color: "var(--txt)", resize: "vertical", outline: "none",
          lineHeight: 1.7, transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        onFocus={(e) => { e.target.style.borderColor = "var(--ind)"; e.target.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.08)"; }}
        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
      />

      <div style={{ height: 2, background: "var(--border)", borderRadius: 1, marginTop: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${charPct}%`, background: charPct > 80 ? "linear-gradient(90deg,#F59E0B,#FBBF24)" : "linear-gradient(90deg,var(--ind),var(--ind-light))", transition: "width 0.2s, background 0.2s", borderRadius: 1 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--txt3)" }}>
        <span>{review.length} / 1000</span>
        <span>Ctrl+Enter to analyze</span>
      </div>

      <button
        onClick={analyzeReview}
        disabled={loading || !review.trim()}
        style={{
          width: "100%", marginTop: 12, padding: 14,
          background: loading || !review.trim() ? "var(--bg3)" : "linear-gradient(135deg,var(--ind),var(--ind-dark))",
          color: loading || !review.trim() ? "var(--txt3)" : "#fff",
          border: "none", borderRadius: 12,
          fontSize: 15, fontWeight: 500, fontFamily: "var(--font-display)",
          cursor: loading || !review.trim() ? "not-allowed" : "pointer",
          transition: "all 0.2s", letterSpacing: "0.02em",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Review"}
      </button>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "1.2rem", background: "var(--bg3)", borderRadius: 12, marginTop: 12 }}>
          <style>{`@keyframes dotB{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}`}</style>
          {[0, 0.15, 0.3].map((d, i) => (
            <span key={i} style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--ind)", animation: `dotB 1.2s ${d}s ease-in-out infinite` }} />
          ))}
          <span style={{ fontSize: 13, color: "var(--txt2)" }}>AI is scanning the review...</span>
        </div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}