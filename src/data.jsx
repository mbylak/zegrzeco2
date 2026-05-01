// Product catalogue — minimal, numeric-heavy, low-text
// Using photo-style SVG placeholders for now (on-brand lake merch)

const PRODUCTS = [
  {
    id: "01",
    code: "ZG·01",
    name: "TEE",
    price: 149,
    sizes: ["S", "M", "L", "XL"],
    hue: 212, // lake blue
    tone: "dark",
  },
  {
    id: "02",
    code: "ZG·02",
    name: "HOODIE",
    price: 389,
    sizes: ["S", "M", "L", "XL"],
    hue: 198,
    tone: "dark",
  },
  {
    id: "03",
    code: "ZG·03",
    name: "CAP",
    price: 129,
    sizes: ["OS"],
    hue: 220,
    tone: "mid",
  },
  {
    id: "04",
    code: "ZG·04",
    name: "TOTE",
    price: 89,
    sizes: ["OS"],
    hue: 205,
    tone: "mid",
  },
  {
    id: "05",
    code: "ZG·05",
    name: "CREWNECK",
    price: 299,
    sizes: ["S", "M", "L", "XL"],
    hue: 218,
    tone: "dark",
  },
  {
    id: "06",
    code: "ZG·06",
    name: "BEANIE",
    price: 119,
    sizes: ["OS"],
    hue: 210,
    tone: "mid",
  },
];

window.PRODUCTS = PRODUCTS;
