import "@/styles/globals.css";
import SideBare from "@components/SideBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideBare />
      <Component {...pageProps} />
    </>
  );
}
