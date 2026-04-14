import { useEffect, useRef } from "react";

function animateCount(el, target, isFloat, suffix, duration = 1400) {
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = (isFloat ? (target * e).toFixed(4) : Math.round(target * e).toLocaleString()) + (suffix || "");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function StatCard({ label, valueId, sub, barWidth, delay, target, isFloat, suffix }) {
  const ref = useRef();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ref.current) animateCount(ref.current, target, isFloat, suffix);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{
      background: "var(--glass)", backdropFilter: "blur(12px)",
      border: "1px solid var(--border)", borderRadius: 16,
      padding: "1rem 1.2rem",
      transition: "transform 0.3s, border-color 0.3s",
      cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ fontSize: 11, color: "var(--txt3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6, fontWeight: 500 }}>
        {label}
      </div>
      <div ref={ref} style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--txt)" }}>
        0{suffix}
      </div>
      <div style={{ fontSize: 11, color: "var(--txt3)", marginTop: 2 }}>{sub}</div>
      <div style={{ height: 3, background: "var(--border)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
        <div style={{ height: "100%", width: barWidth, background: "linear-gradient(90deg, var(--ind), var(--ind-light))", borderRadius: 2 }} />
      </div>
    </div>
  );
}

export default function StatsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "1.5rem" }}>
      <StatCard label="Accuracy" sub="Linear SVM (tuned)" barWidth="91.12%" target={91.12} isFloat={false} suffix="%" delay={500} />
      <StatCard label="ROC-AUC" sub="F1-Score: 0.9112" barWidth="97.27%" target={0.9727} isFloat={true} suffix="" delay={700} />
      <StatCard label="Training Reviews" sub="SMOTE balanced" barWidth="80%" target={40431} isFloat={false} suffix="" delay={900} />
    </div>
  );
}