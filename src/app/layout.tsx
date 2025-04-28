import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { QueryProvider } from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workforce Management",
  description: "A simple workforce management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900`}>
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
