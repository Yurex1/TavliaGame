import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useLogin from "@/hooks/useLogin";
import React from 'react'
import { User } from "@/types/types";
import authData from "@/Data/Auth";


type loginProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Login: FC<loginProps> = ({ setShowAuth }) => {
  const methods = useForm();
  const [error, setError] = React.useState<number>(-1);
  const login = useLogin({setError, setShowAuth});
  const onSubmit = async (data: User) => {
    await login.mutate(data);
  };
  const DTO = authData();
  return (
    <Form methods={methods} submitText={DTO.Login} onSubmit={onSubmit}>
      <RHFInput placeholder={DTO.Name} name="username" type="text" />
      <RHFInput placeholder={DTO.Password} name="password" type="password" />
      {error != -1 && <div className="error">{DTO.Problam[error]}</div>}
    </Form>
  );
};

export default Login;
