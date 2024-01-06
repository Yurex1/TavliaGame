import { FC, useEffect, useRef, useState } from "react";
import Login from "./Login";
import Singup from "./Singup";
import React from 'react'
import authData from "@/Data/Auth";

type AuthProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Auth: FC<AuthProps> = ({ setShowAuth }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const authRef = useRef(null);
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  function beba(){
    setShowAuth(false);
  }

  const handleClickOutside = (event:  MouseEvent) => {
    // @ts-expect-error becouse of typescript
    if (authRef.current && !authRef.current.contains(event.target as Node)) {
      setShowAuth(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const DTO = authData();
  return (
    <div className="auth-wraper">
      
      <div className="auth" ref={authRef} >
        <button onClick={beba} style={{marginLeft:"95%"}} className="x-button">
          X
        </button>
        {mode === "login" ? (
          <Login setShowAuth={setShowAuth} />
        ) : (
          <Singup setShowAuth={setShowAuth} />
        )}
        <a onClick={onClick} className="auth-link">
          {mode === "login" ? DTO.DontHaveAnAccount : DTO.AlreadyHaveAnAccount}
        </a>
        
      </div>
    </div>
  );
};

export default Auth;
