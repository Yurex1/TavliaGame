import { FC, useState } from "react";
import Login from "./Login";
import Singup from "./Singup";

type AuthProps = {
  AuthClick: () => void;
};

const Auth: FC<AuthProps> = ({ AuthClick }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  function onClick() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  }
  return (
    <div className="auth-wraper">
      <div className="auth">
        {mode === "login" ? (
          <Login AuthClick={AuthClick} />
        ) : (
          <Singup AuthClick={AuthClick} />
        )}
        <button onClick={onClick}>
          {mode === "login" ? "I have not acount" : "I already have acount"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
