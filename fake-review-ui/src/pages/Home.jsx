import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import StatsRow from "../components/StatsRow";
import Analyzer from "../features/Analyzer";
import History from "../features/History";

export default function Home() {
  const [history, setHistory] = useState([]);

  function handleResult(review, data) {
    setHistory((prev) => {
      const updated = [{ review, isFake: data.is_fake, prediction: data.prediction, confidence: data.confidence }, ...prev];
      return updated.slice(0, 8);
    });
  }

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <section style={{ textAlign: "center", padding: "5rem 2rem 3rem", maxWidth: 700, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "var(--ind)", fontWeight: 500, marginBottom: "1.5rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ind)", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            AI-Powered Detection
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.9)}}`}</style>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, lineHeight: 1.1, color: "var(--txt)", marginBottom: "1.2rem" }}>
          Detect Fake Reviews<br />
          <span style={{ background: "linear-gradient(135deg,var(--ind),var(--ind-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            in Seconds
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: 16, color: "var(--txt2)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 2rem", fontWeight: 300 }}>
          AI-powered analysis using Linear SVM to identify spam and misleading reviews with 91.12% accuracy
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <button onClick={() => document.getElementById("analyzer").scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,var(--ind),var(--ind-dark))", color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <ArrowDown size={16} /> Analyze Review
          </button>
        </motion.div>
      </section>

      <div id="analyzer" style={{ maxWidth: 780, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <StatsRow />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <Analyzer onResult={handleResult} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
          <History history={history} onClear={() => setHistory([])} />
        </motion.div>
      </div>
    </div>
  );
}