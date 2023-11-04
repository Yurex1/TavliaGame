import "@/styles/globals.css";
import Auth from "@/components/Auth";
import SideBare from "@/components/SideBar";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  function AuthClick() {
    setLoggedIn(true);
    setShowAuth(false);
  }
  return (
    <>
      {showAuth &&  < Auth AuthClick = {AuthClick}/>}
      <SideBare setLoggedIn = {setLoggedIn} loggedIn = {loggedIn} setShowAuth={setShowAuth}/>
      <div className="main">
        <Component  {...pageProps} />
      </div>
    </>
  );
}
