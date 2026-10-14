import type { Metadata } from "next";
import { Providers } from "../components/Providers";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEI Kuwait Chapter",
  description:
    "The Institution of Engineers (India), Kuwait Chapter — website with members' area, job portal and EC desk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main><Providers>{children}</Providers></main>
        <SiteFooter />
      </body>
    </html>
  );
}
