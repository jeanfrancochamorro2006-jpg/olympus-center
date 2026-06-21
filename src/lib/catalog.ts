export type Product = {
  id: string;
  category: string;
  brand: string;
  title: string;
  specs: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  freeShipping?: boolean;
  image: string;
  image2?: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

const GPU = "/IMG/Tarjeta%20Grafica";

export const categories: Category[] = [
  { slug: "procesadores", name: "Procesadores", tagline: "CPUs Intel y AMD para gaming y productividad" },
  { slug: "tarjetas", name: "Tarjetas Gráficas", tagline: "GPUs NVIDIA y Radeon de última generación" },
  { slug: "placas", name: "Placas Base", tagline: "Mainboards Intel y AMD, DDR4 y DDR5" },
  { slug: "memoria", name: "Memoria RAM", tagline: "Módulos DDR4 y DDR5 de alto rendimiento" },
  { slug: "almacenamiento", name: "Almacenamiento", tagline: "SSD NVMe, SATA y discos duros" },
  { slug: "fuentes", name: "Fuentes de Poder", tagline: "Fuentes certificadas 80 Plus" },
  { slug: "cases", name: "Cases", tagline: "Gabinetes gaming con flujo de aire optimizado" },
  { slug: "coolers", name: "Coolers", tagline: "Refrigeración líquida y por aire" },
];

export const products: Product[] = [
  // Procesadores
  { id: "cpu-i9-12900f", category: "procesadores", brand: "Intel", title: "Procesador Intel Core i9-12900F", specs: "16 núcleos · 24 hilos · hasta 5.1 GHz", price: 1599, oldPrice: 1899, rating: 5, reviews: 128, freeShipping: true, image: "/IMG/Procesadores/procesador-intel-core-i9-12900f.png" },
  { id: "cpu-ryzen9-7900x", category: "procesadores", brand: "AMD", title: "Procesador AMD Ryzen 9 7900X AM5", specs: "12 núcleos · 24 hilos · hasta 5.6 GHz", price: 1749, oldPrice: 2050, rating: 4.6, reviews: 92, freeShipping: true, image: "/IMG/Procesadores/procesador-amd-ryzen-9-7900x-am5.png" },
  { id: "cpu-ryzen7-5700g", category: "procesadores", brand: "AMD", title: "Procesador AMD Ryzen 7 5700G con Radeon Graphics", specs: "8 núcleos · AM4 · hasta 4.6 GHz", price: 749, rating: 5, reviews: 340, freeShipping: true, image: "/IMG/Procesadores/procesador-amd-ryzen-7-5700g.png" },
  { id: "cpu-ryzen7-8700f", category: "procesadores", brand: "AMD", title: "Procesador AMD Ryzen 7 8700F", specs: "8 núcleos · AM5 · 4.1 - 5.0 GHz", price: 899, oldPrice: 999, rating: 4.5, reviews: 57, image: "/IMG/Procesadores/procesador-amd-ryzen-7-8700f-4-1-5-0.png" },
  { id: "cpu-ryzen5-5600gt", category: "procesadores", brand: "AMD", title: "Procesador AMD Ryzen 5 5600GT", specs: "6 núcleos · AM4 · hasta 4.6 GHz", price: 549, oldPrice: 629, rating: 4.7, reviews: 210, freeShipping: true, image: "/IMG/Procesadores/procesador-amd-ryzen-5-5600gt.png", image2: "/IMG/Procesadores/procesador-amd-ryzen-5-5600gt%20copy.png" },
  { id: "cpu-i5-10400f", category: "procesadores", brand: "Intel", title: "Procesador Intel Core i5-10400F", specs: "6 núcleos · 12 hilos · hasta 4.3 GHz", price: 399, rating: 4.4, reviews: 180, image: "/IMG/Procesadores/procesador-intel-core-i5-10400f.png" },

  // Tarjetas Gráficas
  { id: "gpu-asus-rtx5070ti", category: "tarjetas", brand: "ASUS", title: "ASUS Prime GeForce RTX 5070 Ti", specs: "16GB GDDR7 · PCIe 5.0", price: 3899, oldPrice: 4299, rating: 5, reviews: 64, freeShipping: true, image: `${GPU}/vga-asus-geforce-nvidia-prime-rtx-5070-t.png` },
  { id: "gpu-gigabyte-rtx4060", category: "tarjetas", brand: "Gigabyte", title: "Gigabyte GeForce RTX 4060 Eagle OC", specs: "8GB GDDR6 · DLSS 3", price: 1399, oldPrice: 1599, rating: 4.6, reviews: 210, freeShipping: true, image: `${GPU}/vga-gigabyte-geforce-nvidia-rtx-4060-eag.png` },
  { id: "gpu-gigabyte-rx7700xt", category: "tarjetas", brand: "Gigabyte", title: "Gigabyte Radeon RX 7700 XT Gaming OC", specs: "12GB GDDR6 · RDNA 3", price: 1899, oldPrice: 2099, rating: 4.5, reviews: 48, freeShipping: true, image: `${GPU}/vga-gigabyte-radeon-rx-7700-xt-gaming-oc.png`, image2: `${GPU}/vga-gigabyte-radeon-rx-7700-xt-gaming-oc11.png` },
  { id: "gpu-msi-rtx3050", category: "tarjetas", brand: "MSI", title: "MSI GeForce RTX 3050 Gaming X", specs: "8GB GDDR6 · PCIe 4.0", price: 999, rating: 4.3, reviews: 156, image: `${GPU}/vga-msi-geforce-nvidia-rtx-3050-gaming-x.png` },

  // Placas Base
  { id: "mb-asrock-h610m", category: "placas", brand: "ASRock", title: "Placa ASRock H610M-AC WiFi", specs: "LGA 1700 · DDR4 · WiFi", price: 399, rating: 4.2, reviews: 40, image: "/IMG/Placas/mainboard-asrock-h610m-ac-wifi-lga-170.png" },
  { id: "mb-asus-b760m-ax", category: "placas", brand: "ASUS", title: "Placa ASUS Prime B760M-A AX6 II DDR5", specs: "LGA 1700 · DDR5 · WiFi 6", price: 799, oldPrice: 899, rating: 4.6, reviews: 72, freeShipping: true, image: "/IMG/Placas/mainboard-asus-prime-b760m-a-ax6-ii-ddr.png" },
  { id: "mb-asus-b760m-d4", category: "placas", brand: "ASUS", title: "Placa ASUS Prime B760M-A D4", specs: "LGA 1700 · DDR4", price: 699, rating: 4.5, reviews: 55, image: "/IMG/Placas/mainboard-asus-prime-b760m-a-d4-lga-170.png" },
  { id: "mb-asus-z790a", category: "placas", brand: "ASUS", title: "Placa ASUS Prime Z790-A WiFi", specs: "LGA 1700 · DDR5 · WiFi", price: 1299, oldPrice: 1499, rating: 4.7, reviews: 38, freeShipping: true, image: "/IMG/Placas/mainboard-asus-prime-z790-a-wifi-lga-17.png" },
  { id: "mb-asus-z890e", category: "placas", brand: "ASUS ROG", title: "Placa ASUS ROG Strix Z890-E Gaming WiFi", specs: "LGA 1851 · DDR5 · PCIe 5.0", price: 2199, oldPrice: 2499, rating: 5, reviews: 48, freeShipping: true, image: "/IMG/Placas/mainboard-asus-rog-xtrix-z890-e-gaming.png" },
  { id: "mb-asus-tuf-b760m", category: "placas", brand: "ASUS TUF", title: "Placa ASUS TUF Gaming B760M-Plus WiFi", specs: "LGA 1700 · DDR5 · WiFi", price: 949, rating: 4.6, reviews: 61, freeShipping: true, image: "/IMG/Placas/mainboard-asus-tuf-gaming-b760m-plis-wif.png" },
  { id: "mb-gigabyte-h470m", category: "placas", brand: "Gigabyte", title: "Placa Gigabyte H470M-H", specs: "LGA 1200 · DDR4", price: 349, rating: 4.1, reviews: 33, image: "/IMG/Placas/mainboard-gigabyte-h470m-h-lga-1200.png" },
  { id: "mb-msi-prob760m", category: "placas", brand: "MSI", title: "Placa MSI PRO B760M-E", specs: "LGA 1700 · DDR4", price: 469, rating: 4.3, reviews: 47, image: "/IMG/Placas/mainboard-msi-pro-b760m-e-lga-1700.png" },
  { id: "mb-msi-z890", category: "placas", brand: "MSI", title: "Placa MSI Z890 Gaming Plus WiFi DDR5", specs: "LGA 1851 · DDR5 · WiFi", price: 1599, oldPrice: 1799, rating: 4.6, reviews: 29, freeShipping: true, image: "/IMG/Placas/mainboard-msi-z890-gaming-plus-wifi-ddr.png" },

  // Almacenamiento
  { id: "sto-seagate-1tb", category: "almacenamiento", brand: "Seagate", title: "Disco Duro Seagate Barracuda 1TB", specs: "3.5\" · 7200 RPM · SATA III", price: 169, rating: 4.5, reviews: 420, image: "/IMG/Almacenamiento/disco-duro-seagate-barracuda-1tb.png" },
  { id: "sto-kingston-kc3000", category: "almacenamiento", brand: "Kingston", title: "SSD Kingston KC3000 2TB M.2 PCIe 4.0", specs: "NVMe · hasta 7,000 MB/s", price: 689, oldPrice: 829, rating: 5, reviews: 176, freeShipping: true, image: "/IMG/Almacenamiento/ssd-kingston-kc3000-2tb-m-2-pcie-4-0-nv.png" },
  { id: "sto-kingston-fury", category: "almacenamiento", brand: "Kingston", title: "SSD Kingston Fury Renegade 1TB M.2", specs: "PCIe 4.0 · NVMe", price: 459, oldPrice: 519, rating: 4.7, reviews: 88, freeShipping: true, image: "/IMG/Almacenamiento/ssd-kingston-fury-renegade-1tb-m-2-pc.png", image2: "/IMG/Almacenamiento/ssd-kingston-fury-renegade-1tb-m-22-pc.png" },
  { id: "sto-kingston-nv3", category: "almacenamiento", brand: "Kingston", title: "SSD Kingston NV3 1TB M.2 2280 NVMe", specs: "PCIe 4.0 · NVMe", price: 289, rating: 4.5, reviews: 132, freeShipping: true, image: "/IMG/Almacenamiento/ssd-kingston-nv3-1tb-m-2-2280-nvme-p.png" },
  { id: "sto-hiksemi-future", category: "almacenamiento", brand: "HIKSEMI", title: "SSD HIKSEMI Future Lite 512GB M.2", specs: "PCIe 4.0 · NVMe", price: 179, rating: 4.3, reviews: 64, image: "/IMG/Almacenamiento/ssd-hiksemi-future-lite-512gb-m-2-pcie-4.png" },
  { id: "sto-adata-se800", category: "almacenamiento", brand: "ADATA", title: "SSD Externo ADATA SE800 500GB", specs: "USB 3.2 Gen 2 · Resistente al agua", price: 219, oldPrice: 259, rating: 4.6, reviews: 97, image: "/IMG/Almacenamiento/ssd-externo-adata-se800-500gb-usb-3-2-g.png", image2: "/IMG/Almacenamiento/ssd-externo-adata-se800-500gb-usb-3-22222-g.png" },
  { id: "sto-hiksemi-case", category: "almacenamiento", brand: "HIKSEMI", title: "Case Portable HIKSEMI USB 3.2 Type-C", specs: "Para SSD M.2 · USB-C", price: 49, rating: 4.2, reviews: 30, image: "/IMG/Almacenamiento/case-portable-hitsemi-usb-3-2-type-c.png" },

  // Fuentes
  { id: "psu-antryx-650", category: "fuentes", brand: "Antryx", title: "Fuente Antryx XBR 650 80 Plus", specs: "650W · 80 Plus", price: 219, rating: 4.2, reviews: 58, image: "/IMG/Fuentes/fuente-de-poder-antryx-xbr-650-80-plus.png" },
  { id: "psu-asus-rog-750g", category: "fuentes", brand: "ASUS ROG", title: "Fuente ASUS ROG Strix 750G 80 Plus Gold", specs: "750W · Full Modular", price: 629, rating: 4.7, reviews: 57, freeShipping: true, image: "/IMG/Fuentes/fuente-de-poder-asus-rog-strix-750g-80.png" },
  { id: "psu-cm-gxii", category: "fuentes", brand: "Cooler Master", title: "Fuente Cooler Master GX II Gold 650W", specs: "650W · 80 Plus Gold", price: 339, oldPrice: 399, rating: 4.5, reviews: 72, freeShipping: true, image: "/IMG/Fuentes/fuente-de-poder-cooler-master-gx-ii-gold.png", image2: "/IMG/Fuentes/fuente-de-poder-cooler-master-gx-ii-gold22.png" },
  { id: "psu-corsair-cx550", category: "fuentes", brand: "Corsair", title: "Fuente Corsair CX550 80 Plus Bronze", specs: "550W · 80 Plus Bronze", price: 259, rating: 4.4, reviews: 140, image: "/IMG/Fuentes/fuente-de-poder-corsair-cx550-80-plus-b.png" },

  // Cases
  { id: "case-asus-gt302", category: "cases", brand: "ASUS TUF", title: "Case ASUS TUF Gaming GT302 ARGB White", specs: "Mid Tower · Vidrio templado · ARGB", price: 549, oldPrice: 639, rating: 4.5, reviews: 39, freeShipping: true, image: "/IMG/Case/case-asus-tuf-gaming-gt302-argb-white.png" },
  { id: "case-gigabyte-c301", category: "cases", brand: "Gigabyte", title: "Case Gigabyte C301 Glass White ARGB", specs: "Mid Tower · Vidrio templado · ARGB", price: 429, rating: 4.4, reviews: 52, image: "/IMG/Case/case-gigabyte-c301-glass-white-argb.png" },
  { id: "case-gamemax-asgard", category: "cases", brand: "GameMax", title: "Case GameMax Asgard LED Rojo + Fuente", specs: "Mid Tower · LED · Fuente incluida", price: 269, oldPrice: 319, rating: 4.2, reviews: 76, image: "/IMG/Case/case-gaming-gamemax-asgard-led-rojo-fuen.png" },
  { id: "case-gamemax-kinglight", category: "cases", brand: "GameMax", title: "Case GameMax Kinglight Rojo + Fuente", specs: "Mid Tower · LED · Fuente incluida", price: 249, rating: 4.1, reviews: 61, image: "/IMG/Case/case-gaming-gamemax-kinglight-rojo-c-fue.png" },

  // Coolers
  { id: "cool-deepcool-assassin", category: "coolers", brand: "DeepCool", title: "Cooler DeepCool Assassin", specs: "Disipador por aire premium · Doble torre", price: 329, oldPrice: 379, rating: 4.8, reviews: 44, freeShipping: true, image: "/IMG/Cooler/cooler-de-procesador-deepcool-assassin-i.png" },
  { id: "cool-liquid-240", category: "coolers", brand: "OlympusTech", title: "Cooler Líquido RGB 240mm", specs: "Refrigeración líquida · ARGB", price: 279, rating: 4.3, reviews: 38, image: "/IMG/Cooler/11rgwf6x.png" },
  { id: "cool-air-rgb", category: "coolers", brand: "OlympusTech", title: "Cooler de Aire RGB", specs: "Disipador por aire · ARGB", price: 139, rating: 4.2, reviews: 55, image: "/IMG/Cooler/8dt1ekcr.png" },
];

export function formatPEN(value: number): string {
  return "S/ " + value.toLocaleString("es-PE");
}

export function discountPercent(p: Product): number | null {
  if (!p.oldPrice || p.oldPrice <= p.price) return null;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

const byId = new Map(products.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return byId.get(id);
}

// Imagen secundaria para el hover. Usa image2 si existe; si no,
// toma como vista referencial la foto del siguiente producto de la misma categoría.
export function hoverImage(p: Product): string | undefined {
  if (p.image2) return p.image2;
  const cat = products.filter((x) => x.category === p.category);
  if (cat.length < 2) return undefined;
  const i = cat.findIndex((x) => x.id === p.id);
  return cat[(i + 1) % cat.length].image;
}

export function relatedProducts(product: Product, limit = 5): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

// Imagen representativa de cada categoría (para portadas/carruseles)
const categoryCoverOverrides: Record<string, string> = {
  procesadores: "/IMG/Procesadores/procesador-amd-ryzen-9-7900x-am5.png",
  tarjetas: "/IMG/Tarjeta%20Grafica/vga-asus-geforce-nvidia-prime-rtx-5070-t.png",
  placas: "/IMG/Placas/mainboard-asus-rog-xtrix-z890-e-gaming.png",
  almacenamiento: "/IMG/Almacenamiento/ssd-kingston-kc3000-2tb-m-2-pcie-4-0-nv.png",
  fuentes: "/IMG/Fuentes/fuente-de-poder-asus-rog-strix-750g-80.png",
  cases: "/IMG/Case/case-asus-tuf-gaming-gt302-argb-white.png",
  coolers: "/IMG/Cooler/cooler-de-procesador-deepcool-assassin-i.png",
};

export function categoryCover(slug: string): string | undefined {
  return categoryCoverOverrides[slug] ?? productsByCategory(slug)[0]?.image;
}

export const featured = products.filter((p) => discountPercent(p)).slice(0, 4);
export const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
export const onSale = products.filter((p) => discountPercent(p));

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
