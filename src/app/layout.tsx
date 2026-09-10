import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "The Spring Edit by LeafGrid — Creative Nature Workshops",
  description:
    "Join The Spring Edit by LeafGrid — nature-inspired creative workshops in Hyderabad. Pottery, bouquet making, terrariums & more.",
  authors: [{ name: "LeafGrid" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "The Spring Edit by LeafGrid",
    description: "Nature-inspired creative workshops in Hyderabad. Register now starting at ₹599.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spring Edit by LeafGrid",
    description: "Nature-inspired creative workshops in Hyderabad. Register now starting at ₹599.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101814",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
