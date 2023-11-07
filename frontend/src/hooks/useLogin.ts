import { User } from "@/types/User";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const login = async (user: User) => {
  return axios.post("/auth/login", {email: user.email, password: user.password});
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useLogin;
