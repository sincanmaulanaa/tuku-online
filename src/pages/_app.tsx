import Navbar from "@/components/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const disableNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className={plus_jakarta_sans.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} />
        <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </div>
    </SessionProvider>
  );
}
