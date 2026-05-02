// App.jsx — zegrze.co store. Minimal. Glass. Full-bleed.

const { useState, useEffect, useRef, useMemo } = React;

// ——— Icons: thin, monoline, Apple-esque ————————————————————————
const Icon = {
  Arrow: ({ dir = "right", size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{
      transform: dir === "left" ? "rotate(180deg)" : "none",
    }}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bag: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 8V6.5a3 3 0 1 1 6 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Heart: ({ filled, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Close: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Plus: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Minus: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Grid: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Single: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="5" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

// ——— Lake backdrop: moody gradient + soft orbs for glass to refract ————
function Backdrop({ hue, variant }) {
  // variant: "dusk" | "night" | "dawn"
  const palettes = {
    dusk:  { a: `oklch(0.22 0.07 ${hue})`, b: `oklch(0.10 0.05 ${hue + 10})`, c: `oklch(0.35 0.09 ${hue - 20})` },
    night: { a: `oklch(0.14 0.05 ${hue})`, b: `oklch(0.05 0.02 ${hue})`,       c: `oklch(0.22 0.06 ${hue + 15})` },
    dawn:  { a: `oklch(0.32 0.06 ${hue + 25})`, b: `oklch(0.15 0.04 ${hue})`,  c: `oklch(0.45 0.10 ${hue + 40})` },
  };
  const p = palettes[variant] ?? palettes.dusk;
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      background: `
        radial-gradient(ellipse 80% 50% at 20% 20%, ${p.c} 0%, transparent 55%),
        radial-gradient(ellipse 60% 60% at 85% 80%, ${p.a} 0%, transparent 60%),
        linear-gradient(180deg, ${p.a} 0%, ${p.b} 100%)
      `,
      transition: "background 900ms ease",
    }}>
      {/* soft star */}
      <div style={{
        position: "absolute",
        left: "72%", top: "18%",
        width: 180, height: 180,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${p.c} 0%, transparent 70%)`,
        filter: "blur(40px)",
        opacity: 0.9,
      }}/>
    </div>
  );
}

// ——— Product Stage: single, full-bleed product, with swipe ——————————
function ProductStage({ product, direction, onEnter }) {
  return (
    <div
      key={product.id}
      onAnimationEnd={onEnter}
      style={{
        position: "absolute",
        inset: 0,
        animation: `slideIn${direction === 1 ? "Right" : "Left"} 700ms cubic-bezier(.22,.9,.3,1)`,
      }}
    >
      <ProductArt name={product.name} image={product.image} />
    </div>
  );
}

// ——— Grid view: all products at once ————————————————————————————
function GridView({ products, onPick, liked, toggleLike }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gap: 12,
      padding: "100px 5vw 140px",
      animation: "fadeIn 400ms ease",
    }}>
      {products.map((p, i) => (
        <button
          key={p.id}
          onClick={() => onPick(i)}
          style={{
            position: "relative",
            border: "none",
            borderRadius: 24,
            cursor: "pointer",
            overflow: "hidden",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: LIQUID_SHADOW,
            transition: "transform 300ms cubic-bezier(.2,.9,.3,1.4)",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.015)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <ProductArt name={p.name} image={p.image} />
          </div>
          {/* corner code */}
          <div style={{
            position: "absolute", top: 14, left: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.45)",
          }}>{p.code}</div>
          {/* corner price */}
          <div style={{
            position: "absolute", bottom: 14, left: 16,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.02em",
          }}>{p.price}<span style={{opacity: 0.5, marginLeft: 4}}>zł</span></div>
          {/* like */}
          <div
            onClick={(e) => { e.stopPropagation(); toggleLike(p.id); }}
            style={{
              position: "absolute", top: 10, right: 10,
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              color: liked.has(p.id) ? "#ff5a5a" : "#fff",
            }}
          >
            <Icon.Heart filled={liked.has(p.id)} size={14}/>
          </div>
        </button>
      ))}
    </div>
  );
}

// ——— Size picker (fixed-width row; collapses to centered ONE SIZE label) —
function SizeRow({ product, selected, onSelect }) {
  const isOneSize = product.sizes.length === 1 && product.sizes[0] === "OS";
  if (isOneSize) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 40,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.7)",
      }}>
        {`ONE SIZE${product.oneSizeNote ? ` (${product.oneSizeNote})` : ""}`}
      </div>
    );
  }
  const MAX = 4;
  const slots = [...product.sizes];
  while (slots.length < MAX) slots.push(null);
  return (
    <div style={{ display: "flex", gap: 6, width: 220, justifyContent: "center" }}>
      {slots.map((s, i) => (
        s ? (
          <GlassPill
            key={i}
            active={selected === s}
            onClick={() => onSelect(s)}
            style={{ width: 48, minWidth: 48, padding: "10px 0", fontSize: 13 }}
          >
            {s}
          </GlassPill>
        ) : (
          <div key={i} style={{ width: 48, height: 40 }} />
        )
      ))}
    </div>
  );
}

// ——— Cart Drawer ——————————————————————————————————————————————
function CartDrawer({ open, items, onClose, onRemove, onQty }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: open ? "auto" : "none",
        background: open ? "rgba(0,0,0,0.35)" : "transparent",
        transition: "background 350ms ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          right: 16, top: 16, bottom: 16,
          width: "min(440px, calc(100vw - 32px))",
          borderRadius: 32,
          padding: 24,
          background: "rgba(20,22,28,0.55)",
          backdropFilter: "blur(50px) saturate(180%)",
          WebkitBackdropFilter: "blur(50px) saturate(180%)",
          boxShadow: LIQUID_SHADOW + ", 0 30px 80px rgba(0,0,0,0.5)",
          color: "#fff",
          transform: open ? "translateX(0)" : "translateX(calc(100% + 24px))",
          transition: "transform 500ms cubic-bezier(.2,.9,.3,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em", opacity: 0.5 }}>TORBA · {items.length}</span>
          <GlassCircle onClick={onClose} size={40} ariaLabel="Zamknij"><Icon.Close size={16}/></GlassCircle>
        </div>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 24, marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.length === 0 && (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0.3, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em",
            }}>·  ·  ·</div>
          )}
          {items.map(it => (
            <div key={it.key} style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 12,
              borderRadius: 20,
              background: "rgba(255,255,255,0.06)",
              boxShadow: LIQUID_SHADOW,
            }}>
              <div style={{
                position: "relative",
                width: 64, height: 64,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <div style={{ position: "absolute", inset: 0, transform: "scale(0.7)" }}>
                  <ProductArt name={it.name} image={it.image} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", opacity: 0.5 }}>
                  {it.code} · {it.name} · {it.size}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{it.price * it.qty}<span style={{ opacity: 0.5, marginLeft: 3, fontSize: 12 }}>zł</span></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <GlassCircle size={30} onClick={() => onQty(it.key, -1)} ariaLabel="Zmniejsz"><Icon.Minus size={12}/></GlassCircle>
                <span style={{ minWidth: 20, textAlign: "center", fontSize: 13, fontWeight: 600 }}>{it.qty}</span>
                <GlassCircle size={30} onClick={() => onQty(it.key, +1)} ariaLabel="Zwiększ"><Icon.Plus size={12}/></GlassCircle>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 14px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em", opacity: 0.5 }}>TOTAL</span>
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
            {total}<span style={{ opacity: 0.5, marginLeft: 4, fontSize: 14 }}>zł</span>
          </span>
        </div>

        <GlassPill
          active={true}
          onClick={() => alert("→ do kasy")}
          style={{ width: "100%", padding: "18px 24px", fontSize: 14, letterSpacing: "0.25em" }}
        >
          →
        </GlassPill>
      </div>
    </div>
  );
}

// ——— Favorites Drawer ——————————————————————————————————————————
function FavDrawer({ open, products, liked, onClose, onPick, toggleLike }) {
  const items = products.filter(p => liked.has(p.id));
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: open ? "auto" : "none",
        background: open ? "rgba(0,0,0,0.35)" : "transparent",
        transition: "background 350ms ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          right: 16, top: 16, bottom: 16,
          width: "min(440px, calc(100vw - 32px))",
          borderRadius: 32,
          padding: 24,
          background: "rgba(20,22,28,0.55)",
          backdropFilter: "blur(50px) saturate(180%)",
          WebkitBackdropFilter: "blur(50px) saturate(180%)",
          boxShadow: LIQUID_SHADOW + ", 0 30px 80px rgba(0,0,0,0.5)",
          color: "#fff",
          transform: open ? "translateX(0)" : "translateX(calc(100% + 24px))",
          transition: "transform 500ms cubic-bezier(.2,.9,.3,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em", opacity: 0.5 }}>
            ULUBIONE · {items.length}
          </span>
          <GlassCircle onClick={onClose} size={40} ariaLabel="Zamknij"><Icon.Close size={16}/></GlassCircle>
        </div>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 24, marginBottom: 8, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.length === 0 && (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              opacity: 0.4, gap: 14,
            }}>
              <Icon.Heart size={28}/>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.3em" }}>
                NIC TU JESZCZE NIE MA
              </div>
            </div>
          )}
          {items.map(p => (
            <button
              key={p.id}
              onClick={() => { onPick(p.id); onClose(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: 12,
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                boxShadow: LIQUID_SHADOW,
                border: "none",
                cursor: "pointer",
                color: "#fff",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <div style={{
                position: "relative",
                width: 64, height: 64,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <div style={{ position: "absolute", inset: 0, transform: "scale(0.7)" }}>
                  <ProductArt name={p.name} image={p.image} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", opacity: 0.5 }}>
                  {p.code}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2, letterSpacing: "0.05em" }}>{p.name}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginRight: 4 }}>
                {p.price}<span style={{ opacity: 0.5, marginLeft: 3, fontSize: 11 }}>zł</span>
              </div>
              <div
                onClick={(e) => { e.stopPropagation(); toggleLike(p.id); }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.08)",
                  color: "#ff5a5a",
                  flexShrink: 0,
                }}
              >
                <Icon.Heart filled size={13}/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ——— Root ——————————————————————————————————————————————————————————
function App() {
  const TWEAKS = /*EDITMODE-BEGIN*/{
    "backdrop": "dusk",
    "hue": 212,
    "defaultView": "stage"
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = useState(TWEAKS);
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [idx, setIdx] = useState(() => {
    const saved = localStorage.getItem("zegrze-idx");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [direction, setDirection] = useState(1);
  const [selectedSize, setSelectedSize] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState(new Set());
  const [view, setView] = useState("stage"); // stage | grid
  const [adding, setAdding] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const lastWheelAtRef = useRef(0);
  const imageSources = useMemo(
    () => PRODUCTS.map(p => p.image).filter(Boolean),
    []
  );

  useEffect(() => { localStorage.setItem("zegrze-idx", String(idx)); }, [idx]);

  // Preload all product images once to avoid delayed per-product loading.
  useEffect(() => {
    if (imageSources.length === 0) {
      setImagesReady(true);
      setPreloadProgress(1);
      return;
    }
    let cancelled = false;
    let done = 0;
    const total = imageSources.length;
    const timeoutId = setTimeout(() => {
      if (!cancelled) setImagesReady(true);
    }, 5000);
    const markDone = () => {
      done += 1;
      if (cancelled) return;
      setPreloadProgress(done / total);
      if (done >= total) {
        clearTimeout(timeoutId);
        setImagesReady(true);
      }
    };
    imageSources.forEach(src => {
      const img = new Image();
      img.onload = markDone;
      img.onerror = markDone;
      img.src = src;
    });
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [imageSources]);

  // Tweak-mode wiring
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);
  const updateTweak = (key, value) => {
    setTweaks(t => ({ ...t, [key]: value }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
  };

  const product = PRODUCTS[idx];
  const size = selectedSize[product.id] ?? product.sizes[0];
  const cartCount = cart.reduce((n, it) => n + it.qty, 0);

  const go = (d) => {
    setDirection(d);
    setIdx(i => (i + d + PRODUCTS.length) % PRODUCTS.length);
  };

  const addToBag = () => {
    const key = `${product.id}-${size}`;
    setCart(c => {
      const existing = c.find(x => x.key === key);
      if (existing) return c.map(x => x.key === key ? { ...x, qty: x.qty + 1 } : x);
      return [
        ...c,
        {
          key,
          id: product.id,
          code: product.code,
          name: product.name,
          image: product.image,
          price: product.price,
          size,
          qty: 1
        }
      ];
    });
    setAdding(true);
    setTimeout(() => setAdding(false), 900);
  };

  const toggleLike = (id) => {
    setLiked(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  // Keyboard nav
  useEffect(() => {
    const h = (e) => {
      if (view !== "stage") return;
      if (e.key === "ArrowRight") go(+1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [view]);

  // Swipe
  const touchRef = useRef({ x: 0 });
  const onTouchStart = e => { touchRef.current.x = e.touches[0].clientX; };
  const onTouchEnd = e => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (Math.abs(dx) > 50 && view === "stage") go(dx < 0 ? +1 : -1);
  };
  const onWheel = e => {
    if (view !== "stage" || cartOpen || favOpen) return;
    if (Math.abs(e.deltaY) < 12) return;
    const now = Date.now();
    if (now - lastWheelAtRef.current < 450) return;
    lastWheelAtRef.current = now;
    go(e.deltaY > 0 ? +1 : -1);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif",
        color: "#fff",
        userSelect: "none",
      }}
    >
      <Backdrop hue={tweaks.hue} variant={tweaks.backdrop} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          background: "rgba(0,0,0,0.42)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          opacity: imagesReady ? 0 : 1,
          pointerEvents: imagesReady ? "none" : "auto",
          transition: "opacity 480ms ease",
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          opacity: 0.75,
          textTransform: "uppercase",
        }}>
          Ładowanie
        </div>
        <div style={{
          width: 180,
          height: 4,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(255,255,255,0.16)",
        }}>
          <div style={{
            width: `${Math.round(preloadProgress * 100)}%`,
            height: "100%",
            borderRadius: 999,
            background: "rgba(255,255,255,0.92)",
            transition: "width 320ms ease",
          }}/>
        </div>
      </div>

      {/* Top bar — floating elements aligned on a single row */}
      <div style={{
        position: "absolute",
        top: 18,
        left: 16,
        right: 16,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: "none",
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <GlassCircle
            onClick={() => setView(v => v === "stage" ? "grid" : "stage")}
            size={44}
            ariaLabel="Przełącz widok"
          >
            {view === "stage" ? <Icon.Grid size={18}/> : <Icon.Single size={18}/>}
          </GlassCircle>
        </div>

        <img src="assets/logo.webp" alt="zegrze.co" style={{
          height: 26,
          opacity: 0.9,
          filter: "drop-shadow(0 1px 20px rgba(255,255,255,0.25))",
          pointerEvents: "auto",
        }}/>

        <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
          <GlassCircle
            onClick={() => { setCartOpen(false); setFavOpen(true); }}
            size={44}
            ariaLabel="Otwórz ulubione"
            badge={liked.size || undefined}
            style={{ color: liked.size ? "#ff5a5a" : "#fff" }}
          >
            <Icon.Heart filled={liked.size > 0} size={17}/>
          </GlassCircle>
          <GlassCircle
            onClick={() => { setFavOpen(false); setCartOpen(true); }}
            size={44}
            ariaLabel="Otwórz torbę"
            badge={cartCount}
          >
            <Icon.Bag size={18}/>
          </GlassCircle>
        </div>
      </div>

      {/* Content layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {view === "stage" ? (
          <ProductStage product={product} direction={direction} />
        ) : (
          <GridView
            products={PRODUCTS}
            liked={liked}
            toggleLike={toggleLike}
            onPick={(i) => { setIdx(i); setView("stage"); }}
          />
        )}
      </div>

      {/* Bottom bar — two pill groups */}
      {view === "stage" && (
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          zIndex: 25,
          padding: "0 16px 18px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}>
          {/* Size selector with arrows on both sides */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: LIQUID_SHADOW + ", 0 10px 40px rgba(0,0,0,0.35)",
          }}>
            <GlassCircle onClick={() => go(-1)} size={40} ariaLabel="Poprzedni">
              <Icon.Arrow dir="left" size={15}/>
            </GlassCircle>

            <SizeRow
              product={product}
              selected={size}
              onSelect={s => setSelectedSize(m => ({ ...m, [product.id]: s }))}
            />

            <GlassCircle onClick={() => go(+1)} size={40} ariaLabel="Następny">
              <Icon.Arrow dir="right" size={15}/>
            </GlassCircle>
          </div>

          {/* Price + like + add to bag group */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: LIQUID_SHADOW + ", 0 10px 40px rgba(0,0,0,0.35)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "0 16px 0 14px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "#fff",
              minWidth: 72,
              justifyContent: "center",
            }}>
              {product.price}<span style={{ opacity: 0.5, marginLeft: 4, fontSize: 12 }}>zł</span>
            </div>

            <GlassCircle
              onClick={() => toggleLike(product.id)}
              size={40}
              ariaLabel="Polub"
              style={{ color: liked.has(product.id) ? "#ff5a5a" : "#fff" }}
            >
              <Icon.Heart filled={liked.has(product.id)} size={15}/>
            </GlassCircle>

            <div style={{ position: "relative" }}>
              <GlassPill
                active
                onClick={addToBag}
                style={{
                  minWidth: 110,
                  padding: "12px 20px",
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: adding ? 0 : 1,
                  transition: "opacity 200ms",
                }}>
                  <Icon.Bag size={14}/>
                  <Icon.Plus size={11}/>
                </span>
                <span style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: adding ? 1 : 0,
                  transition: "opacity 200ms",
                  fontSize: 18,
                }}>✓</span>
              </GlassPill>
            </div>
          </div>
        </div>
      )}

      {/* Progress dots — horizontal, above action bar */}
      {view === "stage" && (
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: 102,
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i); }}
              aria-label={`Produkt ${i + 1}`}
              style={{
                width: i === idx ? 22 : 4,
                height: 4,
                borderRadius: 2,
                border: "none",
                cursor: "pointer",
                background: i === idx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                transition: "all 400ms cubic-bezier(.2,.9,.3,1.4)",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={key => setCart(c => c.filter(x => x.key !== key))}
        onQty={(key, d) => setCart(c => c.flatMap(x => {
          if (x.key !== key) return [x];
          const n = x.qty + d;
          return n <= 0 ? [] : [{ ...x, qty: n }];
        }))}
      />

      <FavDrawer
        open={favOpen}
        products={PRODUCTS}
        liked={liked}
        onClose={() => setFavOpen(false)}
        onPick={(id) => {
          const i = PRODUCTS.findIndex(p => p.id === id);
          if (i >= 0) { setIdx(i); setView("stage"); }
        }}
        toggleLike={toggleLike}
      />

      {/* Tweaks panel */}
      {tweaksVisible && (
        <div style={{
          position: "fixed", right: 16, bottom: 96, zIndex: 100,
          width: 260,
          padding: 18,
          borderRadius: 22,
          background: "rgba(20,22,28,0.7)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow: LIQUID_SHADOW + ", 0 30px 60px rgba(0,0,0,0.5)",
          color: "#fff",
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.3em", opacity: 0.5 }}>TWEAKS</div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>backdrop</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["dusk", "night", "dawn"].map(v => (
                <button key={v} onClick={() => updateTweak("backdrop", v)} style={{
                  flex: 1, padding: "8px 4px", borderRadius: 999, border: "none", cursor: "pointer",
                  background: tweaks.backdrop === v ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.08)",
                  color: tweaks.backdrop === v ? "#000" : "#fff",
                  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
                }}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
              <span>hue</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tweaks.hue}°</span>
            </div>
            <input
              type="range" min="0" max="360" step="1"
              value={tweaks.hue}
              onChange={e => updateTweak("hue", parseInt(e.target.value, 10))}
              style={{ width: "100%", accentColor: "#fff" }}
            />
          </div>
        </div>
      )}

      {/* Global styles */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(6vw) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-6vw) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body { margin: 0; background: #000; overflow: hidden; }
        button:focus-visible { outline: 2px solid rgba(255,255,255,0.4); outline-offset: 2px; }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </div>
  );
}

window.App = App;
