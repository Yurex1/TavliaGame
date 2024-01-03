import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useLogin from "@/hooks/useLogin";
import React from 'react'
import { User } from "@/types/types";


type loginProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Login: FC<loginProps> = ({ setShowAuth }) => {
  const methods = useForm();
  const [error, setError] = React.useState<string>("");
  const login = useLogin({setError, setShowAuth});
  const onSubmit = async (data: User) => {
    await login.mutate(data);
  };
  return (
    <Form methods={methods} submitText="Log in" onSubmit={onSubmit}>
      <RHFInput placeholder="Login" name="username" type="text" />
      <RHFInput placeholder="Password" name="password" type="password" />
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default Login;
