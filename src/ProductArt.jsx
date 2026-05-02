// ProductArt.jsx — On-brand placeholder visuals for products.
// Apparel silhouette with a very faint zegrze.co mark. Monochrome.
// Not photorealistic — intentionally graphic, like Yeezy/ACG lookbooks.

const SHAPES = {
  TEE: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path
        d="M 100 120 L 60 150 L 80 210 L 130 180 L 130 420 L 270 420 L 270 180 L 320 210 L 340 150 L 300 120 L 240 100 Q 200 130 160 100 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2"
      />
    </svg>
  ),
  HOODIE: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path
        d="M 100 130 L 55 165 L 80 240 L 130 210 L 130 440 L 270 440 L 270 210 L 320 240 L 345 165 L 300 130 L 240 110 Q 200 95 160 110 Z M 160 110 Q 200 145 240 110 Q 240 85 200 80 Q 160 85 160 110 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
      />
      <line x1="200" y1="120" x2="200" y2="220" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    </svg>
  ),
  CAP: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path
        d="M 100 260 Q 100 180 200 175 Q 300 180 300 260 L 360 285 L 340 310 L 100 310 Q 90 285 100 260 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
      />
    </svg>
  ),
  TOTE: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path d="M 150 130 Q 150 80 200 80 Q 250 80 250 130" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
      <path
        d="M 110 130 L 290 130 L 310 430 L 90 430 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
      />
    </svg>
  ),
  CREWNECK: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path
        d="M 100 125 L 55 160 L 80 235 L 130 205 L 130 435 L 270 435 L 270 205 L 320 235 L 345 160 L 300 125 L 240 105 Q 200 130 160 105 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
      />
      <path d="M 170 115 Q 200 135 230 115" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  BEANIE: (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%" }}>
      <path
        d="M 120 300 Q 120 160 200 155 Q 280 160 280 300 L 290 330 L 110 330 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
      />
      <line x1="120" y1="305" x2="280" y2="305" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  ),
};

function ProductArt({ name, image }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{ width: "min(62vh, 62vw)", height: "min(62vh, 62vw)" }}>
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          SHAPES[name] ?? SHAPES.TEE
        )}
      </div>
    </div>
  );
}

window.ProductArt = ProductArt;
