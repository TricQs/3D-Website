import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"]
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "DISC ARCHIVE — Interactive 3D Anime Rating & Soundtrack Showcase",
  description:
    "Swiss editorial 3D turntable platter and accordion spine-to-cover anime rating & soundtrack archive built with Next.js, React Three Fiber, Tailwind CSS, and GSAP."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-[#EAEAE8] text-[#181818] antialiased">{children}</body>
    </html>
  );
}
