import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useRegister from "@/hooks/useRegister";
import React from "react";
import { User } from "@/types/types";
import { isEmail } from "@/config/IsEmail";

type SingupProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Singup: FC<SingupProps> = ({ setShowAuth }) => {
  const [error, setError] = React.useState<string>("");
  const methods = useForm();
  const { mutateAsync: singup } = useRegister({setError, setShowAuth});
  const onSubmit = async (data: User) => {
    data.name = data.login;
    if(data.name === "" || data.email === "" || data.password === "" || data.login === ""){
      setError("All fields must be filled");
      return;
    }
    if(!isEmail(data.email)){
      setError("Invalid email");
      return;
    }
    if(data.password.length < 8){
      setError("Password must be at least 8 characters");
      return;
    }
    await singup(data);
  };
  return (
    <Form methods={methods} submitText="Sign in" onSubmit={onSubmit}>
      <RHFInput placeholder="Login" name="login" type="text" />
      <RHFInput placeholder="Email" name="email" type="email" />
      <RHFInput placeholder="Password" name="password" type="password" />
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default Singup;
