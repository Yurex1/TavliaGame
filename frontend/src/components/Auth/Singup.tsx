import { User } from "@/types/User";
import { FC, useReducer } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";

type SingupProps = {
  AuthClick: () => void;
};

const Singup: FC<SingupProps> = ({ AuthClick }) => {
  const methods = useForm();
  const { mutateAsync } = useRegister();
  const onSubmit = async (data: User) => {
    await mutateAsync(data);
    AuthClick();
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
