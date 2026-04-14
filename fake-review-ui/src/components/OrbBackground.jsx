export default function OrbBackground() {
  const orbStyle = (top, left, right, bottom, color, size, delay) => ({
    position: "fixed",
    width: size, height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color}, transparent)`,
    filter: "blur(80px)",
    opacity: 0.3,
    top, left, right, bottom,
    animation: `orbFloat ${delay}s ease-in-out infinite`,
    pointerEvents: "none",
    zIndex: 0,
  });

  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-25px) scale(1.08); }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={orbStyle("-100px", null, "-100px", null, "#6366F1", "500px", 12)} />
        <div style={orbStyle(null, "-80px", null, "-80px", "#22C55E", "400px", 15)} />
        <div style={orbStyle("40%", "40%", null, null, "#F43F5E", "300px", 10)} />
      </div>
    </>
  );
}