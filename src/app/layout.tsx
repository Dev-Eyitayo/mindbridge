import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MindBridge",
    template: "%s — MindBridge",
  },
  description: "A safe, private space to reflect, track your emotions, and find support.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://mindbridge.app",
    title: "MindBridge",
    description: "AI-powered mental wellness: daily reflection, mood tracking, and specialist support.",
    siteName: "MindBridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MindBridge — Your mental wellness companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindBridge",
    description: "AI-powered mental wellness: daily reflection, mood tracking, and specialist support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSerifDisplay.variable} font-sans bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          <Toaster
            richColors
            position="top-center"
            theme="system"
            className="font-sans"
            toastOptions={{
              style: {
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}