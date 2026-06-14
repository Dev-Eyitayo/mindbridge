import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['normal', 'italic'],
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: "MindBridge",
  description: "Mental Wellness AI Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-900`}>
        <AuthProvider>
          {/* THE TOASTER MUST BE HERE */}
          <Toaster richColors position="top-center" theme="light" className="font-sans" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}