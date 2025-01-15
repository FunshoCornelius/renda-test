import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "../components/wrappers/ClientWrapper";

import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renda Test",
  description:
    "A simple sign in and sign up page created as a technical test for a role at Renda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased grid place-content-center`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
