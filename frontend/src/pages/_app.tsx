import "@/styles/globals.css";
import Auth from "@components/Auth";
import SideBare from "@components/SideBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {true &&  < Auth />}
      <SideBare />
      <div className="main">
        <Component  {...pageProps} />
      </div>
    </>
  );
}
