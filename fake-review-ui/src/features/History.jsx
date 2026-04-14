import { Trash2 } from "lucide-react";

export default function History({ history, onClear }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--txt)" }}>Recent Analyses</span>
        <button onClick={onClear} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "1px solid var(--border)", color: "var(--txt3)", fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--txt3)"; }}>
          <Trash2 size={11} /> Clear All
        </button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2.5rem", border: "1.5px dashed var(--border)", borderRadius: 16, color: "var(--txt3)", fontSize: 13 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
          No reviews analyzed yet — paste one above to get started
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {history.map((h, i) => (
            <div key={i} style={{
              background: "var(--glass)", backdropFilter: "blur(12px)",
              border: "1px solid var(--border)", borderRadius: 12,
              padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
              transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
              animation: `slideIn 0.3s ${i * 0.05}s ease both`, cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = "var(--ind)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
              <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}`}</style>
              <div style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: h.isFake ? "var(--red)" : "var(--grn)", boxShadow: h.isFake ? "0 0 8px rgba(244,63,94,0.5)" : "0 0 8px rgba(34,197,94,0.5)" }} />
              <span style={{ fontSize: 13, color: "var(--txt2)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 300 }}>
                {h.review.substring(0, 90)}{h.review.length > 90 ? "..." : ""}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 20, flexShrink: 0, background: h.isFake ? "rgba(244,63,94,0.12)" : "rgba(34,197,94,0.12)", color: h.isFake ? "var(--red)" : "var(--grn)" }}>
                {h.isFake ? "Fake" : "Genuine"}
              </span>
              <span style={{ fontSize: 12, color: "var(--txt3)", minWidth: 40, textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {parseFloat(h.confidence).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}