import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Input Review", desc: "Paste any product review text into the analyzer. The system accepts reviews of any length.", color: "var(--ind)" },
  { num: "02", title: "Text Preprocessing", desc: "The review is cleaned — lowercased, punctuation removed, stop words filtered, and words lemmatized to their root forms.", color: "var(--ind)" },
  { num: "03", title: "TF-IDF Vectorization", desc: "The cleaned text is converted into a numerical vector using TF-IDF, capturing word importance across the entire training corpus.", color: "var(--ind)" },
  { num: "04", title: "SVM Classification", desc: "The vector is passed to our fine-tuned Linear SVM model (C=1.0) which classifies the review as fake or genuine.", color: "var(--ind)" },
  { num: "05", title: "Result & Confidence", desc: "The model returns a prediction along with a confidence score showing how certain it is about the classification.", color: "var(--grn)" },
];

export default function HowItWorks() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "var(--txt)", marginBottom: "1rem" }}>
          How It <span style={{ background: "linear-gradient(135deg,var(--ind),var(--ind-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Works</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--txt2)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto", fontWeight: 300 }}>
          A step-by-step breakdown of how our ML pipeline processes and classifies reviews.
        </p>
      </motion.div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "var(--border)", borderRadius: 1 }} />
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.12 }}
            style={{ display: "flex", gap: 20, marginBottom: "1.5rem", position: "relative" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,var(--ind),var(--ind-dark))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0, zIndex: 1, boxShadow: "0 0 0 4px var(--bg)" }}>
              {s.num}
            </div>
            <div style={{ background: "var(--glass)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.2rem 1.4rem", flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--txt)", marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--txt2)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
        style={{ marginTop: "1rem", background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(99,102,241,0.03))", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ind)", marginBottom: 4 }}>~50ms</div>
        <div style={{ fontSize: 13, color: "var(--txt2)" }}>Average prediction time per review</div>
      </motion.div>
    </div>
  );
}