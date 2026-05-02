// Product catalogue — minimal, numeric-heavy, low-text
// Using photo-style SVG placeholders for now (on-brand lake merch)

const PRODUCTS = [
  {
    id: "01",
    code: "01",
    name: "BLUZA VINTAGE",
    price: 329,
    sizes: ["S", "M", "L", "XL"],
    image: "mockups/2.webp",
    hue: 212,
    tone: "dark",
  },
  {
    id: "02",
    code: "02",
    name: "KAPELUSZ CAMO",
    price: 169,
    sizes: ["OS"],
    image: "mockups/4.webp",
    hue: 198,
    tone: "mid",
  },
  {
    id: "03",
    code: "03",
    name: "T-SHIRT PORT",
    price: 149,
    sizes: ["S", "M", "L", "XL"],
    image: "mockups/5.webp",
    hue: 220,
    tone: "mid",
  },
  {
    id: "04",
    code: "04",
    name: "BLUZA MINIMAL",
    price: 299,
    sizes: ["S", "M", "L", "XL"],
    image: "mockups/6.webp",
    hue: 205,
    tone: "dark",
  },
  {
    id: "05",
    code: "05",
    name: "OBRAZ NA PLOTNIE",
    price: 249,
    sizes: ["OS"],
    oneSizeNote: "50x70 cm",
    image: "mockups/3.webp",
    hue: 218,
    tone: "mid",
  },
];

window.PRODUCTS = PRODUCTS;
