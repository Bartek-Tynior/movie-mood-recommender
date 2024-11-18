import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "./lib/utils";
import "./styles/globals.css";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "MoodFlix",
  description: "Watch movies and TV shows based on your mood.",
};

const satoshi = localFont({
  src: "./fonts/Satoshi-Regular.woff2",
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-[#0F0F0F] text-white font-sans antialiased select-none",
            satoshi.variable
          )}
        >
          <Navbar />

          {children}

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
