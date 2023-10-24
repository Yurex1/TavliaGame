import { useState } from "react";
import AuthForm from "./AuthForm";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  return (
    <div className="auth">
      <AuthForm mode={mode} />
      <button onClick={onClick}>
        {mode === "login" ? "I have not acount" : "I already have acount"}
      </button>
    </div>
  );
};

export default Auth;
