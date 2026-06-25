import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "MindBridge", template: "%s · MindBridge" },
  description: "A private space to reflect, track your mood, and find support.",
  icons: { icon: "/mind.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    url: "https://mindbridge.pxxl.run",
    title: "MindBridge",
    description: "AI-powered mental wellness. Private. Empathetic. Yours.",
    siteName: "MindBridge",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans, var(--font-sans))" }}
      >
        <AuthProvider>
          <Toaster
            richColors
            position="top-center"
            theme="light"
            toastOptions={{
              style: {
                fontFamily: "var(--font-geist-sans, system-ui)",
                fontSize: "13px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}