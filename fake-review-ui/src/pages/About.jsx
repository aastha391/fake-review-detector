import { motion } from "framer-motion";
import { Shield, Brain, Database, Award } from "lucide-react";

const cards = [
  { icon: <Brain size={22} color="var(--ind)" />, title: "How It Works", text: "Our model uses TF-IDF vectorization to convert reviews into numerical features, then applies a fine-tuned Linear SVM classifier to detect patterns associated with fake reviews." },
  { icon: <Database size={22} color="var(--ind)" />, title: "Training Data", text: "Trained on 40,431 reviews from Kaggle's Fake Reviews Dataset, balanced using SMOTE to handle class imbalance and ensure fair detection across both categories." },
  { icon: <Award size={22} color="var(--ind)" />, title: "Performance", text: "Achieves 91.12% accuracy with a ROC-AUC score of 0.9727 and F1-score of 0.9112, outperforming baseline models through GridSearchCV hyperparameter tuning." },
  { icon: <Shield size={22} color="var(--ind)" />, title: "Why It Matters", text: "Fake reviews mislead consumers and damage trust. Our tool helps users make informed purchasing decisions by identifying suspicious review patterns in seconds." },
];

export default function About() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "var(--txt)", marginBottom: "1rem" }}>
          About This <span style={{ background: "linear-gradient(135deg,var(--ind),var(--ind-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Project</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--txt2)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
          A machine learning project built to detect fake product reviews using Natural Language Processing and Support Vector Machines.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ background: "var(--glass)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 42, height: 42, background: "var(--bg3)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              {c.icon}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--txt)", marginBottom: 8 }}>{c.title}</h3>
            <p style={{ fontSize: 13, color: "var(--txt2)", lineHeight: 1.7, fontWeight: 300 }}>{c.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
        style={{ marginTop: "2rem", background: "var(--glass)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--txt)", marginBottom: "1rem" }}>Tech Stack</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Python","scikit-learn","FastAPI","React","Vite","TF-IDF","Linear SVM","SMOTE","GridSearchCV","joblib"].map((t, i) => (
            <span key={i} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: "var(--bg3)", color: "var(--ind)", border: "1px solid var(--border)" }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}