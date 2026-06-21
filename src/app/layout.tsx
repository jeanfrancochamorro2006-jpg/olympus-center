import type { Metadata } from "next";
import { Poppins, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const retro = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-retro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OlympusCenter | Hardware & Componentes de PC",
  description:
    "Tienda especializada en hardware de computadoras: procesadores, tarjetas gráficas, placas base, memoria RAM y más. Precios competitivos y envío a todo el país.",
  icons: {
    icon: "/IMG/LOGO/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full ${poppins.variable} ${retro.variable}`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
