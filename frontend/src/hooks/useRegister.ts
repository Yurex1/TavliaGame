import API_URL from "@/constants";
import { User } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const register = async (user: User) => {
  return await axios.post(API_URL +  "auth", user, {withCredentials: true});
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
