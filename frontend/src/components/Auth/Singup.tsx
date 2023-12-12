import { User } from "@/types/User";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
// import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";
import React from 'react'

type SingupProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Singup: FC<SingupProps> = ({ setShowAuth }) => {
  const methods = useForm();
  const { mutateAsync: singup } = useRegister();
  const onSubmit = async (data: User) => {
    await singup(data);
    setShowAuth(false);
  };
  return (
    <Form methods={methods} submitText="Log in" onSubmit={onSubmit}>
      <RHFInput placeholder="login" name="login" type="text" />
      <RHFInput placeholder="name" name="name" type="text" />
      <RHFInput placeholder="email" name="email" type="email" />
      <RHFInput placeholder="password" name="password" type="password" />
    </Form>
  );
};

export default Singup;
