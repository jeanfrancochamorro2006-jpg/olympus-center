# 🛒 OlympusCenter

Tienda e-commerce especializada en **hardware y componentes de PC** (procesadores, tarjetas gráficas, placas base, almacenamiento, fuentes, cases y coolers). Construida con **Next.js 16** y **Tailwind CSS v4**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)

---

## ✨ Características

- 🏠 **Home** con hero, carrusel automático de categorías, marcas, videos de TikTok embebidos y tiendas con Google Maps.
- 🗂️ **Catálogo de productos** (`/productos`) con filtros (categoría, marca, precio, calificación, ofertas, envío gratis), ordenamiento, búsqueda y **paginación**.
- 🏷️ **Ofertas** integradas como filtro dentro del catálogo.
- 📦 **Ficha de producto** (`/producto/[id]`) con galería, selector de cantidad, especificaciones y productos relacionados.
- 🛍️ **Carrito** funcional con persistencia en `localStorage` (cantidades, favoritos, subtotal).
- 💳 **Checkout** con simulación de pasarela de pago (estilo Stripe), elección de **despacho a domicilio / recojo en tienda** y **boleta electrónica** imprimible (formato ticket térmico 80 mm con IGV).
- 🏪 **Tiendas** con mapas de Google Maps y botón "Cómo llegar".
- 🎨 Diseño **responsive** con menú móvil, tipografía retro (Press Start 2P) + Poppins e íconos de **lucide-react**.

## 🧱 Stack

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Framework / SSR / SSG |
| [React 19](https://react.dev) | UI |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilos |
| [lucide-react](https://lucide.dev) | Íconos |
| TypeScript | Tipado |

## 🚀 Empezar

Requiere **Node.js 18.18+**.

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo
npm run dev
# Abre http://localhost:3000

# 3. Build de producción
npm run build
npm start
```

## 📂 Estructura

```
src/
├─ app/                  # Rutas (App Router)
│  ├─ page.tsx           # Home
│  ├─ productos/         # Catálogo con filtros
│  ├─ producto/[id]/     # Ficha de producto
│  ├─ carrito/           # Carrito
│  ├─ checkout/          # Checkout + boleta
│  ├─ tiendas/           # Tiendas con mapas
│  └─ ...                # nosotros, contacto, ayuda, etc.
├─ components/           # Header, Footer, ProductCard, carrito, checkout...
└─ lib/                  # catálogo de productos, tiendas, íconos
public/IMG/              # Imágenes de productos y logo
```

## 🔧 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servir el build |
| `npm run lint` | Linter (ESLint) |

## 🔐 Variables de entorno

El chatbot legacy usa un token de Hugging Face. **Nunca lo pongas en el código.** Crea un archivo `.env.local`:

```
HF_TOKEN=tu_token_aqui
```

> ⚠️ El archivo `.env*` está en `.gitignore` y no se sube al repositorio.

---

Hecho con ❤️ en Perú · **OlympusCenter**
