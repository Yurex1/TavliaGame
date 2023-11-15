import { FC, useState } from "react";
import Login from "./Login";
import Singup from "./Singup";

type AuthProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Auth: FC<AuthProps> = ({ setShowAuth }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  return (
    <div className="auth-wraper">
      <div className="auth">
        {mode === "login" ? (
          <Login setShowAuth={setShowAuth} />
        ) : (
          <Singup setShowAuth={setShowAuth} />
        )}
        <button onClick={onClick}>
          {mode === "login" ? "I don't have an account" : "I already have an account"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
