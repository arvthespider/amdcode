import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Azizah Mutiara Dewi | Graphic Designer Portfolio",
  description:
    "Professional portfolio of Azizah Mutiara Dewi, a graphic designer specializing in social media design, branding, and visual content.",
  keywords: [
    "Graphic Designer",
    "Social Media Design",
    "Visual Content",
    "Azizah Mutiara Dewi",
    "Portfolio"
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Azizah Mutiara Dewi | Graphic Designer Portfolio",
    description: "Graphic designer specializing in social media design, branding, and visual content.",
    url: "https://azizahmutiaradewi.com",
    siteName: "Portfolio Tiara",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azizah Mutiara Dewi | Graphic Designer Portfolio",
    description: "Graphic designer specializing in social media design, branding, and visual content.",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
