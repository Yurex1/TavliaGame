import Form from "@components/Form";
import RHFInput from "@components/Form/RHFinput";
import { FC } from "react";
import { useForm } from "react-hook-form";

type AuthFromProps = {
  mode: "login" | "signup";
  setShowAuth: (showAuth: boolean) => void;
};

const submitTextMap = { signup: "Sign up", login: "Log in" };

const AuthFrom: FC<AuthFromProps> = ({ mode, setShowAuth }) => {
  const methods = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    setShowAuth(false);
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
