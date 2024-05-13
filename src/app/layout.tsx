import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Sidebar from "~/components/sidebar";
import { Toaster } from "~/components/ui/toaster";
import {ClerkProvider} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Technical Test",
  description: "Technical Test by Akbar Siddiq",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`font-sans ${inter.variable} bg-gray-100`}>
          <Sidebar>{children}</Sidebar>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
