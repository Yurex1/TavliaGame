import { User } from "@/types/User";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useLogin from "@/hooks/useLogin";

type loginProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Login: FC<loginProps> = ({ setShowAuth }) => {
  const methods = useForm();
  const { mutateAsync: login } = useLogin();
  const onSubmit = async (data: User) => {
    await login(data);
    setShowAuth(false);
  };
  return (
    <Form methods={methods} submitText="Log in" onSubmit={onSubmit}>
      <RHFInput placeholder="email" name="email" type="email" />
      <RHFInput placeholder="password" name="password" type="password" />
    </Form>
  );
};

export default Login;
