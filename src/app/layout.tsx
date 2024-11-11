import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
// import { Toaster } from "@/components/ui/toaster";

const fredoka = Lexend({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Review Tool",
  description: "Review codes and colaborate effortlesly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>

        <body className={fredoka.className}>
          <main> {children}</main>
        </body>
      </Provider>
    </html>
  );
}
