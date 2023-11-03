import { FC, useState } from "react";
import AuthForm from "./AuthForm";
import { type } from "os";

type AuthProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Auth :FC<AuthProps> = ({setShowAuth}) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  return (
    <div className="auth-wraper">
      <div className="auth">
        <AuthForm setShowAuth = {setShowAuth} mode={mode} />
        <button onClick={onClick}>
          {mode === "login" ? "I have not acount" : "I already have acount"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
