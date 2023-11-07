import Form from "@/components/Form";
import RHFInput from "@/components/Form/RHFinput";
import useRegister from "@/hooks/useRegister";
import { User } from "@/types/User";
import { FC } from "react";
import { useForm } from "react-hook-form";

type AuthFromProps = {
  mode: "login" | "signup";
  AuthClick: () => void;
};

const submitTextMap = { signup: "Sign up", login: "Log in" };

const AuthFrom: FC<AuthFromProps> = ({ mode, AuthClick }) => {
  const methods = useForm();
  const {mutateAsync} = useRegister();
  const onSubmit = async (data: User) => {
    await mutateAsync(data);
    AuthClick();
  };
  return (
    <Form
      methods={methods}
      submitText={submitTextMap[mode]}
      onSubmit={onSubmit}
    >
      <RHFInput placeholder="email" name="email" type="email" />
      <RHFInput placeholder="password" name="password" type="password" />
    </Form>
  );
};
export default AuthFrom;
