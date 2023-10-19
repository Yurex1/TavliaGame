import { useFormContext } from "react-hook-form";

interface RHFInputProps {
  name: string;
  type: string;
  placeholder: string;
}

export default function RHFInput({ name, ...inputProps }: RHFInputProps) {
  const { register } = useFormContext();
  return <input {...register(name)} {...inputProps} />;
}
