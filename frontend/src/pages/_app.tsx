import "@/styles/globals.css";
import "@/styles/rank.css";
import "@/styles/instruction.css";
import "@/styles/sideBar.css";
import "@/styles/index.css";
import "@/styles/game.css";
import "@/styles/form.css";
import Auth from "@/components/Auth";
import SideBare from "@/components/SideBar";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const queryClient = new QueryClient();

interface LanguageContext {
  language: string;
  setLanguage: (language: string) => void;
}

export const languageContext = createContext<LanguageContext>({
  language: "En",
  setLanguage: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [language, setLanguage] = useState("En");
  return (
    <>
      <languageContext.Provider value={{ language, setLanguage }}>
        <QueryClientProvider client={queryClient}>
          {showAuth && <Auth setShowAuth={setShowAuth} />}
          <SideBare setShowAuth={setShowAuth} />
          <div className="main">
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </languageContext.Provider>
    </>
  );
}
