import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import RHFInput from "../Form/RHFinput";
import useRegister from "@/hooks/useRegister";
import React from "react";
import { User } from "@/types/types";
import authData from "@/Data/Auth";
import { isEmail } from "@/config/IsEmail";

type SingupProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const Singup: FC<SingupProps> = ({ setShowAuth }) => {
  const [error, setError] = React.useState<number>(-1);
  const methods = useForm();
  const { mutateAsync: singup } = useRegister({ setError, setShowAuth });
  const onSubmit = async (data: User) => {
    if (
      data.email === "" ||
      data.password === "" ||
      data.login === ""
    ) {
      setError(1);
      return;
    }
    if(!isEmail(data.email)){
      setError(2);
      return;
    }
    if(data.password.length < 8){
      setError(3);
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
      {error != -1 && <div className="error">{DTO.Problam[error]}</div>}
    </Form>
  );
};

export default Singup;
