import Navbar from "@/components/layouts/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={plus_jakarta_sans.className}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
