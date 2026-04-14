import { useState } from "react";

export default function ResultCard({ result }) {
  const [advOn, setAdvOn] = useState(false);
  const { is_fake, prediction, confidence, sentiment } = result;
  const type = is_fake ? "fake" : "genuine";
  const color = is_fake ? "var(--red)" : "var(--grn)";
  const bgColor = is_fake ? "rgba(244,63,94,0.08)" : "rgba(34,197,94,0.08)";
  const borderColor = is_fake ? "rgba(244,63,94,0.3)" : "rgba(34,197,94,0.3)";

  const fakeTags = [["Repetitive phrasing","var(--red)","rgba(244,63,94,0.1)"],["Excessive punctuation","var(--red)","rgba(244,63,94,0.1)"],["Superlative overuse","#D97706","rgba(245,158,11,0.1)"],["Missing specifics","#D97706","rgba(245,158,11,0.1)"],["Pattern match","var(--ind)","rgba(99,102,241,0.1)"]];
  const genuineTags = [["Natural language","var(--grn)","rgba(34,197,94,0.1)"],["Specific details","var(--grn)","rgba(34,197,94,0.1)"],["Balanced tone","var(--ind)","rgba(99,102,241,0.1)"],["Authentic voice","var(--grn)","rgba(34,197,94,0.1)"]];
  const tags = is_fake ? fakeTags : genuineTags;

  const advText = is_fake
    ? `This review uses excessive superlatives and lacks specific product details. High exclamation mark usage and repetitive positive sentiment patterns are common indicators of inauthentic content. Confidence: ${parseFloat(confidence).toFixed(1)}%.`
    : `This review demonstrates natural language patterns, includes specific observations, and maintains a balanced tone consistent with authentic consumer feedback. Confidence: ${parseFloat(confidence).toFixed(1)}%.`;

  return (
    <div style={{ marginTop: "1rem", animation: "scaleIn 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
      <style>{`
        @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        @keyframes barGrow{from{width:0}to{width:var(--tw)}}
      `}</style>

      <div style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 16, padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "1.2rem" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: is_fake ? "rgba(244,63,94,0.15)" : "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
            {is_fake ? "⚠️" : "✅"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color }}>{prediction}</div>
            <div style={{ fontSize: 13, color: "var(--txt2)", marginTop: 2 }}>
              {is_fake ? "This review shows signs of being inauthentic" : "This review appears to be a genuine customer review"}
            </div>
          </div>
          <div style={{ padding: "4px 14px", borderRadius: 20, background: is_fake ? "rgba(244,63,94,0.15)" : "rgba(34,197,94,0.15)", color, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>
            {is_fake ? "❌ Fake" : "✅ Genuine"}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--txt2)", fontWeight: 500 }}>Confidence Score</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color }}>{parseFloat(confidence).toFixed(1)}%</span>
        </div>
        <div style={{ height: 8, background: "var(--bg3)", borderRadius: 4, overflow: "hidden", marginBottom: "1rem" }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: is_fake ? "linear-gradient(90deg,var(--red-dark),var(--red))" : "linear-gradient(90deg,var(--grn-dark),var(--grn))",
            width: `${confidence}%`, transition: "width 0.9s cubic-bezier(0.22,1,0.36,1)",
            animation: "barGrow 0.9s cubic-bezier(0.22,1,0.36,1)",
          }} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
          {[["😊","Positive","pos"],["😐","Neutral","neu"],["😞","Negative","neg"]].map(([icon, label, key]) => {
            const active = sentiment === key;
            const activeColor = key === "pos" ? "var(--grn)" : key === "neg" ? "var(--red)" : "var(--ind)";
            const activeBg = key === "pos" ? "rgba(34,197,94,0.08)" : key === "neg" ? "rgba(244,63,94,0.08)" : "rgba(99,102,241,0.08)";
            return (
              <div key={key} style={{ flex: 1, padding: 10, borderRadius: 10, textAlign: "center", border: `1px solid ${active ? activeColor : "var(--border)"}`, background: active ? activeBg : "var(--bg)", transition: "all 0.2s" }}>
                <div style={{ fontSize: 18 }}>{icon}</div>
                <div style={{ fontSize: 11, color: active ? activeColor : "var(--txt3)", fontWeight: 500, marginTop: 4 }}>{label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
          {tags.map(([label, color, bg], i) => (
            <span key={i} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, color, background: bg, animation: `scaleIn 0.3s ${i * 0.06}s ease both` }}>
              {label}
            </span>
          ))}
        </div>

        <div onClick={() => setAdvOn(!advOn)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer", transition: "all 0.2s", background: "var(--bg)" }}>
          <span style={{ fontSize: 13, color: "var(--txt2)", flex: 1 }}>Advanced Analysis</span>
          <div style={{ width: 32, height: 18, background: advOn ? "var(--ind)" : "var(--bg3)", border: `1px solid ${advOn ? "var(--ind)" : "var(--border)"}`, borderRadius: 9, position: "relative", transition: "background 0.2s" }}>
            <div style={{ width: 12, height: 12, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: advOn ? 16 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
        </div>

        {advOn && (
          <div style={{ marginTop: "0.8rem", padding: "1rem", background: "var(--bg3)", borderRadius: 10, fontSize: 13, color: "var(--txt2)", lineHeight: 1.7, animation: "scaleIn 0.3s ease" }}>
            <strong style={{ color: "var(--txt)", fontWeight: 500 }}>
              {is_fake ? "Why this may be fake: " : "Why this appears genuine: "}
            </strong>
            {advText}
          </div>
        )}
      </div>
    </div>
  );
}