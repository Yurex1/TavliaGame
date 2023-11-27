import "@/styles/globals.css";
import Auth from "@/components/Auth";
import SideBare from "@/components/SideBar";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import useUser from "@/hooks/useUser";
// import axios from "axios";
// import API_URL from "@/constants";
import React from "react";

const queryClient = new QueryClient();

// const get = async () => {
//   const user = await axios.get(API_URL + "auth/profile").catch((err) => {console.log("fsfsdf", err);});
//   return user;
// }

export default function App({ Component, pageProps }: AppProps) {
  const [showAuth, setShowAuth] = useState(false);
  // const user = get();
  // console.log(user);
  return (
    <>
     <QueryClientProvider client={queryClient}>
      {showAuth &&  < Auth setShowAuth = {setShowAuth}/>}
      <SideBare setShowAuth={setShowAuth}/>
      <div className="main">
        <Component  {...pageProps} />
      </div>
      </QueryClientProvider>
    </>
  );
}
