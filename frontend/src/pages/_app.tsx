import "@/styles/globals.css";
import Auth from "@components/Auth";
import SideBare from "@components/SideBar";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <>
      {showAuth &&  < Auth setShowAuth = {setShowAuth} />}
      <SideBare setShowAuth={setShowAuth}/>
      <div className="main">
        <Component  {...pageProps} />
      </div>
    </>
  );
}
