// Glass.jsx — iOS 26 liquid glass primitives, calibrated to Figma specs.
// Inset edge-light shadow + heavy backdrop-blur + subtle tint.

const LIQUID_SHADOW =
  "inset 0 0 22px 0 rgba(242,242,242,0.35), " +
  "inset -2px -2px 1px -2px rgba(179,179,179,0.9), " +
  "inset 2px 2px 1px -2px rgba(179,179,179,0.9), " +
  "inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.6)";

const LIQUID_SHADOW_SELECTED =
  "inset 0 0 22px 0 rgba(242,242,242,0.5), " +
  "inset -2px -2px 1px -2px rgb(179,179,179), " +
  "inset 2px 2px 1px -2px rgb(179,179,179), " +
  "inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.8)";

function GlassPill({ children, active, onClick, style, title, ariaLabel }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "relative",
        border: "none",
        cursor: "pointer",
        borderRadius: 999,
        padding: "12px 22px",
        minHeight: 44,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: "0.02em",
        color: active ? "#0a0a0a" : "#fff",
        background: active
          ? "rgba(255,255,255,0.72)"
          : hover
          ? "rgba(255,255,255,0.18)"
          : "rgba(255,255,255,0.09)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        boxShadow: active ? LIQUID_SHADOW_SELECTED : LIQUID_SHADOW,
        transform: press ? "scale(0.96)" : hover ? "scale(1.02)" : "scale(1)",
        transition: "transform 220ms cubic-bezier(.2,.9,.3,1.4), background 220ms ease, color 220ms ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GlassCircle({ children, onClick, size = 52, active, style, ariaLabel, badge }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "relative",
        border: "none",
        cursor: "pointer",
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "#0a0a0a" : "#fff",
        background: active
          ? "rgba(255,255,255,0.72)"
          : hover
          ? "rgba(255,255,255,0.18)"
          : "rgba(255,255,255,0.09)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        boxShadow: active ? LIQUID_SHADOW_SELECTED : LIQUID_SHADOW,
        transform: press ? "scale(0.93)" : hover ? "scale(1.06)" : "scale(1)",
        transition: "transform 220ms cubic-bezier(.2,.9,.3,1.4), background 220ms ease, color 220ms ease",
        ...style,
      }}
    >
      {children}
      {badge != null && badge > 0 && (
        <span style={{
          position: "absolute",
          top: -2,
          right: -2,
          minWidth: 20,
          height: 20,
          padding: "0 6px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.95)",
          color: "#000",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Inter', 'SF Pro', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: 0,
        }}>{badge}</span>
      )}
    </button>
  );
}

function GlassPanel({ children, style, radius = 28, padding = 24 }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: radius,
      padding,
      background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(40px) saturate(180%)",
      WebkitBackdropFilter: "blur(40px) saturate(180%)",
      boxShadow: LIQUID_SHADOW + ", 0 20px 60px rgba(0,0,0,0.35)",
      color: "#fff",
      ...style,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, { GlassPill, GlassCircle, GlassPanel, LIQUID_SHADOW, LIQUID_SHADOW_SELECTED });
