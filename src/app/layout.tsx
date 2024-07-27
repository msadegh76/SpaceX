import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceX",
  description: "Launch content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary
          fallback={
            <p className="text-red-700 text-lg">Something wrong happened</p>
          }
        >
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
