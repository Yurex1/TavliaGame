import { User } from "@/types/User";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const register = async (user: User) => {
  return await axios.post("/auth", user);
};

const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useRegister;
