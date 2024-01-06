import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useRegister from "@/hooks/useRegister";
import React from "react";
import { User } from "@/types/types";
import authData from "@/Data/Auth";

type SingupProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Singup: FC<SingupProps> = ({ setShowAuth }) => {
  const [error, setError] = React.useState<string>("");
  const methods = useForm();
  const { mutateAsync: singup } = useRegister({ setError, setShowAuth });
  const onSubmit = async (data: User) => {
    data.name = data.login;
    if (
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.login === ""
    ) {
      setError("All fields must be filled");
      return;
    }
    await singup(data);
  };
  const DTO = authData();
  return (
    <Form methods={methods} submitText={DTO.Register} onSubmit={onSubmit}>
      <RHFInput placeholder={DTO.Name} name="login" type="text" />
      <RHFInput placeholder={DTO.Email} name="email" type="email" />
      <RHFInput placeholder={DTO.Password} name="password" type="password" />
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default Singup;
