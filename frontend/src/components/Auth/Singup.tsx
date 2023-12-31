import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useRegister from "@/hooks/useRegister";
import React from "react";
import { User } from "@/types/types";

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
    <Form methods={methods} submitText="Sign in" onSubmit={onSubmit}>
      <RHFInput placeholder="Login" name="login" type="text" />
      <RHFInput placeholder="Name" name="name" type="text" />
      <RHFInput placeholder="Email" name="email" type="email" />
      <RHFInput placeholder="Password" name="password" type="password" />
    </Form>
  );
};

export default Singup;
