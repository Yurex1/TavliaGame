import API_URL from "@/constants";
import { User } from "@/types/User";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const login = async (user: User) => {
  return await axios.post(API_URL + "auth/login", user, {withCredentials: true});
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.data);
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useLogin;
