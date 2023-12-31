import { FC, useState } from "react";
import Login from "./Login";
import Singup from "./Singup";
import React from 'react'

type AuthProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Auth: FC<AuthProps> = ({ setShowAuth }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  function beba(){
    setShowAuth(false);
  }
  return (
    <div className="auth-wraper">
      
      <div className="auth">
        <button onClick={beba} style={{marginLeft:"95%"}} className="xbutt">
          X
        </button>
        {mode === "login" ? (
          <Login setShowAuth={setShowAuth} />
        ) : (
          <Singup setShowAuth={setShowAuth} />
        )}
        <a onClick={onClick} className="link">
          {mode === "login" ? "I don't have an account" : "I already have an account"}
        </a>
        
      </div>
    </div>
  );
};

export default Auth;
