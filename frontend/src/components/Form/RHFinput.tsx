import { FC } from "react";
import { useFormContext } from "react-hook-form";

type RHFInputProps = {
  name: string;
  type: string;
  placeholder: string;
};

const RHFInput : FC<RHFInputProps > = ({ name, ...inputProps }) => {
  const { register } = useFormContext();
  return <input {...register(name)} {...inputProps} />;
}

export default RHFInput
